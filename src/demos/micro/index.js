// 按鈕與微互動 12 招：自動循環播放，多數也能直接用滑鼠操作
import './micro.css'
import { every, frames, replay, bag } from '../utils.js'

const icon = {
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.2 5.3 3.1 1.7-1.9 3.1-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
}

export default {
  'ripple-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="mi-center"><button class="mi-btn mi-ripple">點我看看</button></div>'
      const btn = el.querySelector('button')
      const ripple = (x, y) => {
        const s = document.createElement('span')
        s.className = 'mi-rip'
        s.style.left = `${x}px`
        s.style.top = `${y}px`
        s.addEventListener('animationend', () => s.remove())
        btn.append(s)
      }
      btn.addEventListener('pointerdown', (e) => {
        const r = btn.getBoundingClientRect()
        ripple(e.clientX - r.left, e.clientY - r.top)
      })
      return every(1300, () => ripple(Math.random() * btn.offsetWidth, Math.random() * btn.offsetHeight))
    },
  },

  'magnetic-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="mi-center"><button class="mi-btn">Hover me</button></div><i class="mi-cursor"></i>'
      const btn = el.querySelector('button')
      const cur = el.querySelector('.mi-cursor')
      let real = null
      let until = 0
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        real = [e.clientX - r.left, e.clientY - r.top]
        until = performance.now() + 1500
      })
      let bx = 0, by = 0
      return frames((t) => {
        const w = el.clientWidth, h = el.clientHeight
        // 沒有真的游標時，用假游標畫橢圓軌跡
        const [cx, cy] = performance.now() < until && real ? real : [w / 2 + Math.cos(t / 900) * w * 0.32, h / 2 + Math.sin(t / 600) * h * 0.3]
        cur.style.transform = `translate(${cx}px, ${cy}px)`
        cur.style.opacity = performance.now() < until ? 0 : 1
        const dx = cx - w / 2, dy = cy - h / 2
        const near = Math.hypot(dx, dy) < Math.min(w, h) * 0.42
        bx += ((near ? dx * 0.35 : 0) - bx) * 0.15
        by += ((near ? dy * 0.35 : 0) - by) * 0.15
        btn.style.transform = `translate(${bx}px, ${by}px)`
      })
    },
  },

  'shimmer-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="mi-center"><button class="mi-btn mi-shimmer">立即開始 →</button></div>'
    },
  },

  'glow-border': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="mi-center"><div class="mi-glow"><button class="mi-btn">✦ Ask AI</button></div></div>'
    },
  },

  'press-squish': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="mi-center"><button class="mi-btn mi-squish">按住我</button></div>'
    },
  },

  'hover-fill': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="mi-center"><button class="mi-btn mi-fill"><span>了解更多</span></button></div>'
      const btn = el.querySelector('button')
      return every(1400, (n) => btn.classList.toggle('on', n % 2 === 1))
    },
  },

  'like-burst': {
    bg: 'dark',
    run(el) {
      const dots = Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36}deg"></i>`).join('')
      el.innerHTML = `<div class="mi-center"><button class="mi-like" aria-label="讚">${icon.heart}<span class="dots">${dots}</span></button><b class="mi-count">128</b></div>`
      const btn = el.querySelector('.mi-like')
      const count = el.querySelector('.mi-count')
      const toggle = () => {
        const on = !btn.classList.contains('on')
        btn.classList.toggle('on', on)
        count.textContent = on ? 129 : 128
        if (on) replay(btn, 'pop')
      }
      btn.addEventListener('click', toggle)
      return every(1600, (n) => n && toggle())
    },
  },

  'toggle-switch': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="mi-center"><span class="mi-label">深色模式</span><button class="mi-switch" role="switch" aria-label="深色模式"><i></i></button></div>'
      const sw = el.querySelector('.mi-switch')
      const toggle = () => {
        sw.classList.toggle('on')
        replay(sw.firstChild, 'move')
      }
      sw.addEventListener('click', toggle)
      return every(1400, (n) => n && toggle())
    },
  },

  'checkbox-draw': {
    bg: 'light',
    run(el) {
      const rows = ['畫線稿', '上色', '輸出檔案']
        .map((t) => `<label class="mi-check"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>${t}</label>`)
        .join('')
      el.innerHTML = `<div class="mi-center"><div class="mi-todo">${rows}</div></div>`
      const items = [...el.querySelectorAll('.mi-check')]
      items.forEach((it) => it.addEventListener('click', () => it.classList.toggle('on')))
      return every(700, (n) => {
        const k = n % 6
        if (k < 3) items[k].classList.add('on')
        if (k === 5) items.forEach((it) => it.classList.remove('on'))
      })
    },
  },

  'copy-feedback': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="mi-center"><div class="mi-code"><code>npm i ui-db</code><button class="mi-copy" aria-label="複製"><span class="i copy">${icon.copy}</span><span class="i ok">${icon.check}</span><em>已複製</em></button></div></div>`
      const btn = el.querySelector('.mi-copy')
      const b = bag()
      const fire = () => {
        btn.classList.add('done')
        b.timeout(() => btn.classList.remove('done'), 1600)
      }
      btn.addEventListener('click', fire)
      b.add(every(2800, (n) => n && fire()))
      return b.clear
    },
  },

  'shake-error': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="mi-center"><div class="mi-form"><div class="mi-input">hello@</div><p class="mi-err">請輸入正確的 Email</p></div></div>'
      const form = el.querySelector('.mi-form')
      const b = bag()
      b.add(every(2800, (n) => {
        if (!n) return
        replay(form, 'err')
        b.timeout(() => form.classList.remove('err'), 1700)
      }))
      return b.clear
    },
  },

  'toast-slide': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="mi-toast"><span class="ok">✓</span><div><b>已儲存變更</b><small>你的設定已同步到雲端</small></div><i class="bar"></i></div>'
    },
  },
}
