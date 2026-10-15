import './styles/app.css'
import { items, collections, categories, collectionById } from './data/index.js'
import { mountDemo } from './demos/index.js'

const FAV_KEY = 'ui-db:favs'
const loadFavs = () => {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')) } catch { return new Set() }
}
const saveFavs = () => {
  try { localStorage.setItem(FAV_KEY, JSON.stringify([...state.favs])) } catch {}
}

const state = {
  view: 'all', // 'all' | 'favs' | collection id
  group: 'all',
  q: '',
  favs: loadFavs(),
}

const $ = (sel, root = document) => root.querySelector(sel)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const pad = (n) => String(n).padStart(2, '0')
const promptText = (it) => `【${it.zh}｜${it.en}】${it.prompt.replace(/^[^：]*：/, '')}`

const icons = {
  star: '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" fill="currentColor"/></svg>',
  copy: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
}

// ── Layout ───────────────────────────────────
$('#app').innerHTML = `
  <aside class="side">
    <div class="brand">
      <div class="logo">UI<span>-db</span></div>
      <p>我的 UI 效果與工具資料庫</p>
    </div>
    <nav class="nav" id="nav"></nav>
    <div class="side-foot">${items.length} 筆收藏 · ${collections.length} 個收藏集</div>
  </aside>
  <main class="main">
    <header class="top">
      <div class="title-area" id="titleArea"></div>
      <label class="search">${icons.search}<input id="q" type="search" placeholder="搜尋名稱、英文、標籤…（按 / ）" autocomplete="off" /></label>
    </header>
    <div class="chips" id="chips"></div>
    <section class="grid" id="grid"></section>
    <p class="empty" id="empty" hidden>沒有符合的項目</p>
  </main>
  <div class="modal" id="modal" hidden></div>
  <div class="toast" id="toast"></div>
`

// ── Demo 生命週期：只在可見時播放 ─────────────
const running = new Map()
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const el = e.target
      if (e.isIntersecting && !running.has(el)) {
        running.set(el, mountDemo(el, itemById[el.dataset.id]))
      } else if (!e.isIntersecting && running.has(el)) {
        running.get(el)()
        running.delete(el)
      }
    }
  },
  { rootMargin: '120px' }
)
const stopAll = () => {
  running.forEach((fn, el) => { fn(); io.unobserve(el) })
  running.clear()
}

const itemById = Object.fromEntries(items.map((it) => [it.id, it]))

// ── Render ───────────────────────────────────
function renderNav() {
  const count = (fn) => items.filter(fn).length
  const navItem = (view, label, n, sub = '') =>
    `<button class="nav-item ${state.view === view ? 'on' : ''}" data-view="${view}"><span>${label}${sub ? `<small>${sub}</small>` : ''}</span><em>${n}</em></button>`
  let html = navItem('all', '全部', items.length) + navItem('favs', '★ 我的最愛', state.favs.size)
  for (const cat of categories) {
    html += `<div class="nav-cat">${cat.label} <span>${cat.en}</span></div>`
    for (const c of collections.filter((c) => c.category === cat.id))
      html += navItem(c.id, c.title, count((it) => it.collection === c.id), c.author)
  }
  html += `<div class="nav-cat soon">更多分類 <span>coming soon</span></div>`
  $('#nav').innerHTML = html
}

function currentCollection() {
  return collectionById[state.view] || (state.view === 'all' && collections.length === 1 ? collections[0] : null)
}

function renderHeader() {
  const c = collectionById[state.view]
  if (c) {
    $('#titleArea').innerHTML = `
      <div class="eyebrow">${esc(c.en)} · 收藏於 ${c.savedAt}</div>
      <h1>${esc(c.title)}</h1>
      <p class="note">${esc(c.note)} <a href="${c.source}" target="_blank" rel="noopener">來源 ${esc(c.author)} ${icons.link}</a></p>`
  } else {
    const label = state.view === 'favs' ? '我的最愛' : '全部收藏'
    $('#titleArea').innerHTML = `<div class="eyebrow">UI-db · dashboard / database</div><h1>${label}</h1>
      <p class="note">${state.view === 'favs' ? '點卡片上的 ★ 加入最愛' : '點任一張卡片看大圖與可直接貼給 AI 的提示詞'}</p>`
  }
  const col = currentCollection()
  const groups = col?.groups || []
  $('#chips').innerHTML = groups.length
    ? [`<button class="chip ${state.group === 'all' ? 'on' : ''}" data-group="all">全部</button>`,
        ...groups.map((g) => `<button class="chip ${state.group === g.id ? 'on' : ''}" data-group="${g.id}" data-g="${g.id}"><b>${g.label}</b> ${g.zh}<small>${g.range}</small></button>`)].join('')
    : ''
}

function filtered() {
  const q = state.q.trim().toLowerCase()
  return items.filter((it) => {
    if (state.view === 'favs' && !state.favs.has(it.id)) return false
    if (collectionById[state.view] && it.collection !== state.view) return false
    if (state.group !== 'all' && it.group !== state.group) return false
    if (!q) return true
    return [it.zh, it.en, it.desc, it.prompt, ...it.tags, pad(it.no)].join(' ').toLowerCase().includes(q)
  })
}

