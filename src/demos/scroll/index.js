// 捲動效果 12 招：卡片內是一個會自動捲動的小頁面，滑鼠移入會暫停讓人自己捲
import './scroll.css'
import { frames, bag } from '../utils.js'

const hero = (t = 'Scroll ↓') => `<div class="sc-hero">${t}</div>`
const clamp = (v) => Math.min(1, Math.max(0, v))

function page(el, html, fixed = '') {
  el.innerHTML = `${fixed}<div class="sc-view"><div class="sc-page">${html}</div></div>`
  return el.querySelector('.sc-view')
}

// loop：捲到底後跳回頂端重播（觸發型）；否則上下來回（連動型）
function autoScroll(view, loop) {
  let pos = 0, dir = 1, wait = 40, end = false, hover = false
  view.addEventListener('pointerenter', () => (hover = true))
  view.addEventListener('pointerleave', () => { hover = false; pos = view.scrollTop })
  return frames(() => {
    if (hover || wait-- > 0) return
    if (end) {
      end = false
      if (loop) { pos = 0; view.scrollTop = 0; wait = 30; return }
      dir = -dir
    }
    const max = view.scrollHeight - view.clientHeight
    pos = Math.min(max, Math.max(0, pos + dir * view.clientHeight * 0.006))
    view.scrollTop = pos
    if ((dir > 0 && pos >= max) || (dir < 0 && pos <= 0)) { end = true; wait = 50 }
  })
}

// 進入可視範圍加上 .in，離開移除（所以每輪都會重播）
function reveal(view, onIn) {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      e.target.classList.toggle('in', e.isIntersecting)
      if (e.isIntersecting) onIn?.(e.target)
    }),
    { root: view, threshold: 0.3 }
  )
  view.querySelectorAll('.sc-rv').forEach((n) => io.observe(n))
  return () => io.disconnect()
}

function onScroll(view, fn) {
  const h = () => fn(clamp(view.scrollTop / (view.scrollHeight - view.clientHeight || 1)), view.scrollTop)
  view.addEventListener('scroll', h, { passive: true })
  h()
}

// 觸發型：建頁、自動捲、掛 reveal
const triggered = (html, onIn) => (el) => {
  const view = page(el, html)
  const b = bag()
  b.add(autoScroll(view, true))
  b.add(reveal(view, onIn))
  return b.clear
}

const cards = (n, cls = 'sc-card') =>
  Array.from({ length: n }, (_, i) => `<div class="${cls} sc-rv"><b>0${i + 1}</b><span>區塊標題</span></div>`).join('')

