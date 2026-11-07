// 游標 16 招：沒有滑鼠時用假游標示範，滑鼠移入卡片就換成真的
import './cursor.css'
import { every, bag, pointer } from '../utils.js'

const at = (n, x, y, extra = '') => (n.style.transform = `translate(${x}px, ${y}px) ${extra}`)
const lerp = (a, b, k) => a + (b - a) * k

// 每 1.2 秒「點」一下（真的點擊也算），回傳 cleanup
function clicks(el, fn) {
  let last = [0, 0]
  const b = bag()
  b.add(pointer(el, (x, y) => (last = [x, y])))
  const down = (e) => {
    const r = el.getBoundingClientRect()
    fn(e.clientX - r.left, e.clientY - r.top)
  }
  el.addEventListener('pointerdown', down)
  b.add(every(1200, (n) => n && fn(...last)))
  b.add(() => el.removeEventListener('pointerdown', down))
  return b.clear
}

const spawn = (el, cls, x, y, style = '') => {
  const n = document.createElement('i')
  n.className = cls
  n.style.cssText = `left:${x}px;top:${y}px;${style}`
  n.addEventListener('animationend', () => n.remove())
  el.append(n)
}

export default {
  'cursor-follower': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rc-hint">移動游標</div><i class="rc-ring"></i><i class="rc-dot"></i>'
      const [ring, dot] = [el.querySelector('.rc-ring'), el.querySelector('.rc-dot')]
      let rx = 0, ry = 0
      return pointer(el, (x, y) => {
        rx = lerp(rx, x, 0.15)
        ry = lerp(ry, y, 0.15)
        at(dot, x, y)
        at(ring, rx, ry)
      })
    },
  },

  'hover-expand-cursor': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rc-links"><a>作品</a><a>關於</a><a>聯絡</a></div><i class="rc-ring big"></i>'
      const ring = el.querySelector('.rc-ring')
      const links = [...el.querySelectorAll('a')]
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect()
        const hit = links.some((a) => {
          const b = a.getBoundingClientRect()
          return x >= b.left - r.left && x <= b.right - r.left && y >= b.top - r.top && y <= b.bottom - r.top
        })
        at(ring, x, y, `scale(${hit ? 3 : 1})`)
        ring.classList.toggle('on', hit)
      })
    },
  },

  'hover-image-reveal': {
    bg: 'dark',
    run(el) {
      const rows = [['山', 30], ['海', 200], ['城市', 280], ['森林', 120]]
      el.innerHTML = `<div class="rc-list">${rows.map(([t]) => `<div>${t}</div>`).join('')}</div><i class="rc-photo"></i>`
      const list = [...el.querySelectorAll('.rc-list div')]
      const photo = el.querySelector('.rc-photo')
      let px = 0
      return pointer(el, (x, y) => {
        const k = Math.min(rows.length - 1, Math.max(0, Math.floor((y / el.clientHeight) * rows.length)))
        list.forEach((d, i) => d.classList.toggle('on', i === k))
        px = lerp(px, x, 0.2)
        photo.style.setProperty('--h', rows[k][1])
        at(photo, px, y, `rotate(${(x - px) * 0.1}deg)`)
      })
    },
  },

  'cursor-trail': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<canvas class="rc-canvas"></canvas>'
      const cv = el.firstChild
      const ctx = cv.getContext('2d')
      const pts = []
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      return pointer(el, (x, y) => {
        const w = el.clientWidth, h = el.clientHeight
        if (cv.width !== w) { cv.width = w; cv.height = h }
        pts.push([x, y])
        if (pts.length > 30) pts.shift()
        ctx.clearRect(0, 0, w, h)
        pts.forEach(([px, py], i) => {
          ctx.globalAlpha = i / pts.length
          ctx.fillStyle = accent
          ctx.beginPath()
          ctx.arc(px, py, 2 + (i / pts.length) * 8, 0, Math.PI * 2)
          ctx.fill()
        })
      })
    },
  },

  'click-ripple': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rc-hint">點任何地方</div>'
      return clicks(el, (x, y) => spawn(el, 'rc-ripple', x, y))
    },
  },

  'rotating-text-cursor': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<svg class="rc-textring" viewBox="0 0 100 100"><path id="rcRing" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0"/><text><textPath href="#rcRing">VIEW PROJECT • VIEW PROJECT • </textPath></text></svg><i class="rc-dot"></i>`
      const [ring, dot] = [el.querySelector('svg'), el.querySelector('.rc-dot')]
      let rx = 0, ry = 0
      return pointer(el, (x, y, t) => {
        rx = lerp(rx, x, 0.18)
        ry = lerp(ry, y, 0.18)
        at(dot, x, y)
        at(ring, rx, ry, `rotate(${t / 20}deg)`)
      })
    },
  },

  'flashlight-reveal': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rc-secret">藏在黑暗裡的<b>秘密訊息</b></div><div class="rc-dark"></div>'
      const dark = el.querySelector('.rc-dark')
      return pointer(el, (x, y) => dark.style.setProperty('--p', `${x}px ${y}px`))
    },
  },

  'blend-difference-cursor': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rc-blend-text">DIFFERENCE</div><i class="rc-blend"></i>'
      const c = el.querySelector('.rc-blend')
      let rx = 0, ry = 0
      return pointer(el, (x, y) => {
        rx = lerp(rx, x, 0.15)
        ry = lerp(ry, y, 0.15)
        at(c, rx, ry)
      })
    },
  },

  'sticky-cursor': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rc-center"><button class="rc-btn">Menu</button></div><i class="rc-sticky"></i>'
      const btn = el.querySelector('.rc-btn')
      const c = el.querySelector('.rc-sticky')
      let s = { x: 0, y: 0, w: 16, h: 16 }
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect(), b = btn.getBoundingClientRect()
        const cx = b.left - r.left + b.width / 2, cy = b.top - r.top + b.height / 2
        const near = Math.hypot(x - cx, y - cy) < b.width * 0.9
        const goal = near ? { x: cx + (x - cx) * 0.15, y: cy + (y - cy) * 0.15, w: b.width + 12, h: b.height + 12 } : { x, y, w: 16, h: 16 }
        for (const k in s) s[k] = lerp(s[k], goal[k], 0.2)
        c.style.cssText = `width:${s.w}px;height:${s.h}px;transform:translate(${s.x - s.w / 2}px, ${s.y - s.h / 2}px)`
        c.classList.toggle('on', near)
      })
    },
  },

  'velocity-stretch-cursor': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<i class="rc-blob"></i>'
      const c = el.firstChild
      let px = 0, py = 0
      return pointer(el, (x, y) => {
        const vx = x - px, vy = y - py
        const v = Math.min(Math.hypot(vx, vy) / 12, 1.4)
        px = x
        py = y
        at(c, x, y, `rotate(${Math.atan2(vy, vx)}rad) scale(${1 + v}, ${1 - v * 0.4})`)
      })
    },
  },

  'contextual-cursor': {
    bg: 'dark',
    run(el) {
      const zones = [['影片', '播放'], ['相簿', '拖曳'], ['文章', '閱讀']]
      el.innerHTML = `<div class="rc-zones">${zones.map(([t]) => `<div>${t}</div>`).join('')}</div><i class="rc-label"></i>`
      const c = el.querySelector('.rc-label')
      let rx = 0, ry = 0
      return pointer(el, (x, y) => {
        const k = Math.min(2, Math.max(0, Math.floor((x / el.clientWidth) * 3)))
        rx = lerp(rx, x, 0.2)
        ry = lerp(ry, y, 0.2)
        if (c.textContent !== zones[k][1]) c.textContent = zones[k][1]
        at(c, rx, ry)
      })
    },
  },

  'crosshair-cursor': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<i class="rc-hline"></i><i class="rc-vline"></i><small class="rc-xy"></small>'
      const [hl, vl, xy] = [el.querySelector('.rc-hline'), el.querySelector('.rc-vline'), el.querySelector('.rc-xy')]
      return pointer(el, (x, y) => {
        hl.style.transform = `translateY(${y}px)`
        vl.style.transform = `translateX(${x}px)`
        at(xy, x + 10, y + 10)
        xy.textContent = `X ${Math.round(x)}  Y ${Math.round(y)}`
      })
    },
  },

  'following-eyes': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rc-center rc-eyes"><span><i></i></span><span><i></i></span></div>'
      const eyes = [...el.querySelectorAll('.rc-eyes span')]
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect()
        eyes.forEach((e) => {
          const b = e.getBoundingClientRect()
          const a = Math.atan2(y - (b.top - r.top + b.height / 2), x - (b.left - r.left + b.width / 2))
          const d = b.width * 0.22
          e.firstChild.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`
        })
      })
    },
  },

  'magnifier-lens': {
    bg: 'light',
    run(el) {
      const lines = ['微小的細節藏在每個像素裡', 'Tiny details · 0.5px · kerning', '把放大鏡移過來看看', 'Look closer · 字距 0.02em', '細節決定質感 · Pixel perfect']
      const art = `<div class="rc-fine">${lines.map((t) => `<span>${t}</span>`).join('')}</div>`
      el.innerHTML = `${art}<div class="rc-lens"><div class="rc-lens-in">${art}</div></div>`
      const lens = el.querySelector('.rc-lens')
      const inner = el.querySelector('.rc-lens-in')
      const k = 2.2
      return pointer(el, (x, y) => {
        const r = lens.offsetWidth / 2
        at(lens, x - r, y - r)
        inner.style.cssText = `width:${el.clientWidth}px;height:${el.clientHeight}px;transform:translate(${r - x * k}px, ${r - y * k}px) scale(${k})`
      })
    },
  },

  'gooey-trail': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rc-goo">${'<i></i>'.repeat(10)}</div>`
      const dots = [...el.querySelectorAll('.rc-goo i')].map((n) => ({ n, x: 0, y: 0 }))
      return pointer(el, (x, y) => {
        dots.forEach((d, i) => {
          const lead = i ? dots[i - 1] : { x, y }
          d.x = lerp(d.x, lead.x, 0.22)
          d.y = lerp(d.y, lead.y, 0.22)
          at(d.n, d.x, d.y, `scale(${1 - i * 0.07})`)
        })
      })
    },
  },

  'click-confetti-pop': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rc-hint">點一下</div>'
      const colors = ['#dcf244', '#ff8fa3', '#9be7ff', '#ffb454']
      return clicks(el, (x, y) => {
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + Math.random() * 0.4
          const d = 30 + Math.random() * 30
          spawn(el, `rc-bit ${i % 2 ? 'sq' : ''}`, x, y, `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;background:${colors[i % 4]}`)
        }
      })
    },
  },
}