function renderGrid() {
  stopAll()
  const list = filtered()
  $('#empty').hidden = list.length > 0
  $('#grid').innerHTML = list
    .map(
      (it) => `
    <article class="card" data-id="${it.id}" data-g="${it.group}" tabindex="0">
      <div class="stage" data-id="${it.id}"></div>
      <span class="en-tag">${esc(it.en)}</span>
      <button class="fav ${state.favs.has(it.id) ? 'on' : ''}" data-fav="${it.id}" aria-label="加入最愛">${icons.star}</button>
      <div class="meta">
        <div class="name"><span class="no">${pad(it.no)}</span><h3>${esc(it.zh)}</h3></div>
        <p>${esc(it.desc)}</p>
        <div class="row">
          <div class="tags">${it.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
          <button class="copy" data-copy="${it.id}" title="複製提示詞">${icons.copy}提示詞</button>
        </div>
      </div>
    </article>`
    )
    .join('')
  document.querySelectorAll('#grid .stage').forEach((s) => io.observe(s))
}

function render() {
  renderNav()
  renderHeader()
  renderGrid()
}

// ── Modal ────────────────────────────────────
let modalCleanup = null
function openModal(id) {
  const it = itemById[id]
  if (!it) return
  const c = collectionById[it.collection]
  const g = c.groups.find((g) => g.id === it.group)
  const m = $('#modal')
  m.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(it.zh)}" data-g="${it.group}">
      <button class="x" data-close aria-label="關閉">${icons.close}</button>
      <div class="stage big" data-id="${it.id}"></div>
      <div class="detail">
        <div class="eyebrow">${esc(c.title)} · ${g.label} ${g.zh} · No.${pad(it.no)}</div>
        <h2>${esc(it.zh)} <span>${esc(it.en)}</span></h2>
        <p class="desc">${esc(it.desc)}</p>
        <div class="tags">${it.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
        <div class="prompt">
          <div class="prompt-head"><b>提示詞</b><span>貼給 Claude / Codex 直接用</span></div>
          <p>${esc(promptText(it))}</p>
          <div class="prompt-actions">
            <button class="btn primary" data-copy="${it.id}">${icons.copy}複製提示詞</button>
            <button class="btn" data-copyname="${it.id}">複製名稱</button>
            <button class="btn ${state.favs.has(it.id) ? 'on' : ''}" data-fav="${it.id}">${icons.star}${state.favs.has(it.id) ? '已收藏' : '加入最愛'}</button>
          </div>
        </div>
        <a class="src" href="${c.source}" target="_blank" rel="noopener">來源：${esc(c.author)} ${icons.link}</a>
      </div>
    </div>`
  m.hidden = false
  document.body.classList.add('locked')
  modalCleanup = mountDemo($('.stage.big', m), it)
  if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`)
  $('.x', m).focus()
}
function closeModal() {
  if ($('#modal').hidden) return
  modalCleanup?.()
  modalCleanup = null
  $('#modal').hidden = true
  $('#modal').innerHTML = ''
  document.body.classList.remove('locked')
  history.replaceState(null, '', location.pathname + location.search)
}

// ── Actions ──────────────────────────────────
let toastTimer
function toast(msg) {
  const t = $('#toast')
  t.textContent = msg
  t.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => t.classList.remove('show'), 1600)
}
async function copy(text, msg) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text })
    document.body.append(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  toast(msg)
}
function toggleFav(id) {
  state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id)
  saveFavs()
  renderNav()
  document.querySelectorAll(`[data-fav="${id}"]`).forEach((b) => {
    b.classList.toggle('on', state.favs.has(id))
    if (b.classList.contains('btn')) b.innerHTML = `${icons.star}${state.favs.has(id) ? '已收藏' : '加入最愛'}`
  })
  if (state.view === 'favs') renderGrid()
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-view],[data-group],[data-fav],[data-copy],[data-copyname],[data-close],.card,.modal')
  if (!t) return
  if (t.dataset.view) {
    state.view = t.dataset.view
    state.group = 'all'
    render()
    $('.main').scrollTo({ top: 0 })
  } else if (t.dataset.group) {
    state.group = t.dataset.group
    renderHeader()
    renderGrid()
  } else if (t.dataset.fav) {
    toggleFav(t.dataset.fav)
  } else if (t.dataset.copy) {
    copy(promptText(itemById[t.dataset.copy]), '已複製提示詞')
  } else if (t.dataset.copyname) {
    const it = itemById[t.dataset.copyname]
    copy(`${it.zh}（${it.en}）`, '已複製名稱')
  } else if ('close' in t.dataset || (t.classList.contains('modal') && e.target === t)) {
    closeModal()
  } else if (t.classList.contains('card')) {
    openModal(t.dataset.id)
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') return closeModal()
  if (e.key === '/' && document.activeElement !== $('#q')) {
    e.preventDefault()
    $('#q').focus()
  }
  if (e.key === 'Enter' && document.activeElement?.classList.contains('card')) openModal(document.activeElement.dataset.id)
})

$('#q').addEventListener('input', (e) => {
  state.q = e.target.value
  renderGrid()
})

render()
if (itemById[location.hash.slice(1)]) openModal(location.hash.slice(1))
