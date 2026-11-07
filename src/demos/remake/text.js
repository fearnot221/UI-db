// 文字 72 招。多數用逐字 span（--i 為第幾個字）+ CSS 動畫，少數用 JS
import './text.css'
import { chars, every, frames, replay, bag, pointer, rand } from '../utils.js'

const W = (cls, html, extra = '') => `<div class="rt-center"><div class="rt ${cls}" ${extra}>${html}</div></div>`
const word = (s, cls) => W(cls, chars(s, 'c'))
const css = (cls, s) => ({ bg: 'dark', run(el) { el.innerHTML = word(s, cls) } })
const cssLight = (cls, s) => ({ bg: 'light', run(el) { el.innerHTML = word(s, cls) } })
const toggleEvery = (node, cls, ms) => every(ms, (n) => node.classList.toggle(cls, n % 2 === 1))
const GLYPHS = '!<>-_\\/[]{}—=+*^?#ABCDEF0123456789'
// 每個字元一組隨機數（散開、爆炸用）
const scatter = (el, sel, amp = 1) =>
  el.querySelectorAll(sel).forEach((c) => {
    c.style.setProperty('--x', `${(Math.random() - 0.5) * 80 * amp}cqw`)
    c.style.setProperty('--y', `${(Math.random() - 0.5) * 90 * amp}cqh`)
    c.style.setProperty('--r', `${(Math.random() - 0.5) * 540}deg`)
  })

