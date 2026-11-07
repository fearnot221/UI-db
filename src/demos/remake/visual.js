// 圖形 30 + 背景 21
import './visual.css'
import { every, frames, bag, pointer } from '../utils.js'

const center = (html) => `<div class="rv-center">${html}</div>`
const toggleEvery = (node, cls, ms) => every(ms, (n) => node.classList.toggle(cls, n % 2 === 1))
const svg = (vb, body, cls = '') => `<svg class="rv-svg ${cls}" viewBox="${vb}">${body}</svg>`
// 線條依序畫出：每條 path 設 pathLength=1，用 --d 控制延遲
const draw = (d, i = 0, extra = '') => `<path class="rv-draw" pathLength="1" d="${d}" style="--d:${i}" ${extra}/>`

// 滿版 canvas，draw(ctx, w, h, t)
function canvas(el, fn) {
  el.insertAdjacentHTML('afterbegin', '<canvas class="rv-canvas"></canvas>')
  const cv = el.querySelector('canvas'), ctx = cv.getContext('2d')
  return frames((t) => {
    const w = el.clientWidth, h = el.clientHeight
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h }
    fn(ctx, w, h, t)
  })
}

export default {
  // ── 圖形・SVG ──────────────────────────
  'draw-highlight': {
    bg: 'light',
    run(el) { el.innerHTML = center(`<div class="rv-hl">這是<b>重點<svg viewBox="0 0 200 80" preserveAspectRatio="none">${draw('M30 12 C 140 -4, 196 18, 188 44 C 178 74, 30 80, 10 50 C -4 26, 60 8, 120 10')}</svg></b>喔</div>`) },
  },

  'shape-morph': {
    bg: 'dark',
    run(el) {
      const circle = 'M50 10 C72 10 90 28 90 50 C90 72 72 90 50 90 C28 90 10 72 10 50 C10 28 28 10 50 10Z'
      const star = 'M50 8 C56 30 62 36 92 40 C70 54 66 62 74 92 C56 76 44 76 26 92 C34 62 30 54 8 40 C38 36 44 30 50 8Z'
      const heart = 'M50 88 C30 72 8 58 10 36 C12 18 34 10 50 28 C66 10 88 18 90 36 C92 58 70 72 50 88Z'
      el.innerHTML = center(svg('0 0 100 100', `<path class="rv-fill"><animate attributeName="d" dur="4.5s" repeatCount="indefinite" values="${circle};${circle};${star};${star};${heart};${heart};${circle}" keyTimes="0;.15;.33;.48;.66;.85;1" calcMode="spline" keySplines="0 0 1 1;.6 0 .3 1;0 0 1 1;.6 0 .3 1;0 0 1 1;.6 0 .3 1"/></path>`, 'big'))
    },
  },

  'path-flight': {
    bg: 'dark',
    run(el) {
      const d = 'M 40 140 C 120 20, 220 20, 300 100 S 460 180, 560 40'
      el.innerHTML = `<div class="rv-flight"><div class="in">${svg('0 0 600 180', `<path class="rv-route" d="${d}"/>`, 'full')}<i class="rv-plane" style="offset-path: path('${d}')">✈</i></div></div>`
      // offset-path 用 viewBox 座標，整組 600×180 再依舞台寬度縮放
      const box = el.querySelector('.in')
      const fit = () => (box.style.transform = `scale(${el.clientWidth / 600})`)
      fit()
      return every(500, fit)
    },
  },

  'draw-your-svg': {
    bg: 'dark',
    run(el) {
      const paths = ['M20 80 L50 20 L80 80 Z', 'M35 60 L65 60', 'M50 20 L50 8', 'M14 88 L86 88']
      el.innerHTML = `<div class="rv-upload"><small>拖入任何 .svg</small>${svg('0 0 100 100', paths.map((p, i) => draw(p, i)).join(''), 'mid loop')}</div>`
    },
  },

  'signature-writing': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(svg('0 0 300 120', draw('M20 80 C 30 30, 50 20, 55 60 C 58 90, 40 95, 45 70 C 52 40, 80 40, 82 70 C 84 88, 96 88, 104 60 C 110 40, 118 40, 120 64 C 122 86, 140 84, 148 58 C 154 40, 168 42, 166 66 C 164 88, 190 86, 200 60 C 210 34, 228 30, 236 54 C 244 78, 262 74, 284 50', 0, 'class="rv-draw sig"'), 'wide loop'))
    },
  },

  'line-illustration-draw': {
    bg: 'light',
    run(el) {
      const ps = ['M20 90 L180 90', 'M40 90 L40 50 L80 24 L120 50 L120 90', 'M68 90 L68 66 L92 66 L92 90', 'M150 90 L150 60', 'M150 64 C 130 60, 132 34, 150 30 C 168 34, 170 60, 150 64', 'M168 22 A 10 10 0 1 0 169 22']
      el.innerHTML = center(svg('0 0 200 100', ps.map((p, i) => draw(p, i)).join(''), 'wide loop'))
    },
  },

  'icon-stroke-redraw': {
    bg: 'dark',
    run(el) {
      const icons = ['M4 12 L12 4 L20 12 M6 10 V20 H18 V10', 'M12 3 A9 9 0 1 0 12.01 3 M12 7 V12 L15 15', 'M4 6 H20 M4 12 H20 M4 18 H14', 'M12 20 C 4 14, 2 9, 6 5 C 9 3, 12 6, 12 6 C 12 6, 15 3, 18 5 C 22 9, 20 14, 12 20']
      el.innerHTML = center(`<div class="rv-icons">${icons.map((d) => `<span>${svg('0 0 24 24', draw(d))}</span>`).join('')}</div>`)
      const spans = [...el.querySelectorAll('.rv-icons span')]
      return every(700, (n) => spans.forEach((s, i) => s.classList.toggle('on', i === n % spans.length)))
    },
  },

  'flowing-connectors': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(svg('0 0 300 140', `
        <path class="rv-flow" d="M60 70 C 110 70, 110 30, 150 30"/><path class="rv-flow" d="M60 70 C 110 70, 110 110, 150 110"/>
        <path class="rv-flow" d="M150 30 C 200 30, 200 70, 240 70"/><path class="rv-flow" d="M150 110 C 200 110, 200 70, 240 70"/>
        <rect class="rv-node" x="30" y="55" width="40" height="30" rx="8"/><rect class="rv-node" x="130" y="15" width="40" height="30" rx="8"/>
        <rect class="rv-node" x="130" y="95" width="40" height="30" rx="8"/><rect class="rv-node hot" x="230" y="55" width="40" height="30" rx="8"/>`, 'wide'))
    },
  },

  'wave-divider': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rv-divider"><div class="top">Section A</div><svg viewBox="0 0 800 60" preserveAspectRatio="none"><path d="M0 30 Q100 0 200 30 T400 30 T600 30 T800 30 V60 H0Z"/></svg><div class="bottom">Section B</div></div>' },
  },

  'success-checkmark': {
    bg: 'dark',
    run(el) { el.innerHTML = center(svg('0 0 100 100', `<circle class="rv-draw ring" pathLength="1" cx="50" cy="50" r="40" style="--d:0"/>${draw('M30 52 L45 66 L72 36', 1, 'class="rv-draw tick"')}`, 'mid loop pop')) },
  },

  'logo-build-reveal': {
    bg: 'dark',
    run(el) { el.innerHTML = center('<div class="rv-logo"><i class="a"></i><i class="b"></i><i class="c"></i><b>UI-db</b></div>') },
  },

  'audio-waveform': {
    bg: 'dark',
    run(el) {
      const bars = Array.from({ length: 40 }, (_, i) => `<i style="--v:${(0.25 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23))) * 0.9};--i:${i}"></i>`).join('')
      el.innerHTML = center(`<div class="rv-wave"><button aria-label="播放">▶</button><div class="bars">${bars}</div></div>`)
      const is = [...el.querySelectorAll('.bars i')]
      return frames((t) => {
        const p = (t % 6000) / 6000
        is.forEach((b, i) => b.classList.toggle('on', i / is.length < p))
      })
    },
  },

  'flowing-gradient-stroke': {
    bg: 'dark',
    run(el) {
      const d = 'M20 100 C 80 20, 140 20, 200 80 S 320 140, 380 40'
      el.innerHTML = center(svg('0 0 400 140', `<defs><linearGradient id="rvGrad"><stop offset="0" stop-color="#9be7ff"/><stop offset=".5" stop-color="#b69cff"/><stop offset="1" stop-color="#ff8fa3"/></linearGradient></defs><path class="rv-base" d="${d}"/><path class="rv-glow" d="${d}" pathLength="100"/>`, 'wide'))
    },
  },

  'liquid-fill-icon': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rv-battery"><div class="tank"><div class="liquid"><svg viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z"/></svg></div></div><b>0%</b></div>`)
      const liq = el.querySelector('.liquid'), num = el.querySelector('b')
      return frames((t) => {
        const p = Math.min(1, (t % 5000) / 4000)
        liq.style.height = `${p * 100}%`
        num.textContent = `${Math.round(p * 100)}%`
      })
    },
  },

  'radar-sweep': {
    bg: 'dark',
    run(el) {
      const blips = [[30, 40, 0.15], [64, 30, 0.38], [58, 70, 0.62], [26, 66, 0.86]]
      el.innerHTML = center(`<div class="rv-radar"><i class="beam"></i>${blips.map(([x, y, a]) => `<b style="left:${x}%;top:${y}%;--a:${a}"></b>`).join('')}</div>`)
    },
  },

  'line-chart-draw': {
    bg: 'dark',
    run(el) {
      const pts = [[10, 80], [60, 60], [110, 66], [160, 36], [210, 44], [260, 16], [290, 22]]
      const d = 'M' + pts.map((p) => p.join(' ')).join(' L')
      el.innerHTML = center(svg('0 0 300 100', `<path class="rv-area" d="${d} L290 100 L10 100Z"/>${draw(d, 0, 'class="rv-draw line"')}${pts.map(([x, y], i) => `<circle class="rv-pt" cx="${x}" cy="${y}" r="4" style="--i:${i}"/>`).join('')}`, 'wide loop'))
    },
  },

  'bar-chart-grow': {
    bg: 'dark',
    run(el) {
      const vs = [40, 65, 52, 88, 70, 95]
      el.innerHTML = center(`<div class="rv-bars">${vs.map((v, i) => `<div style="--v:${v / 100};--i:${i}"><em>${v}</em></div>`).join('')}</div>`)
    },
  },

  'donut-chart-segments': {
    bg: 'dark',
    run(el) {
      const segs = [[0.42, '#dcf244'], [0.28, '#9be7ff'], [0.18, '#ff8fa3'], [0.12, '#b69cff']]
      let acc = 0
      const cs = segs.map(([v, c], i) => { const s = `<circle cx="50" cy="50" r="36" pathLength="100" style="--v:${v * 100 - 1};--o:${-acc * 100};--i:${i};stroke:${c}"/>`; acc += v; return s }).join('')
      el.innerHTML = center(`<div class="rv-donut">${svg('0 0 100 100', cs)}<b>42%</b></div>`)
    },
  },

  'turbulence-distortion': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<svg width="0" height="0" style="position:absolute"><filter id="rvWater"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="3"><animate attributeName="baseFrequency" dur="6s" values="0.012 0.04;0.02 0.06;0.012 0.04" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="18"/></filter></svg><b class="rv-water">水中倒影</b>`)
    },
  },

  'icon-micro-animations': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="rv-micro"><span class="bell">🔔</span><span class="heart">❤</span><span class="gear">⚙</span><span class="arrow">➜</span></div>')
      const ss = [...el.querySelectorAll('.rv-micro span')]
      return every(900, (n) => ss.forEach((s, i) => s.classList.toggle('on', i === n % 4)))
    },
  },

  'map-route': {
    bg: 'light',
    run(el) {
      el.innerHTML = `<div class="rv-map">${svg('0 0 300 150', `<path class="rv-street" d="M0 40 H300 M0 110 H300 M70 0 V150 M200 0 V150"/>${draw('M40 120 C 70 120, 70 40, 120 40 S 200 90, 250 40', 0, 'class="rv-draw route"')}<circle class="rv-start" cx="40" cy="120" r="6"/>`, 'full')}<i class="pin">📍</i></div>`
    },
  },

  'analog-clock': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(`<div class="rv-clock">${Array.from({ length: 12 }, (_, i) => `<i class="tick" style="--a:${i * 30}deg"></i>`).join('')}<i class="h"></i><i class="m"></i><i class="s"></i></div>`)
      const [h, m, s] = ['.h', '.m', '.s'].map((q) => el.querySelector(q))
      return frames(() => {
        const d = new Date(), sec = d.getSeconds() + d.getMilliseconds() / 1000
        s.style.transform = `rotate(${sec * 6}deg)`
        m.style.transform = `rotate(${(d.getMinutes() + sec / 60) * 6}deg)`
        h.style.transform = `rotate(${(d.getHours() % 12) * 30 + d.getMinutes() * 0.5}deg)`
      })
    },
  },

  'animated-weather-icons': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="rv-weather"><div class="sun"><i></i></div><div class="cloud"><i></i></div><div class="rain"><i class="c"></i><b style="--i:0"></b><b style="--i:1"></b><b style="--i:2"></b></div></div>')
    },
  },

  'marching-ants-selection': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(`<div class="rv-sel"><i class="img"></i>${svg('0 0 100 100', '<rect x="1" y="1" width="98" height="98" pathLength="100"/>', 'ants')}<b></b><b></b><b></b><b></b></div>`)
    },
  },

  'organic-blob': {
    bg: 'dark',
    run(el) { el.innerHTML = center('<i class="rv-blob"></i>') },
  },

  'badge-unlock': {
    bg: 'dark',
    run(el) {
      const stars = Array.from({ length: 8 }, (_, i) => `<i style="--a:${i * 45}deg"></i>`).join('')
      el.innerHTML = center(`<div class="rv-badge"><div class="medal">🏆</div><span class="stars">${stars}</span><b>連續登入 7 天</b></div>`)
    },
  },

  'ecg-heartbeat-line': {
    bg: 'dark',
    run(el) {
      const beat = (x) => `L${x} 50 L${x + 10} 50 L${x + 15} 40 L${x + 20} 50 L${x + 26} 50 L${x + 30} 15 L${x + 35} 82 L${x + 40} 50 L${x + 50} 50 L${x + 56} 42 L${x + 64} 50`
      el.innerHTML = center(svg('0 0 300 100', `<path class="rv-ecg" pathLength="100" d="M0 50 ${beat(20)} ${beat(120)} ${beat(220)} L300 50"/>`, 'full'))
    },
  },

  'growing-plant': {
    bg: 'light',
    run(el) {
      const leaves = [[50, 80, -40], [50, 60, 40], [50, 42, -35], [50, 26, 30]]
      el.innerHTML = center(svg('0 0 100 100', `${draw('M50 98 C 46 80, 56 60, 48 40 C 44 28, 52 16, 50 8', 0, 'class="rv-draw stem"')}${leaves.map(([x, y, r], i) => `<ellipse class="rv-leaf" cx="${x + (r > 0 ? 9 : -9)}" cy="${y}" rx="10" ry="5" style="--i:${i};transform-origin:${x}px ${y}px;rotate:${r}deg"/>`).join('')}`, 'mid loop'))
    },
  },

  'gear-train': {
    bg: 'dark',
    run(el) {
      const gear = (teeth, r) => {
        let d = ''
        for (let i = 0; i < teeth; i++) {
          const a = (i / teeth) * Math.PI * 2, w = Math.PI / teeth / 2
          const p = (ang, rr) => `${50 + Math.cos(ang) * rr} ${50 + Math.sin(ang) * rr}`
          d += `${i ? 'L' : 'M'}${p(a - w, r)} L${p(a - w * 0.6, r + 7)} L${p(a + w * 0.6, r + 7)} L${p(a + w, r)} `
        }
        return `${d}Z M${50 + r * 0.35} 50 A${r * 0.35} ${r * 0.35} 0 1 0 ${50 + r * 0.35} 50.01Z`
      }
      el.innerHTML = center(`<div class="rv-gears">${svg('0 0 100 100', `<path d="${gear(12, 36)}" fill-rule="evenodd"/>`, 'g1')}${svg('0 0 100 100', `<path d="${gear(8, 34)}" fill-rule="evenodd"/>`, 'g2')}</div>`)
    },
  },

  'fingerprint-scan': {
    bg: 'dark',
    run(el) {
      // 每條脊線是開口朝下的橢圓弧，中間挖一個缺口，看起來像指紋
      const ridge = (r, i) => {
        const seg = (a0, a1) => Array.from({ length: 24 }, (_, k) => {
          const a = a0 + ((a1 - a0) * k) / 23
          return `${k ? 'L' : 'M'}${(50 + Math.cos(a) * r).toFixed(1)} ${(56 + Math.sin(a) * r * 1.3).toFixed(1)}`
        }).join(' ')
        const gap = Math.PI * (1.1 + ((i * 0.37) % 0.8))
        const start = Math.PI * (0.78 - i * 0.012), end = Math.PI * (2.22 + i * 0.012)
        return `<path class="rv-fp" style="--i:${i}" d="${seg(start, gap - 0.12)} ${seg(gap + 0.12, end)}"/>`
      }
      const arcs = [4, 8, 12, 16, 20, 24, 28, 32, 36].map(ridge).join('')
      el.innerHTML = center(`<div class="rv-finger">${svg('0 0 100 110', arcs)}<i class="scan"></i></div><small class="rv-fp-label">掃描中…</small>`)
      const label = el.querySelector('.rv-fp-label')
      return every(1000, (n) => (label.textContent = n % 4 === 2 || n % 4 === 3 ? '驗證成功 ✓' : '掃描中…'))
    },
  },

  // ── 背景・氛圍 ─────────────────────────
  'letter-rain': {
    bg: 'dark',
    run(el) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      el.innerHTML = `<div class="rv-rain">${Array.from({ length: 28 }, (_, i) => `<span style="left:${(i * 3.6 + Math.random() * 2).toFixed(1)}%;--s:${(2 + Math.random() * 3).toFixed(2)}s;--d:${(-Math.random() * 5).toFixed(2)}s">${letters[(i * 7) % 26]}</span>`).join('')}</div>`
    },
  },

  'word-pulse-grid': {
    bg: 'dark',
    run(el) {
      let cells = ''
      for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) cells += `<span style="--d:${Math.hypot(r - 2.5, c - 4).toFixed(2)}">PULSE</span>`
      el.innerHTML = `<div class="rv-pulse">${cells}</div>`
    },
  },

  'checker-words': {
    bg: 'dark',
    run(el) {
      let cells = ''
      for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) cells += `<div class="${(r + c) % 2 ? 'odd' : ''}"><span>黑</span><span>白</span></div>`
      el.innerHTML = `<div class="rv-checker">${cells}</div>`
    },
  },

  'grid-stagger': {
    bg: 'dark',
    run(el) {
      let dots = ''
      for (let r = 0; r < 9; r++) for (let c = 0; c < 17; c++) dots += `<i style="--d:${Math.hypot(r - 4, c - 8).toFixed(2)}"></i>`
      el.innerHTML = `<div class="rv-dotgrid">${dots}</div>`
    },
  },

  'aurora-gradient': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rv-aurora"><i></i><i></i><i></i></div>' },
  },

  'spotlight-grid': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rv-sgrid">${'<i></i>'.repeat(60)}</div>`
      const cells = [...el.querySelectorAll('.rv-sgrid i')]
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect()
        cells.forEach((c) => {
          const b = c.getBoundingClientRect()
          const d = Math.hypot(b.left - r.left + b.width / 2 - x, b.top - r.top + b.height / 2 - y)
          c.style.setProperty('--k', Math.max(0, 1 - d / (el.clientHeight * 0.45)).toFixed(2))
        })
      })
    },
  },

  'warp-speed': {
    bg: 'dark',
    run(el) {
      const rays = Array.from({ length: 160 }, () => ({ a: Math.random() * Math.PI * 2, r: Math.random(), v: 0.004 + Math.random() * 0.01 }))
      return canvas(el, (ctx, w, h) => {
        ctx.fillStyle = 'rgba(6,6,14,.35)'
        ctx.fillRect(0, 0, w, h)
        const R = Math.hypot(w, h) / 2
        for (const p of rays) {
          p.r += p.v + p.r * 0.03
          if (p.r > 1) Object.assign(p, { r: 0.02, a: Math.random() * Math.PI * 2 })
          const r1 = p.r * R, r2 = r1 * 0.82
          ctx.strokeStyle = `hsl(${(p.a * 180) / Math.PI}, 90%, ${50 + p.r * 30}%)`
          ctx.lineWidth = 0.5 + p.r * 2
          ctx.beginPath()
          ctx.moveTo(w / 2 + Math.cos(p.a) * r2, h / 2 + Math.sin(p.a) * r2)
          ctx.lineTo(w / 2 + Math.cos(p.a) * r1, h / 2 + Math.sin(p.a) * r1)
          ctx.stroke()
        }
      })
    },
  },

  'flow-field': {
    bg: 'dark',
    run(el) {
      const ps = Array.from({ length: 260 }, () => ({ x: Math.random(), y: Math.random() }))
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      return canvas(el, (ctx, w, h, t) => {
        ctx.fillStyle = 'rgba(14,14,16,.06)'
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = accent
        for (const p of ps) {
          const a = Math.sin(p.x * 6 + t / 3000) * 2 + Math.cos(p.y * 5 - t / 4000) * 2
          p.x += (Math.cos(a) * 1.2) / w
          p.y += (Math.sin(a) * 1.2) / h
          if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) { p.x = Math.random(); p.y = Math.random() }
          ctx.fillRect(p.x * w, p.y * h, 1.4, 1.4)
        }
      })
    },
  },

  'falling-petals': {
    bg: 'dark',
    run(el) {
      const ps = Array.from({ length: 36 }, () => ({ x: Math.random(), y: Math.random(), s: 0.5 + Math.random(), r: Math.random() * 6, v: 0.6 + Math.random() }))
      return canvas(el, (ctx, w, h, t) => {
        ctx.clearRect(0, 0, w, h)
        for (const p of ps) {
          p.y += (p.v * 0.6) / h * 1.6
          if (p.y > 1.05) Object.assign(p, { y: -0.05, x: Math.random() })
          const x = p.x * w + Math.sin(t / 900 + p.r) * 18
          ctx.save()
          ctx.translate(x, p.y * h)
          ctx.rotate(t / 700 + p.r)
          ctx.fillStyle = `rgba(255, ${170 + p.s * 30}, ${190 + p.s * 20}, ${1 - p.y * 0.6})`
          ctx.beginPath()
          ctx.ellipse(0, 0, 7 * p.s, 4 * p.s, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })
    },
  },

  'magnetic-dot-grid': {
    bg: 'dark',
    run(el) {
      let mx = -999, my = -999
      const b = bag()
      b.add(pointer(el, (x, y) => { mx = x; my = y }))
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      b.add(canvas(el, (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h)
        const gap = h / 9, R = h * 0.35
        for (let y = gap / 2; y < h; y += gap)
          for (let x = gap / 2; x < w; x += gap) {
            const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy)
            const k = Math.max(0, 1 - d / R)
            ctx.fillStyle = k > 0.05 ? accent : 'rgba(255,255,255,.25)'
            ctx.beginPath()
            ctx.arc(x + (dx / (d || 1)) * k * gap * 0.9, y + (dy / (d || 1)) * k * gap * 0.9, 1.6 + k * 3, 0, Math.PI * 2)
            ctx.fill()
          }
      }))
      return b.clear
    },
  },

  'water-ripple': {
    bg: 'dark',
    run(el) {
      const rings = []
      const add = (x, y) => rings.push({ x, y, t: 0 })
      const down = (e) => { const r = el.getBoundingClientRect(); add(e.clientX - r.left, e.clientY - r.top) }
      el.addEventListener('pointerdown', down)
      const b = bag()
      b.add(every(1100, () => add(el.clientWidth * (0.2 + Math.random() * 0.6), el.clientHeight * (0.2 + Math.random() * 0.6))))
      b.add(canvas(el, (ctx, w, h) => {
        const g = ctx.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, '#0b2a4a'); g.addColorStop(1, '#0d4a6a')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
        for (let i = rings.length - 1; i >= 0; i--) {
          const r = rings[i]
          r.t += 1
          for (let k = 0; k < 3; k++) {
            const rad = r.t * 1.6 - k * 14
            if (rad <= 0) continue
            ctx.strokeStyle = `rgba(155, 231, 255, ${Math.max(0, 1 - r.t / 110) * (1 - k * 0.3)})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.ellipse(r.x, r.y, rad, rad * 0.45, 0, 0, Math.PI * 2)
            ctx.stroke()
          }
          if (r.t > 110) rings.splice(i, 1)
        }
      }))
      b.add(() => el.removeEventListener('pointerdown', down))
      return b.clear
    },
  },

  fireworks: {
    bg: 'dark',
    run(el) {
      const parts = []
      let next = 0
      const boom = (x, y) => {
        const hue = Math.random() * 360
        for (let i = 0; i < 70; i++) {
          const a = (i / 70) * Math.PI * 2, v = 1.8 + Math.random() * 2.4
          parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, hue: hue + Math.random() * 40 })
        }
      }
      el.addEventListener('pointerdown', (e) => { const r = el.getBoundingClientRect(); boom(e.clientX - r.left, e.clientY - r.top) })
      return canvas(el, (ctx, w, h, t) => {
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = 'rgba(8,8,16,.18)'
        ctx.fillRect(0, 0, w, h)
        ctx.globalCompositeOperation = 'lighter'
        if (t > next) { boom(w * (0.2 + Math.random() * 0.6), h * (0.2 + Math.random() * 0.35)); next = t + 900 }
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i]
          const ox = p.x, oy = p.y
          p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.vx *= 0.985; p.vy *= 0.985; p.life -= 0.012
          ctx.strokeStyle = `hsla(${p.hue}, 95%, ${60 + p.life * 25}%, ${p.life})`
          ctx.lineWidth = 2.4
          ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(p.x, p.y); ctx.stroke()
          if (p.life <= 0) parts.splice(i, 1)
        }
      })
    },
  },

  'grain-gradient': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rv-grain"><i></i><i></i><i></i></div>' },
  },

  'retro-grid-horizon': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rv-horizon"><i class="mtn"></i><div class="floor"><div class="lines"></div></div></div>' },
  },

  'bokeh-lights': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rv-bokeh">${Array.from({ length: 16 }, (_, i) => `<i style="left:${(i * 37) % 100}%;top:${(i * 53) % 100}%;--s:${6 + (i % 5) * 4}cqh;--h:${(i * 40) % 360};--d:${-(i % 7)}s"></i>`).join('')}</div>`
    },
  },

  'pulse-rings': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rv-rings">${[0, 1, 2, 3, 4].map((i) => `<i style="--i:${i}"></i>`).join('')}</div>` },
  },

  'sunburst-rays': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rv-burst"><i class="rays"></i><i class="core"></i></div>' },
  },

  'twinkling-sky': {
    bg: 'dark',
    run(el) {
      const stars = Array.from({ length: 120 }, () => ({ x: Math.random(), y: Math.random(), p: Math.random() * 6, s: Math.random() * 1.4 + 0.4 }))
      let meteor = null
      return canvas(el, (ctx, w, h, t) => {
        const g = ctx.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, '#05071a'); g.addColorStop(1, '#1a1446')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
        for (const s of stars) {
          ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(t / 900 + s.p))
          ctx.fillStyle = '#fff'
          ctx.fillRect(s.x * w, s.y * h, s.s, s.s)
        }
        ctx.globalAlpha = 1
        if (!meteor && Math.random() < 0.01) meteor = { x: Math.random() * w, y: 0, life: 1 }
        if (meteor) {
          meteor.x -= 6; meteor.y += 3.5; meteor.life -= 0.02
          const grad = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x + 60, meteor.y - 35)
          grad.addColorStop(0, `rgba(255,255,255,${meteor.life})`); grad.addColorStop(1, 'transparent')
          ctx.strokeStyle = grad
          ctx.lineWidth = 2
          ctx.beginPath(); ctx.moveTo(meteor.x, meteor.y); ctx.lineTo(meteor.x + 60, meteor.y - 35); ctx.stroke()
          if (meteor.life <= 0) meteor = null
        }
      })
    },
  },

  'depth-parallax': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rv-depth"><i class="l0"></i><i class="l1"></i><i class="l2"></i><b class="l3">DEPTH</b></div>'
      const ls = [...el.querySelectorAll('.rv-depth > *')]
      return pointer(el, (x, y) => {
        const dx = x / el.clientWidth - 0.5, dy = y / el.clientHeight - 0.5
        ls.forEach((l, i) => (l.style.transform = `translate(${-dx * (i + 1) * 14}px, ${-dy * (i + 1) * 10}px)`))
      })
    },
  },

  'wavy-lines': {
    bg: 'dark',
    run(el) {
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      return canvas(el, (ctx, w, h, t) => {
        ctx.clearRect(0, 0, w, h)
        ctx.strokeStyle = accent
        for (let i = 0; i < 14; i++) {
          const base = (h / 15) * (i + 1)
          ctx.globalAlpha = 0.25 + (i / 14) * 0.6
          ctx.beginPath()
          for (let x = 0; x <= w; x += 6) {
            const y = base + Math.sin(x / 70 + t / 900 + i * 0.4) * 8 + Math.sin(x / 31 - t / 1300) * 4
            x ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
          }
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      })
    },
  },

  'floating-shapes': {
    bg: 'dark',
    run(el) {
      const shapes = ['circle', 'tri', 'sq', 'circle', 'sq', 'tri', 'ring']
      el.innerHTML = `<div class="rv-shapes">${shapes.map((s, i) => `<i class="${s}" style="left:${8 + i * 13}%;top:${20 + ((i * 37) % 55)}%;--d:${-i * 1.3}s;--s:${7 + (i % 3) * 2}s;--h:${i * 50}"></i>`).join('')}</div>`
    },
  },
}
