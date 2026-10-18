// 背景效果 12 招
import './background.css'
import { frames } from '../utils.js'

// 滿版 canvas，每格呼叫 draw(ctx, w, h, t)，自動處理尺寸與高解析度
function canvas2d(el, draw) {
  el.innerHTML = '<canvas class="bg-canvas"></canvas>'
  const cv = el.firstChild
  const ctx = cv.getContext('2d')
  return frames((t) => {
    const dpr = window.devicePixelRatio || 1
    const w = el.clientWidth, h = el.clientHeight
    if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr) }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    draw(ctx, w, h, t)
  })
}

const label = (t) => `<b class="bg-label">${t}</b>`

export default {
  aurora: {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="bg-aurora"><i></i><i></i><i></i><i></i></div>${label('Aurora')}` },
  },

  'mesh-gradient': { bg: 'dark', run(el) { el.innerHTML = `<div class="bg-mesh"></div>${label('Mesh')}` } },

  'animated-gradient': { bg: 'dark', run(el) { el.innerHTML = `<div class="bg-flow"></div>${label('Gradient')}` } },

  'conic-glow': { bg: 'dark', run(el) { el.innerHTML = `<div class="bg-conic"><i></i></div>${label('Glow')}` } },

  spotlight: {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="bg-spot"></div>${label('Spotlight')}`
      const spot = el.firstChild
      let real = 0
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        spot.style.setProperty('--x', `${e.clientX - r.left}px`)
        spot.style.setProperty('--y', `${e.clientY - r.top}px`)
        real = performance.now() + 1500
      })
      return frames((t) => {
        if (performance.now() < real) return
        spot.style.setProperty('--x', `${50 + Math.cos(t / 1300) * 35}%`)
        spot.style.setProperty('--y', `${50 + Math.sin(t / 900) * 30}%`)
      })
    },
  },

  'noise-grain': { bg: 'dark', run(el) { el.innerHTML = `<div class="bg-grain"></div>${label('Grain')}` } },

  'dot-grid': { bg: 'dark', run(el) { el.innerHTML = `<div class="bg-dots"></div><div class="bg-dots lit"></div>${label('Dot Grid')}` } },

  'retro-grid': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="bg-retro"><i class="sun"></i><div class="floor"><div class="lines"></div></div></div>' },
  },

  'particle-network': {
    bg: 'dark',
    run(el) {
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      const ps = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0012, vy: (Math.random() - 0.5) * 0.0012 }))
      return canvas2d(el, (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h)
        const max = Math.min(w, h) * 0.32
        for (const p of ps) {
          p.x = (p.x + p.vx + 1) % 1
          p.y = (p.y + p.vy + 1) % 1
        }
        ctx.strokeStyle = accent
        for (let i = 0; i < ps.length; i++)
          for (let j = i + 1; j < ps.length; j++) {
            const d = Math.hypot((ps[i].x - ps[j].x) * w, (ps[i].y - ps[j].y) * h)
            if (d > max) continue
            ctx.globalAlpha = 1 - d / max
            ctx.beginPath()
            ctx.moveTo(ps[i].x * w, ps[i].y * h)
            ctx.lineTo(ps[j].x * w, ps[j].y * h)
            ctx.stroke()
          }
        ctx.globalAlpha = 1
        ctx.fillStyle = '#fff'
        for (const p of ps) {
          ctx.beginPath()
          ctx.arc(p.x * w, p.y * h, 1.8, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    },
  },

  starfield: {
    bg: 'dark',
    run(el) {
      const stars = Array.from({ length: 220 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }))
      return canvas2d(el, (ctx, w, h) => {
        ctx.fillStyle = 'rgba(10,10,16,.35)'
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = '#fff'
        for (const s of stars) {
          const pz = s.z
          s.z -= 0.012
          if (s.z <= 0.02) Object.assign(s, { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: 1 })
          const k = w * 0.5
          const [x1, y1] = [w / 2 + (s.x / pz) * k, h / 2 + (s.y / pz) * k]
          const [x2, y2] = [w / 2 + (s.x / s.z) * k, h / 2 + (s.y / s.z) * k]
          ctx.lineWidth = (1 - s.z) * 2.4
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      })
    },
  },

  'layered-waves': {
    bg: 'dark',
    run(el) {
      const wave = (cls) =>
        `<svg class="bg-wave ${cls}" viewBox="0 0 800 100" preserveAspectRatio="none"><path d="M0 50 Q100 0 200 50 T400 50 T600 50 T800 50 V100 H0Z"/></svg>`
      el.innerHTML = `<div class="bg-waves">${wave('w1')}${wave('w2')}${wave('w3')}</div>${label('Waves')}`
    },
  },

  'matrix-rain': {
    bg: 'dark',
    run(el) {
      const glyphs = 'アイウエオカキクケコサシスセソ0123456789ABCDEF日月火水木金土'
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      let drops = []
      let last = 0
      return canvas2d(el, (ctx, w, h, t) => {
        if (t - last < 55) return
        last = t
        const size = Math.max(10, h / 18)
        const cols = Math.ceil(w / size)
        if (drops.length !== cols) drops = Array.from({ length: cols }, () => Math.random() * -20)
        ctx.fillStyle = 'rgba(8,10,8,.16)'
        ctx.fillRect(0, 0, w, h)
        ctx.font = `${size}px monospace`
        drops.forEach((y, i) => {
          ctx.fillStyle = Math.random() > 0.95 ? '#fff' : accent
          ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * size, y * size)
          drops[i] = y * size > h && Math.random() > 0.96 ? 0 : y + 1
        })
      })
    },
  },
}