export default {
  // ── TRIGGERED ─────────────────────────────
  'fade-up': { bg: 'dark', run: triggered(hero() + cards(5)) },

  'stagger-reveal': {
    bg: 'dark',
    run: triggered(hero() + Array.from({ length: 3 }, () => `<div class="sc-grid sc-rv">${[0, 1, 2].map((i) => `<i style="--i:${i}"></i>`).join('')}</div>`).join('')),
  },

  'slide-in': {
    bg: 'dark',
    run: triggered(hero() + `<div class="sc-timeline">${['2019 創立', '2020 第一個產品', '2021 突破萬人', '2023 走向國際', '2025 全新品牌', '2026 下一步']
      .map((t) => `<div class="sc-tl sc-rv"><span>${t}</span></div>`).join('')}</div>`),
  },

  'scale-in': {
    bg: 'dark',
    run: triggered(hero() + Array.from({ length: 4 }, (_, i) => `<div class="sc-img sc-rv" style="--h:${i * 70}"></div>`).join('')),
  },

  'line-reveal': {
    bg: 'light',
    run: triggered(hero() + [['設計不是', '它看起來如何'], ['而是', '它如何運作'], ['— Steve Jobs']]
      .map((lines) => `<h3 class="sc-lines sc-rv">${lines.map((l, i) => `<span class="ln"><span style="--i:${i}">${l}</span></span>`).join('')}</h3>`).join('')),
  },

  'count-up': {
    bg: 'dark',
    run: triggered(
      hero() + [[12480, '位使用者'], [98, '% 滿意度'], [365, '天不停機']]
        .map(([n, t]) => `<div class="sc-stat sc-rv" data-n="${n}"><b>0</b><span>${t}</span></div>`).join(''),
      (node) => {
        const b = node.querySelector('b')
        const n = +node.dataset.n
        const stop = frames((t) => {
          const k = clamp(t / 1200)
          b.textContent = Math.round(n * (1 - (1 - k) ** 3)).toLocaleString()
          if (k === 1) stop()
        })
      }
    ),
  },

  // ── LINKED ────────────────────────────────
  'reading-progress': {
    bg: 'light',
    run(el) {
      const lines = Array.from({ length: 26 }, (_, i) => `<i style="width:${i % 5 === 4 ? 55 : 92 - (i % 3) * 6}%"></i>`).join('')
      const view = page(el, `<article class="sc-article"><h3>如何做出好的 UI 動態</h3>${lines}</article>`, '<i class="sc-progress"></i>')
      const bar = el.querySelector('.sc-progress')
      onScroll(view, (p) => (bar.style.transform = `scaleX(${p})`))
      return autoScroll(view, false)
    },
  },

  parallax: {
    bg: 'dark',
    run(el) {
      const view = page(
        el,
        `<div class="sc-par-title">PARALLAX</div>${'<div class="sc-par-card">近景內容照常捲動</div>'.repeat(3)}`,
        '<div class="sc-par"><i class="sky"></i><i class="far"></i><i class="mid"></i></div>'
      )
      const [sky, far, mid] = el.querySelectorAll('.sc-par i')
      onScroll(view, (p, s) => {
        sky.style.transform = `translateY(${-s * 0.05}px)`
        far.style.transform = `translateY(${-s * 0.2}px)`
        mid.style.transform = `translateY(${-s * 0.45}px)`
      })
      return autoScroll(view, false)
    },
  },

  'sticky-stack': {
    bg: 'dark',
    run(el) {
      const view = page(el, hero('Features') + Array.from({ length: 4 }, (_, i) => `<div class="sc-stk" style="--i:${i}"><b>0${i + 1}</b><span>功能卡片</span></div>`).join('') + '<div class="sc-spacer"></div>')
      const cs = [...view.querySelectorAll('.sc-stk')]
      const starts = cs.map((c) => c.offsetTop - parseFloat(getComputedStyle(c).top))
      const step = cs[0].offsetHeight
      onScroll(view, (p, s) => {
        cs.forEach((c, i) => {
          if (i === cs.length - 1) return
          const k = clamp((s - starts[i]) / step)
          c.style.transform = `scale(${1 - k * 0.08})`
          c.style.filter = `brightness(${1 - k * 0.4})`
        })
      })
      return autoScroll(view, false)
    },
  },

  'horizontal-scroll': {
    bg: 'dark',
    run(el) {
      const panels = Array.from({ length: 6 }, (_, i) => `<div class="panel" style="--h:${i * 50}"><b>0${i + 1}</b></div>`).join('')
      const view = page(el, `<div class="sc-hwrap"><div class="sc-track">${panels}</div></div>`)
      const track = view.querySelector('.sc-track')
      onScroll(view, (p) => (track.style.transform = `translateX(${-p * (track.scrollWidth - view.clientWidth)}px)`))
      return autoScroll(view, false)
    },
  },

  'scroll-text-fill': {
    bg: 'dark',
    run(el) {
      const text = '好的動態不是為了炫技，而是讓人知道剛剛發生了什麼、接下來會去哪裡。'
      const view = page(el, `<div class="sc-fill-wrap"><p class="sc-fill">${[...text].map((c) => `<span>${c}</span>`).join('')}</p></div>`)
      const spans = [...view.querySelectorAll('.sc-fill span')]
      onScroll(view, (p) => spans.forEach((s, i) => s.classList.toggle('on', i < p * spans.length * 1.05)))
      return autoScroll(view, false)
    },
  },

  'shrinking-header': {
    bg: 'light',
    run(el) {
      const rows = Array.from({ length: 10 }, (_, i) => `<div class="sc-row"><i></i><span>文章標題 ${i + 1}</span></div>`).join('')
      const view = page(el, `<header class="sc-head"><b>UI-db</b><nav><span>收藏</span><span>關於</span></nav></header>${rows}`)
      const head = view.querySelector('.sc-head')
      onScroll(view, (p, s) => head.classList.toggle('small', s > 20))
      return autoScroll(view, false)
    },
  },
}
