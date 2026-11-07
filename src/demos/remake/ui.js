// 按鈕、表單、載入：自動循環示範，多數元件也能直接用滑鼠操作
import './ui.css'
import { every, frames, replay, bag, pointer } from '../utils.js'

const center = (html) => `<div class="ru-center">${html}</div>`
const ico = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  plane: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 11.5 21 3l-6.5 18-3.2-7.3z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>',
}
// 每 ms 切換一次 class（hover 示範用）
const toggleEvery = (node, cls, ms) => every(ms, (n) => node.classList.toggle(cls, n % 2 === 1))
const typeLoop = (node, words, onChange) =>
  every(160, (n) => {
    const w = words[Math.floor(n / 24) % words.length]
    const k = n % 24
    node.textContent = w.slice(0, Math.min(k, w.length))
    onChange?.(node.textContent, k)
  })

export default {
  // ── 按鈕 ───────────────────────────────
  'direction-aware-fill-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<button class="ru-btn ru-dir"><i></i><span>立即聯絡</span></button>')
      const btn = el.querySelector('button'), dot = btn.firstChild
      const enter = (x, y, on) => {
        dot.style.left = `${x}px`
        dot.style.top = `${y}px`
        btn.classList.toggle('on', on)
      }
      const real = (on) => (e) => { const r = btn.getBoundingClientRect(); enter(e.clientX - r.left, e.clientY - r.top, on) }
      btn.addEventListener('pointerenter', real(true))
      btn.addEventListener('pointerleave', real(false))
      const sides = [[0, 0.5], [1, 0.5], [0.5, 0], [0.5, 1]]
      return every(1100, (n) => {
        const [sx, sy] = sides[Math.floor(n / 2) % 4]
        enter(sx * btn.offsetWidth, sy * btn.offsetHeight, n % 2 === 0)
      })
    },
  },

  'shine-sweep-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<button class="ru-btn ru-shine">立即購買</button>')
      return toggleEvery(el.querySelector('button'), 'on', 1300)
    },
  },

  'rotating-gradient-border': {
    bg: 'dark',
    run(el) { el.innerHTML = center('<div class="ru-rgb"><button class="ru-btn">開始使用</button></div>') },
  },

  'gentle-cta-cue': {
    bg: 'light',
    run(el) { el.innerHTML = center(`<button class="ru-btn ru-cue">免費試用 <i>${ico.arrow}</i></button>`) },
  },

  'loading-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<button class="ru-btn ru-load"><span>送出訂單</span><i class="spin"></i><i class="ok">${ico.check}</i></button>`)
      const btn = el.querySelector('button')
      const b = bag()
      const go = () => {
        if (btn.dataset.s) return
        btn.dataset.s = 'load'
        b.timeout(() => (btn.dataset.s = 'done'), 1300)
        b.timeout(() => delete btn.dataset.s, 2600)
      }
      btn.addEventListener('click', go)
      b.add(every(3400, go))
      return b.clear
    },
  },

  'border-draw-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<button class="ru-btn ru-draw"><svg><rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="10" pathLength="100"/></svg>查看作品</button>')
      return toggleEvery(el.querySelector('button'), 'on', 1400)
    },
  },

  '3d-press-button': {
    bg: 'light',
    run(el) { el.innerHTML = center('<button class="ru-btn ru-press">按下去</button>') },
  },

  'jelly-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<button class="ru-btn ru-jelly">啵一下</button>')
      const btn = el.querySelector('button')
      btn.addEventListener('click', () => replay(btn, 'go'))
      return every(1600, () => replay(btn, 'go'))
    },
  },

  'ripple-click': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<button class="ru-btn ru-ripple">按我</button>')
      const btn = el.querySelector('button')
      const ripple = (x, y) => {
        const s = document.createElement('i')
        s.style.cssText = `left:${x}px;top:${y}px`
        s.addEventListener('animationend', () => s.remove())
        btn.append(s)
      }
      btn.addEventListener('pointerdown', (e) => { const r = btn.getBoundingClientRect(); ripple(e.clientX - r.left, e.clientY - r.top) })
      return every(1000, () => ripple(btn.offsetWidth * (0.2 + Math.random() * 0.6), btn.offsetHeight / 2))
    },
  },

  'slide-to-confirm': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="ru-slide"><span>滑動以確認付款</span><button aria-label="滑動確認">${ico.arrow}</button></div>`)
      const track = el.querySelector('.ru-slide'), knob = track.querySelector('button'), label = track.querySelector('span')
      let p = 0, drag = false, t0 = 0
      const max = () => track.clientWidth - knob.offsetWidth - 8
      const set = (v) => {
        p = Math.max(0, Math.min(1, v))
        knob.style.transform = `translateX(${p * max()}px)`
        label.style.opacity = 1 - p * 1.4
        track.classList.toggle('done', p >= 0.98)
      }
      knob.addEventListener('pointerdown', (e) => { drag = true; knob.setPointerCapture(e.pointerId) })
      knob.addEventListener('pointermove', (e) => drag && set((e.clientX - track.getBoundingClientRect().left - knob.offsetWidth / 2) / max()))
      knob.addEventListener('pointerup', () => { drag = false; set(p > 0.9 ? 1 : 0) })
      return frames((t) => {
        if (drag) return
        const k = ((t - t0) % 3600) / 3600
        set(k < 0.5 ? (k / 0.5) ** 2 : k < 0.8 ? 1 : 0)
      })
    },
  },

  'hold-to-confirm': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<button class="ru-btn ru-hold"><i></i><span>按住刪除</span></button>')
      const btn = el.querySelector('button')
      let real = null
      btn.addEventListener('pointerdown', () => (real = true))
      btn.addEventListener('pointerup', () => (real = false))
      btn.addEventListener('pointerleave', () => (real = false))
      let p = 0
      return frames((t) => {
        const auto = (t % 3000) < 1600
        const holding = real ?? auto
        p = Math.max(0, Math.min(1, p + (holding ? 0.014 : -0.03)))
        btn.style.setProperty('--p', p)
        btn.classList.toggle('done', p >= 1)
        btn.lastChild.textContent = p >= 1 ? '已刪除' : '按住刪除'
      })
    },
  },

  'icon-slide-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<button class="ru-btn ru-icon">下一步 <span><i>${ico.arrow}</i><i>${ico.arrow}</i></span></button>`)
      return toggleEvery(el.querySelector('button'), 'on', 1200)
    },
  },

  'neon-glow-button': {
    bg: 'dark',
    run(el) { el.innerHTML = center('<button class="ru-btn ru-neon">GAME START</button>') },
  },

  'expanding-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<button class="ru-btn ru-expand"><i>${ico.plus}</i><span>新增專案</span></button>`)
      return toggleEvery(el.querySelector('button'), 'on', 1400)
    },
  },

  'send-plane-button': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(`<button class="ru-btn ru-send"><i>${ico.plane}</i><span>送出</span></button>`)
      const btn = el.querySelector('button'), label = btn.querySelector('span')
      const b = bag()
      const fire = () => {
        if (btn.classList.contains('go')) return
        btn.classList.add('go')
        label.textContent = '已送出'
        b.timeout(() => { btn.classList.remove('go'); label.textContent = '送出' }, 2000)
      }
      btn.addEventListener('click', fire)
      b.add(every(3000, fire))
      return b.clear
    },
  },

  'social-icon-fill': {
    bg: 'light',
    run(el) {
      const icons = [['f', '#1877f2'], ['in', '#0a66c2'], ['X', '#111'], ['IG', '#e1306c']]
      el.innerHTML = center(`<div class="ru-social">${icons.map(([t, c]) => `<a style="--c:${c}">${t}</a>`).join('')}</div>`)
      const as = [...el.querySelectorAll('a')]
      return every(500, (n) => as.forEach((a, i) => a.classList.toggle('on', n % 8 === i * 2 || n % 8 === i * 2 + 1)))
    },
  },

  // ── 表單 ───────────────────────────────
  'number-stepper': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="ru-step"><button>−</button><div class="num"><b>1</b></div><button>+</button></div>')
      const [minus, plus] = el.querySelectorAll('button')
      const box = el.querySelector('.num')
      let v = 1
      const change = (d) => {
        if (v + d < 0 || v + d > 9) return
        v += d
        const n = document.createElement('b')
        n.textContent = v
        n.className = d > 0 ? 'in-up' : 'in-down'
        const old = box.querySelector('b:not(.out)')
        old.className = d > 0 ? 'out out-up' : 'out out-down'
        old.addEventListener('animationend', () => old.remove())
        box.append(n)
      }
      minus.addEventListener('click', () => change(-1))
      plus.addEventListener('click', () => change(1))
      return every(800, (n) => change(n % 8 < 4 ? 1 : -1))
    },
  },

  'floating-label-input': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="ru-line"><span class="lab">你的名字</span><span class="val"></span><i></i></div>')
      const box = el.querySelector('.ru-line')
      return typeLoop(box.querySelector('.val'), ['王小明', 'Alex Chen'], (_, k) => box.classList.toggle('on', k > 1 && k < 22))
    },
  },

  'shake-on-error': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="ru-login"><b>登入</b><div class="f">hi@ui-db.tw</div><div class="f pw">••••••<em>!</em></div><small>密碼錯誤，請再試一次</small></div>')
      const card = el.querySelector('.ru-login')
      const b = bag()
      b.add(every(2600, (n) => {
        if (!n) return
        replay(card, 'err')
        b.timeout(() => card.classList.remove('err'), 1600)
      }))
      return b.clear
    },
  },

  'tooltip-pop': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<span class="ru-field">年收入</span><span class="ru-tip"><i>?</i><em>稅前的年度總收入</em></span>')
      return toggleEvery(el.querySelector('.ru-tip'), 'on', 1300)
    },
  },

  'animated-checkbox': {
    bg: 'dark',
    run(el) {
      const rays = Array.from({ length: 8 }, (_, i) => `<i style="--a:${i * 45}deg"></i>`).join('')
      el.innerHTML = center(`<label class="ru-round"><span class="c"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg><span class="rays">${rays}</span></span>同意服務條款</label>`)
      const box = el.querySelector('.ru-round')
      box.addEventListener('click', () => box.classList.toggle('on'))
      return toggleEvery(box, 'on', 1400)
    },
  },

  'password-strength': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="ru-pw"><div class="f"><span class="val"></span></div><div class="bars"><i></i><i></i><i></i><i></i></div><small>請輸入密碼</small></div>')
      const box = el.querySelector('.ru-pw'), label = box.querySelector('small')
      const names = ['請輸入密碼', '太弱', '普通', '不錯', '很強']
      return typeLoop(box.querySelector('.val'), ['abc', 'abc123', 'Abc123!x', 'Ab!3x9Qz#kL'], (s) => {
        const score = !s ? 0 : Math.min(4, [/[a-z]/, /[A-Z]/, /\d/, /[^\w]/].filter((r) => r.test(s)).length + (s.length > 8 ? 1 : 0))
        box.dataset.s = score
        label.textContent = names[score]
        box.querySelector('.val').dataset.mask = '•'.repeat(s.length)
      })
    },
  },

  'range-slider-bubble': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="ru-range"><div class="track"><i class="fill"></i><button aria-label="數值"><em>50</em></button></div></div>')
      const track = el.querySelector('.track'), knob = track.querySelector('button'), bubble = knob.firstChild, fill = track.firstChild
      let drag = false
      const set = (p) => {
        p = Math.max(0, Math.min(1, p))
        knob.style.left = fill.style.width = `${p * 100}%`
        bubble.textContent = Math.round(p * 100)
      }
      knob.addEventListener('pointerdown', (e) => { drag = true; knob.setPointerCapture(e.pointerId); track.classList.add('on') })
      knob.addEventListener('pointermove', (e) => { if (drag) { const r = track.getBoundingClientRect(); set((e.clientX - r.left) / r.width) } })
      knob.addEventListener('pointerup', () => { drag = false; track.classList.remove('on') })
      return frames((t) => {
        if (drag) return
        set(0.5 + Math.sin(t / 900) * 0.42)
        track.classList.toggle('on', Math.abs(Math.cos(t / 900)) > 0.3)
      })
    },
  },

  'otp-input': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(`<div class="ru-otp">${'<span></span>'.repeat(6)}</div>`)
      const box = el.querySelector('.ru-otp'), cells = [...box.children]
      const code = '482916'
      return every(350, (n) => {
        const k = n % 10
        cells.forEach((c, i) => {
          c.textContent = i < k ? code[i] : ''
          c.classList.toggle('focus', i === k && k < 6)
        })
        box.classList.toggle('ok', k >= 6)
      })
    },
  },

  'expanding-search': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="ru-search"><i>${ico.search}</i><span class="val"></span></div>`)
      const box = el.querySelector('.ru-search')
      return typeLoop(box.querySelector('.val'), ['動態效果', 'hover button'], (_, k) => box.classList.toggle('on', k > 1 && k < 22))
    },
  },

  'dropdown-reveal': {
    bg: 'dark',
    run(el) {
      const opts = ['最新上架', '價格由低到高', '價格由高到低', '最多人買']
      el.innerHTML = center(`<div class="ru-drop"><button>排序：最新上架 ▾</button><ul>${opts.map((o, i) => `<li style="--i:${i}">${o}</li>`).join('')}</ul></div>`)
      const box = el.querySelector('.ru-drop')
      box.querySelector('button').addEventListener('click', () => box.classList.toggle('on'))
      return toggleEvery(box, 'on', 1600)
    },
  },

  'tag-input': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="ru-tags"><span class="val"></span></div>')
      const box = el.querySelector('.ru-tags'), val = box.querySelector('.val')
      const words = ['設計', '動態', 'CSS', '互動']
      return every(170, (n) => {
        const k = n % 44
        if (k === 0) box.querySelectorAll('.tag').forEach((t) => t.remove())
        const w = words[Math.floor(k / 10)]
        if (!w) return
        const c = k % 10
        if (c <= w.length) val.textContent = w.slice(0, c)
        if (c === 8) {
          const t = document.createElement('span')
          t.className = 'tag'
          t.textContent = `${w} ×`
          box.insertBefore(t, val)
          val.textContent = ''
        }
      })
    },
  },

  'liquid-radio': {
    bg: 'dark',
    run(el) {
      const opts = ['每月', '每季', '每年']
      el.innerHTML = center(`<div class="ru-liquid"><i class="blob"></i>${opts.map((o) => `<label><span></span>${o}</label>`).join('')}</div>`)
      const box = el.querySelector('.ru-liquid'), blob = box.firstChild, labels = [...box.querySelectorAll('label')]
      let cur = 0
      const pick = (k) => {
        const from = labels[cur].offsetTop, to = labels[k].offsetTop
        blob.style.setProperty('--y', `${to}px`)
        replay(blob, from === to ? 'x' : to > from ? 'down' : 'up')
        labels.forEach((l, i) => l.classList.toggle('on', i === k))
        cur = k
      }
      labels.forEach((l, i) => l.addEventListener('click', () => pick(i)))
      pick(0)
      return every(1300, (n) => n && pick(n % 3))
    },
  },

  'file-drop-upload': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="ru-drop-zone"><span class="hint">拖曳檔案到這裡</span><div class="file">${ico.file}<b>design.fig</b><i class="bar"></i></div><i class="ok">${ico.check}</i></div><i class="ru-flying">${ico.file}</i>`
    },
  },

  'table-crosshair-highlight': {
    bg: 'light',
    run(el) {
      const cols = 5, rows = 4
      let html = ''
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) html += `<i data-r="${r}" data-c="${c}">${((r * 7 + c * 13) % 90) + 10}</i>`
      el.innerHTML = center(`<div class="ru-table" style="--cols:${cols}">${html}</div>`)
      const table = el.querySelector('.ru-table'), cells = [...table.children]
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect(), b = table.getBoundingClientRect()
        const c = Math.floor(((x - (b.left - r.left)) / b.width) * cols)
        const w = Math.floor(((y - (b.top - r.top)) / b.height) * rows)
        cells.forEach((cell) => {
          const sr = +cell.dataset.r === w, sc = +cell.dataset.c === c
          cell.className = sr && sc ? 'x' : sr || sc ? 'line' : ''
        })
      })
    },
  },

  // ── 載入 ───────────────────────────────
  'geometric-loader': {
    bg: 'dark',
    run(el) { el.innerHTML = center('<i class="ru-geo"></i>') },
  },

  'top-loading-bar': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="ru-page"><i class="bar"></i><div class="nav"></div><div class="hero"></div><div class="row"><i></i><i></i><i></i></div></div>'
    },
  },
}