export default {
  'lightning-strike': {
    bg: 'dark',
    run(el) { el.innerHTML = `<i class="rt-flash"></i><svg class="rt-bolt" viewBox="0 0 40 100"><path d="M24 0 L6 54 H20 L12 100 L36 38 H22 Z"/></svg>${word('雷鳴', 'strike')}` },
  },

  'laser-cut': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rt-center"><div class="rt laser"><b class="top">切斷</b><b class="bot">切斷</b><i class="beam"></i></div></div>' },
  },

  'coin-flip': css('coin', '表か裏か'),

  'explode-out': {
    bg: 'dark',
    run(el) {
      el.innerHTML = word('爆発四散', 'explode')
      return every(2400, () => { scatter(el, '.c'); replay(el.querySelector('.rt'), 'go') })
    },
  },

  disintegrate: css('dust', '消滅'),
  'heartbeat-zoom': css('heart', '鼓動'),

  'text-kaleido': {
    bg: 'light',
    run(el) { el.innerHTML = `<div class="rt-center"><div class="rt kaleido">${Array.from({ length: 8 }, (_, i) => `<b style="--i:${i}">花</b>`).join('')}</div></div>` },
  },

  'number-slam': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rt-center rt-shake"><b class="rt slam"></b></div>'
      const b = el.querySelector('.slam'), box = el.firstChild
      return every(700, (n) => {
        const k = n % 5
        b.textContent = ['3', '2', '1', 'GO!', ''][k]
        if (k < 4) { replay(b, 'go'); replay(box, 'go') }
      })
    },
  },

  'wave-letters': css('wave', 'うねる波'),
  'stop-motion': cssLight('stop', 'コマ撮り'),

  'magnifier-text': {
    bg: 'light',
    run(el) {
      const t = '仔細看每一個細節'
      el.innerHTML = `<div class="rt-center"><div class="rt mag"><span>${t}</span><i class="lens"><span>${t}</span></i></div></div>`
      const box = el.querySelector('.mag'), lens = box.querySelector('.lens'), inner = lens.firstChild
      return frames((ms) => {
        const w = box.offsetWidth, r = lens.offsetWidth / 2
        const x = w / 2 + Math.sin(ms / 1100) * w * 0.42
        lens.style.transform = `translate(${x - r}px, -50%)`
        inner.style.transform = `translateX(${r - x * 1.8}px) scale(1.8)`
      })
    },
  },

  'scramble-decode': {
    bg: 'dark',
    run(el) {
      const target = 'DECODE 解讀中'
      el.innerHTML = W('scramble', '')
      const box = el.querySelector('.rt')
      return every(55, (n) => {
        const k = n % 60
        const locked = Math.floor(k / 3)
        box.textContent = [...target].map((c, i) => (c === ' ' ? ' ' : i < locked ? c : rand([...GLYPHS]))).join('')
      })
    },
  },

  'domino-letters': css('domino', 'DOMINO'),
  'gradient-flow': css('gflow', 'Gradient'),

  'circle-text': {
    bg: 'dark',
    run(el) {
      const t = [...'MOTION · LIBRARY · REMAKE · ']
      el.innerHTML = `<div class="rt-center"><div class="rt circle">${t.map((c, i) => `<span style="--a:${(i * 360) / t.length}deg">${c}</span>`).join('')}<b>✦</b></div></div>`
    },
  },

  'water-reflection': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<svg width="0" height="0" style="position:absolute"><filter id="rtRipple"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.08" numOctaves="1"><animate attributeName="baseFrequency" dur="4s" values="0.01 0.08;0.015 0.12;0.01 0.08" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="8"/></filter></svg><div class="rt-center"><div class="rt reflect"><b>湖面</b><b class="mirror">湖面</b></div></div>`
    },
  },

  'letter-bounce': css('bounce', 'BOUNCE'),
  'text-flag': css('flag', '旗がなびく'),
  'gravity-flip': css('gravity', 'GRAVITY'),

  'magnet-pull': {
    bg: 'dark',
    run(el) {
      el.innerHTML = word('MAGNET', 'magnet')
      scatter(el, '.c', 1.4)
      return every(3000, () => { scatter(el, '.c', 1.4); replay(el.querySelector('.rt'), 'go') })
    },
  },

  'weight-grow': css('weight', 'Weight'),
  'text-fan': css('fan', 'FANOUT'),

  'karaoke-ball': {
    bg: 'dark',
    run(el) {
      const ws = ['今晚', '的', '月亮', '好', '圓']
      el.innerHTML = `<div class="rt-center"><div class="rt karaoke"><i class="ball"></i>${ws.map((w) => `<span>${w}</span>`).join('')}</div></div>`
      const spans = [...el.querySelectorAll('.karaoke span')], ball = el.querySelector('.ball'), box = el.querySelector('.karaoke')
      return frames((t) => {
        const k = (t % 4000) / 4000 * (spans.length + 1)
        const i = Math.min(spans.length - 1, Math.floor(k)), f = k - Math.floor(k)
        spans.forEach((s, j) => s.classList.toggle('on', j < k))
        const a = spans[i].getBoundingClientRect(), b = spans[Math.min(spans.length - 1, i + 1)].getBoundingClientRect(), r = box.getBoundingClientRect()
        const x = a.left - r.left + a.width / 2 + (b.left - a.left) * f
        ball.style.transform = `translate(${x}px, ${-Math.sin(f * Math.PI) * 30}px)`
      })
    },
  },

  'swing-letters': cssLight('swing', 'SWING'),

  'pixel-dissolve': {
    bg: 'dark',
    run(el) {
      const N = 14 * 6
      el.innerHTML = `<div class="rt-center"><div class="rt pixel"><b>PIXEL</b><div class="grid">${'<i></i>'.repeat(N)}</div></div></div>`
      const cells = [...el.querySelectorAll('.pixel i')]
      const order = cells.map((_, i) => i).sort(() => Math.random() - 0.5)
      return every(28, (n) => {
        const k = n % (N * 2 + 40)
        if (k < N) cells[order[k]].classList.add('on')
        else if (k >= N + 20 && k < N * 2 + 20) cells[order[k - N - 20]].classList.remove('on')
      })
    },
  },

  'rotating-words': {
    bg: 'dark',
    run(el) {
      const ws = ['設計', '動畫', '網站', '品牌']
      el.innerHTML = `<div class="rt-center"><div class="rt drum-line">我們做<span class="drum"><span class="in">${ws.map((w, i) => `<b style="--i:${i}">${w}</b>`).join('')}</span></span></div></div>`
      const inner = el.querySelector('.drum .in')
      return every(1600, (n) => (inner.style.transform = `rotateX(${n * 90}deg)`))
    },
  },

  'blur-trail': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rt-center"><div class="rt trail">${[3, 2, 1, 0].map((i) => `<b style="--i:${i}">疾走</b>`).join('')}</div></div>` },
  },

  'roller-path': {
    bg: 'dark',
    run(el) {
      const t = [...'INFINITY∞LOOP']
      const d = 'M 300 90 C 380 10, 480 10, 480 90 C 480 170, 380 170, 300 90 C 220 10, 120 10, 120 90 C 120 170, 220 170, 300 90'
      el.innerHTML = `<div class="rt-roller"><div class="in"><svg viewBox="0 0 600 180"><path d="${d}"/></svg>${t.map((c, i) => `<span style="offset-path:path('${d}');--i:${i};--n:${t.length}">${c}</span>`).join('')}</div></div>`
      const box = el.querySelector('.in')
      const fit = () => (box.style.transform = `scale(${el.clientWidth / 600})`)
      fit()
      return every(500, fit)
    },
  },

  'shuffle-letters': {
    bg: 'dark',
    run(el) {
      const t = 'SHUFFLE'
      el.innerHTML = word(t, 'shuffle')
      const cs = [...el.querySelectorAll('.c')]
      return every(1300, (n) => {
        if (n % 2 === 0) return cs.forEach((c) => (c.style.transform = ''))
        const xs = cs.map((c) => c.offsetLeft)
        const perm = xs.map((_, i) => i).sort(() => Math.random() - 0.5)
        cs.forEach((c, i) => (c.style.transform = `translateX(${xs[perm[i]] - xs[i]}px)`))
      })
    },
  },

  'text-spiral': {
    bg: 'dark',
    run(el) {
      const t = [...'旋轉的漩渦不停地轉啊轉啊轉不停']
      el.innerHTML = `<div class="rt-center"><div class="rt spiral">${t.map((c, i) => `<span style="--a:${i * 32}deg;--r:${4 + i * 1.9}cqh;--s:${0.5 + i * 0.05}">${c}</span>`).join('')}</div></div>`
    },
  },

  'jitter-settle': css('jitter', '緊張感'),
  'elastic-wave-stretch': cssLight('elastic', 'ELASTIC'),

  'ink-bleed': {
    bg: 'light',
    run(el) { el.innerHTML = '<div class="rt-center rt-inkwrap"><b class="rt ink">墨</b></div>' },
  },

  'letter-assemble': {
    bg: 'dark',
    run(el) {
      el.innerHTML = word('集合！', 'assemble')
      scatter(el, '.c')
      return every(3200, () => { scatter(el, '.c'); replay(el.querySelector('.rt'), 'go') })
    },
  },

  'text-mosaic': {
    bg: 'light',
    run(el) {
      const fonts = ['"Noto Serif TC", serif', '"Space Grotesk", sans-serif', 'ui-monospace, Menlo, monospace', '"Noto Sans TC", sans-serif', 'Georgia, serif', 'Impact, sans-serif']
      el.innerHTML = `<div class="rt-mosaic">${Array.from({ length: 12 }, (_, i) => `<span style="--i:${i}">Aa字</span>`).join('')}</div>`
      const ss = [...el.querySelectorAll('.rt-mosaic span')]
      return every(500, (n) => ss.forEach((s, i) => (s.style.fontFamily = fonts[(i + n) % fonts.length])))
    },
  },

  'crumble-down': {
    bg: 'dark',
    run(el) {
      el.innerHTML = word('崩れ落ちる', 'crumble')
      const set = () => el.querySelectorAll('.c').forEach((c) => { c.style.setProperty('--d', `${Math.random() * 0.6}s`); c.style.setProperty('--r', `${(Math.random() - 0.5) * 200}deg`) })
      set()
      return every(3000, () => { set(); replay(el.querySelector('.rt'), 'go') })
    },
  },

  'float-drift': css('float', 'ふわふわ'),
  'split-rise': css('rise', 'RISE UP'),

  'scramble-reveal': {
    bg: 'dark',
    run(el) {
      const target = 'ACCESS GRANTED'
      el.innerHTML = W('scramble green', '')
      const box = el.querySelector('.rt')
      let lock = []
      return every(50, (n) => {
        const k = n % 70
        if (k === 0) lock = [...target].map(() => 10 + Math.random() * 40)
        box.textContent = [...target].map((c, i) => (c === ' ' ? ' ' : k > lock[i] ? c : rand([...GLYPHS]))).join('')
      })
    },
  },

  'typing-swap': {
    bg: 'light',
    run(el) {
      const lines = ['做出好看的網站', '做出好用的 App', '做出動人的品牌']
      el.innerHTML = '<div class="rt-center"><div class="rt typing"><span class="txt"></span><i class="caret"></i></div></div>'
      const txt = el.querySelector('.txt')
      return every(110, (n) => {
        const L = 40, k = n % L, s = lines[Math.floor(n / L) % lines.length]
        txt.classList.toggle('sel', k >= 30 && k < 35)
        txt.textContent = k < 35 ? s.slice(0, Math.min(k, s.length)) : ''
      })
    },
  },

  'elastic-drop': css('drop', 'DROP'),
  '3d-char-flip': css('cflip', 'FLIPPING'),

  'random-scatter': {
    bg: 'dark',
    run(el) {
      el.innerHTML = word('SCATTER', 'rscatter')
      return every(1400, (n) => {
        if (n % 2) scatter(el, '.c', 0.6)
        el.querySelector('.rt').classList.toggle('out', n % 2 === 1)
      })
    },
  },

  'word-rotator': {
    bg: 'dark',
    run(el) {
      const ws = ['設計師', '工程師', '創作者', '設計師']
      el.innerHTML = `<div class="rt-center"><div class="rt rotator">為<span class="mask"><span class="in">${ws.map((w) => `<b>${w}</b>`).join('')}</span></span>而生</div></div>`
      const inner = el.querySelector('.rotator .in')
      return every(1600, (n) => {
        const k = n % 4
        inner.style.transition = k === 0 ? 'none' : ''
        inner.style.transform = `translateY(${-k * 25}%)`
      })
    },
  },

  'number-counter': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rt-center"><div class="rt counter"><b>0</b><small>次下載</small></div></div>'
      const b = el.querySelector('.counter b')
      return frames((t) => {
        const k = Math.min(1, (t % 3600) / 1500)
        b.textContent = Math.round(98765 * (1 - (1 - k) ** 4)).toLocaleString()
      })
    },
  },

  'magnetic-letters': {
    bg: 'dark',
    run(el) {
      el.innerHTML = word('MAGNETIC', 'mletters')
      const cs = [...el.querySelectorAll('.c')]
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect()
        cs.forEach((c) => {
          const b = c.getBoundingClientRect()
          const dx = x - (b.left - r.left + b.width / 2), dy = y - (b.top - r.top + b.height / 2)
          const k = Math.max(0, 1 - Math.hypot(dx, dy) / (el.clientHeight * 0.5))
          c.style.transform = `translate(${dx * k * 0.4}px, ${dy * k * 0.4}px) scale(${1 + k * 0.3})`
          c.style.color = k > 0.2 ? 'var(--accent)' : ''
        })
      })
    },
  },

  'squash-bounce': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rt-center"><b class="rt squash">ボヨン</b><i class="rt-floor"></i></div>' },
  },

  'soft-line-fade': {
    bg: 'light',
    run(el) {
      const lines = ['清晨的光落在窗台上，', '咖啡還冒著熱氣，', '今天也慢慢來就好。']
      el.innerHTML = `<div class="rt-center"><div class="rt soft">${lines.map((l, i) => `<p style="--i:${i}">${l}</p>`).join('')}</div></div>`
    },
  },

  'underline-slide-link': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rt-center"><div class="rt links"><a>作品集</a><a>部落格</a><a>聯絡我</a></div></div>'
      const as = [...el.querySelectorAll('a')]
      return every(700, (n) => as.forEach((a, i) => a.classList.toggle('on', Math.floor(n / 2) % 3 === i && n % 2 === 0)))
    },
  },

  'outline-text-fill': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rt-center"><div class="rt ofill"><b>OUTLINE</b><b class="solid">OUTLINE</b></div></div>'
      return toggleEvery(el.querySelector('.ofill'), 'on', 1500)
    },
  },

  'letter-hover-bounce': {
    bg: 'dark',
    run(el) {
      el.innerHTML = word('HOVER ME', 'hbounce')
      const cs = [...el.querySelectorAll('.c')]
      cs.forEach((c) => c.addEventListener('pointerenter', () => replay(c, 'go')))
      let last = -1
      return pointer(el, (x) => {
        const r = el.getBoundingClientRect()
        const k = cs.findIndex((c) => { const b = c.getBoundingClientRect(); return x >= b.left - r.left && x <= b.right - r.left })
        if (k >= 0 && k !== last) replay(cs[k], 'go')
        last = k
      })
    },
  },

  'particle-text': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<canvas class="rt-canvas"></canvas>'
      const cv = el.firstChild, ctx = cv.getContext('2d')
      let pts = [], mx = -999, my = -999
      const build = () => {
        const w = el.clientWidth, h = el.clientHeight
        cv.width = w; cv.height = h
        const off = document.createElement('canvas'), o = off.getContext('2d', { willReadFrequently: true })
        off.width = w; off.height = h
        o.fillStyle = '#fff'; o.font = `900 ${h * 0.42}px "Space Grotesk", sans-serif`; o.textAlign = 'center'; o.textBaseline = 'middle'
        o.fillText('PIXEL', w / 2, h / 2)
        const d = o.getImageData(0, 0, w, h).data, step = Math.max(3, Math.round(h / 60))
        pts = []
        for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (d[(y * w + x) * 4 + 3] > 128) pts.push({ hx: x, hy: y, x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0 })
      }
      build()
      document.fonts?.ready.then(build)
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      const b = bag()
      b.add(pointer(el, (x, y) => { mx = x; my = y }))
      b.add(frames(() => {
        ctx.clearRect(0, 0, cv.width, cv.height)
        ctx.fillStyle = accent
        const R = cv.height * 0.25
        for (const p of pts) {
          const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy)
          if (d < R) { p.vx += (dx / d) * (R - d) * 0.05; p.vy += (dy / d) * (R - d) * 0.05 }
          p.vx += (p.hx - p.x) * 0.06; p.vy += (p.hy - p.y) * 0.06
          p.vx *= 0.82; p.vy *= 0.82
          p.x += p.vx; p.y += p.vy
          ctx.fillRect(p.x, p.y, 2, 2)
        }
      }))
      return b.clear
    },
  },

  breathe: css('breathe', 'breathe'),
  drift: cssLight('drift', '靜かに漂う'),
  tumble: css('tumble', 'TUMBLE'),

  merge: {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rt-center"><div class="rt merge"><b class="top">合體</b><b class="bot">合體</b></div></div>' },
  },

  spread: css('spread', 'SPREAD'),
  skate: css('skate', 'スケート'),

  'split-text-hover': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rt-center"><div class="rt splith"><span class="mid">SECRET</span><b class="top">REVEAL</b><b class="bot">REVEAL</b></div></div>'
      return toggleEvery(el.querySelector('.splith'), 'on', 1400)
    },
  },

  'letter-spacing-expand': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rt-center"><div class="rt tracking"><a>ABOUT</a><a>WORK</a><a>CONTACT</a></div></div>'
      const as = [...el.querySelectorAll('a')]
      return every(800, (n) => as.forEach((a, i) => a.classList.toggle('on', n % 3 === i)))
    },
  },

  'highlighter-hover': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rt-center"><p class="rt hlhover">好的設計是<mark>看不見</mark>的，它讓人<mark>自然</mark>地完成想做的<mark>事</mark>。</p></div>'
      const ms = [...el.querySelectorAll('mark')]
      return every(900, (n) => ms.forEach((m, i) => m.classList.toggle('on', i <= n % 4 - 0 && n % 4 !== 3)))
    },
  },

  'link-preview-popover': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rt-center"><p class="rt preview">靈感來自 <a>Motion Library<span class="card"><i class="rd-pic" style="--h:80"></i><b>Motion Library</b><small>kittenjam-motion-library.vercel.app</small></span></a> 的收藏。</p></div>'
      return toggleEvery(el.querySelector('.preview a'), 'on', 1600)
    },
  },

  'handwriting-draw': {
    bg: 'light',
    run(el) { el.innerHTML = '<div class="rt-center"><svg class="rt-hand" viewBox="0 0 400 120"><text x="200" y="88" text-anchor="middle">Hello</text></svg></div>' },
  },

  'weight-wave': css('wwave', 'WEIGHTWAVE'),

  'light-source-shadow': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rt-center"><b class="rt lshadow">光と影</b><i class="rt-bulb"></i></div>'
      const t = el.querySelector('.lshadow'), bulb = el.querySelector('.rt-bulb')
      return pointer(el, (x, y) => {
        bulb.style.transform = `translate(${x}px, ${y}px)`
        const r = el.getBoundingClientRect(), b = t.getBoundingClientRect()
        const dx = (b.left - r.left + b.width / 2 - x) / el.clientWidth, dy = (b.top - r.top + b.height / 2 - y) / el.clientHeight
        const sh = []
        for (let i = 1; i <= 12; i++) sh.push(`${(dx * i * 2.4).toFixed(1)}px ${(dy * i * 2.4).toFixed(1)}px 0 rgba(0,0,0,${(0.18 - i * 0.012).toFixed(3)})`)
        t.style.textShadow = sh.join(',')
      })
    },
  },

  'image-filled-text': css('imgfill', 'SUNSET'),
  'blur-in-letters': css('blurin', 'ぼかしから'),

  'strike-rewrite': {
    bg: 'light',
    run(el) { el.innerHTML = '<div class="rt-center"><p class="rt strike">設計就是<span class="old">讓它好看</span><span class="new">讓它好用</span></p></div>' },
  },

  'chat-message-pop': {
    bg: 'light',
    run(el) {
      const msgs = [['l', '在嗎？'], ['r', '在～怎麼了'], ['l', '那個動畫好厲害'], ['r', '對吧 😎']]
      el.innerHTML = `<div class="rt-chat">${msgs.map(([s, t], i) => `<div class="${s}" style="--i:${i}">${t}</div>`).join('')}</div>`
    },
  },

  'echo-stack': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rt-center"><div class="rt echo">${[4, 3, 2, 1, 0].map((i) => `<b style="--i:${i}">ECHO</b>`).join('')}</div></div>` },
  },

  'multilingual-greeting': {
    bg: 'dark',
    run(el) {
      const ws = ['Hello', '你好', 'こんにちは', 'Bonjour', '안녕하세요', 'Hola']
      el.innerHTML = '<div class="rt-center"><div class="rt greet"><b></b></div></div>'
      const b = el.querySelector('.greet b')
      return every(1300, (n) => { b.textContent = ws[n % ws.length]; replay(b, 'go') })
    },
  },

  'gravity-tag-pile': {
    bg: 'light',
    run(el) {
      const tags = ['UI', 'Motion', 'CSS', '設計', 'GSAP', 'Canvas', 'SVG', '動畫', 'React', 'Figma', '互動', '網頁']
      // shortcut: 預先排好落點，不做真的碰撞；要真物理可換 Matter.js
      const rows = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
      el.innerHTML = `<div class="rt-pile">${rows.flatMap((row, ri) => row.map((t, ci) => `<span style="--x:${8 + ci * 22 + (ri % 2) * 6}%;--y:${ri};--r:${((t * 37) % 30) - 15}deg;--i:${t}">${tags[t]}</span>`)).join('')}</div>`
    },
  },
}
