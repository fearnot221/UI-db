// 動態精選 12 招
import './motion-picks.css'
import { every, frames } from '../utils.js'

const center = (html) => `<div class="mp-center">${html}</div>`

export default {
  metaballs: {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="mp-goo">${'<i></i>'.repeat(5)}</div>` },
  },

  'confetti-burst': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<canvas class="mp-canvas"></canvas>'
      const cv = el.firstChild
      const ctx = cv.getContext('2d')
      const colors = ['#ff8fa3', '#9be7ff', '#dcf244', '#ffb454', '#b69cff']
      let bits = []
      return frames((t) => {
        const w = el.clientWidth, h = el.clientHeight
        if (cv.width !== w) { cv.width = w; cv.height = h }
        if (!bits.length || bits.every((b) => b.y > h + 10))
          bits = Array.from({ length: 70 }, () => {
            const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.3
            const v = h * (0.018 + Math.random() * 0.024)
            return { x: w / 2, y: h, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, c: colors[Math.floor(Math.random() * 5)] }
          })
        ctx.clearRect(0, 0, w, h)
        for (const b of bits) {
          b.vy += h * 0.00035
          b.x += b.vx
          b.y += b.vy
          ctx.save()
          ctx.translate(b.x, b.y)
          ctx.rotate(b.r + t / 200)
          ctx.fillStyle = b.c
          ctx.fillRect(-4, -2.5, 8, 5)
          ctx.restore()
        }
      })
    },
  },

  'ken-burns': { bg: 'dark', run(el) { el.innerHTML = '<div class="mp-burns"></div>' } },

  'neon-flicker': { bg: 'dark', run(el) { el.innerHTML = center('<b class="mp-neon">OPEN</b>') } },

  'holographic-card': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="mp-holo"><b>UI-db</b><small>RARE No.05</small></div>')
      const card = el.querySelector('.mp-holo')
      return frames((t) => {
        const x = Math.sin(t / 1100), y = Math.cos(t / 1500)
        card.style.transform = `rotateY(${x * 18}deg) rotateX(${y * 12}deg)`
        card.style.setProperty('--p', `${50 + x * 50}%`)
      })
    },
  },

  'marching-ants': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="mp-ants"><svg><rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" pathLength="100"/></svg>選取範圍</div>')
    },
  },

  'dock-magnify': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="mp-dock">${['#ff8fa3', '#ffb454', '#dcf244', '#8ef0a8', '#9be7ff', '#b69cff'].map((c) => `<i style="background:${c}"></i>`).join('')}</div>`)
      const dock = el.querySelector('.mp-dock')
      const icons = [...dock.children]
      let real = null, until = 0
      el.addEventListener('pointermove', (e) => { real = e.clientX; until = performance.now() + 1500 })
      return frames((t) => {
        const r = dock.getBoundingClientRect()
        const x = performance.now() < until ? real : r.left + r.width * (0.5 + Math.sin(t / 900) * 0.5)
        icons.forEach((ic) => {
          const b = ic.getBoundingClientRect()
          const d = Math.abs(x - (b.left + b.width / 2)) / r.width
          ic.style.transform = `scale(${1 + Math.max(0, 0.7 - d * 2.4)})`
        })
      })
    },
  },

  'rolling-text-button': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<button class="mp-roll"><span><b>開始使用</b><b>開始使用</b></span></button>')
      const btn = el.querySelector('button')
      return every(1400, (n) => btn.classList.toggle('on', n % 2 === 1))
    },
  },

  'before-after-slider': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="mp-ba"><div class="a">BEFORE</div><div class="b">AFTER</div><i></i></div>'
      const box = el.firstChild
      let until = 0
      box.addEventListener('pointermove', (e) => {
        const r = box.getBoundingClientRect()
        box.style.setProperty('--x', `${((e.clientX - r.left) / r.width) * 100}%`)
        until = performance.now() + 1500
      })
      return frames((t) => {
        if (performance.now() > until) box.style.setProperty('--x', `${50 + Math.sin(t / 1100) * 38}%`)
      })
    },
  },

  'floating-label': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="mp-float"><span class="val"></span><span class="lab">電子郵件</span></div>')
      const box = el.querySelector('.mp-float')
      const val = el.querySelector('.val')
      const text = 'hi@ui-db.tw'
      return every(150, (n) => {
        const k = n % 34
        box.classList.toggle('on', k > 3 && k < 30)
        val.textContent = k > 5 && k < 30 ? text.slice(0, k - 5) : ''
      })
    },
  },

  'star-rating': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="mp-stars">${[0, 1, 2, 3, 4].map((i) => `<button style="--i:${i}" aria-label="${i + 1} 星">★</button>`).join('')}</div>`)
      const stars = [...el.querySelectorAll('button')]
      const set = (v) => stars.forEach((s, i) => s.classList.toggle('on', i < v))
      stars.forEach((s, i) => s.addEventListener('click', () => set(i + 1)))
      return every(1800, (n) => set([5, 0, 3, 0][n % 4]))
    },
  },

  'segmented-control': {
    bg: 'light',
    run(el) {
      const tabs = ['每日', '每週', '每月']
      el.innerHTML = center(`<div class="mp-seg"><i></i>${tabs.map((t) => `<button>${t}</button>`).join('')}</div>`)
      const seg = el.querySelector('.mp-seg')
      const btns = [...seg.querySelectorAll('button')]
      const set = (k) => {
        seg.style.setProperty('--k', k)
        btns.forEach((b, i) => b.classList.toggle('on', i === k))
      }
      btns.forEach((b, i) => b.addEventListener('click', () => set(i)))
      return every(1300, (n) => set(n % 3))
    },
  },
}
