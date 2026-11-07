// 卡片 35 + 圖片 17。「圖片」都是用漸層畫的風景，hue 由 --h 決定
import './cards.css'
import { every, frames, replay, bag, pointer } from '../utils.js'

const center = (html, cls = '') => `<div class="rd-center ${cls}">${html}</div>`
const pic = (h, cls = '') => `<i class="rd-pic ${cls}" style="--h:${h}"></i>`
const toggleEvery = (node, cls, ms) => every(ms, (n) => node.classList.toggle(cls, n % 2 === 1))
const cards = (n, inner = (i) => `<b>${i + 1}</b>`) => Array.from({ length: n }, (_, i) => `<div class="rd-card" style="--i:${i};--h:${i * 47}">${inner(i)}</div>`).join('')
// 依目前位置與新位置做 FLIP
function flip(nodes, change) {
  const first = nodes.map((n) => n.getBoundingClientRect())
  change()
  nodes.forEach((n, i) => {
    const last = n.getBoundingClientRect()
    n.animate([{ transform: `translate(${first[i].left - last.left}px, ${first[i].top - last.top}px) scale(${first[i].width / last.width}, ${first[i].height / last.height})` }, { transform: 'none' }], { duration: 550, easing: 'cubic-bezier(.4,0,.2,1)' })
  })
}

export default {
  // ── 卡片 ───────────────────────────────
  'flip-layout': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-flip">${cards(4)}</div>`
      const box = el.firstChild, nodes = [...box.children]
      return every(1800, (n) => n && flip(nodes, () => box.classList.toggle('list')))
    },
  },

  'drag-toss': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rd-card rd-toss" style="--h:200"><b>拖我</b></div>'
      const c = el.firstChild
      let x = 40, y = 30, vx = 4.2, vy = 3.1, drag = null
      c.addEventListener('pointerdown', (e) => { drag = [e.clientX - x, e.clientY - y, e.clientX, e.clientY]; c.setPointerCapture(e.pointerId) })
      c.addEventListener('pointermove', (e) => {
        if (!drag) return
        vx = e.clientX - drag[2]; vy = e.clientY - drag[3]
        drag[2] = e.clientX; drag[3] = e.clientY
        x = e.clientX - drag[0]; y = e.clientY - drag[1]
      })
      c.addEventListener('pointerup', () => (drag = null))
      return frames(() => {
        const W = el.clientWidth - c.offsetWidth, H = el.clientHeight - c.offsetHeight
        if (!drag) {
          x += vx; y += vy
          if (x < 0 || x > W) { vx *= -0.9; x = Math.max(0, Math.min(W, x)) }
          if (y < 0 || y > H) { vy *= -0.9; y = Math.max(0, Math.min(H, y)) }
          if (Math.hypot(vx, vy) < 1.5) { vx *= 3; vy *= 3 } // 示範用：快停時再甩一次
          vx *= 0.995; vy *= 0.995
        }
        c.style.transform = `translate(${x}px, ${y}px) rotate(${vx * 2}deg)`
      })
    },
  },

  'card-deal': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rd-deal">${cards(5)}</div>` },
  },

  'staggered-card-reveal': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rd-row rd-stagger">${cards(5)}</div>` },
  },

  'hover-lift-card': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="rd-card rd-lift" style="--h:160"><i class="rd-pic" style="--h:160"></i><b>山中小屋</b></div>')
      return toggleEvery(el.querySelector('.rd-lift'), 'on', 1300)
    },
  },

  'spotlight-card': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="rd-spot"><b>Pro 方案</b><small>所有功能無限使用</small></div>')
      const card = el.querySelector('.rd-spot')
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect(), b = card.getBoundingClientRect()
        card.style.setProperty('--x', `${x - (b.left - r.left)}px`)
        card.style.setProperty('--y', `${y - (b.top - r.top)}px`)
      })
    },
  },

  'toast-stack': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rd-toasts"></div>'
      const box = el.firstChild
      const msgs = ['檔案已上傳', '有新留言', '同步完成', '已加入收藏']
      return every(1200, (n) => {
        const t = document.createElement('div')
        t.className = 'rd-toast'
        t.textContent = msgs[n % msgs.length]
        box.append(t)
        const all = [...box.children]
        if (all.length > 4) all[0].remove()
        ;[...box.children].reverse().forEach((c, i) => c.style.setProperty('--k', i))
      })
    },
  },

  'connected-steps': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-steps">${[1, 2, 3, 4].map((n, i) => `${i ? '<i class="line"></i>' : ''}<b>${n}</b>`).join('')}</div>`)
      const parts = [...el.querySelector('.rd-steps').children]
      return every(450, (n) => parts.forEach((p, i) => p.classList.toggle('on', i <= n % (parts.length + 3))))
    },
  },

  'zigzag-cascade': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rd-zig">${cards(4, (i) => `<b>0${i + 1}</b><span>段落標題</span>`)}</div>` },
  },

  'swipe-to-delete': {
    bg: 'light',
    run(el) {
      el.innerHTML = `<div class="rd-swipe">${['買牛奶', '回覆信件', '繳電話費'].map((t) => `<div class="row"><span class="del">刪除</span><div class="fg">${t}</div></div>`).join('')}</div>`
      const rows = [...el.querySelectorAll('.row')]
      return every(1000, (n) => {
        const k = n % 6
        rows.forEach((r) => r.classList.remove('slid', 'gone'))
        if (k >= 1 && k <= 2) rows[1].classList.add('slid')
        if (k >= 3 && k <= 4) rows[1].classList.add('slid', 'gone')
      })
    },
  },

  'flip-card': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="rd-flipcard"><div class="in"><div class="f"><i class="rd-pic" style="--h:20"></i><b>夕陽海岸</b></div><div class="b"><b>夕陽海岸</b><small>最佳時段：17:30<br>步行 20 分鐘</small></div></div></div>')
      return toggleEvery(el.querySelector('.rd-flipcard'), 'on', 1600)
    },
  },

  'scratch-reveal': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rd-scratch"><b>🎉 再來一張</b><canvas></canvas></div>'
      const box = el.firstChild, cv = box.lastChild, ctx = cv.getContext('2d')
      const reset = () => {
        cv.width = box.clientWidth; cv.height = box.clientHeight
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#9a9aa2'; ctx.fillRect(0, 0, cv.width, cv.height)
        ctx.fillStyle = '#b4b4bc'; ctx.font = `700 ${cv.height / 6}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText('刮開這裡', cv.width / 2, cv.height / 2 + cv.height / 18)
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = cv.height / 4; ctx.lineCap = 'round'
      }
      reset()
      let prev = null, n = 0
      return pointer(el, (x, y) => {
        const b = box.getBoundingClientRect(), r = el.getBoundingClientRect()
        const p = [x - (b.left - r.left), y - (b.top - r.top)]
        if (prev) { ctx.beginPath(); ctx.moveTo(...prev); ctx.lineTo(...p); ctx.stroke() }
        prev = p
        if (++n % 420 === 0) reset()
      })
    },
  },

  scrapbook: {
    bg: 'light',
    run(el) {
      const items = [[24, 20, -8, 'p', 30], [50, 38, 5, 'n', 0], [72, 22, -3, 'p', 190], [36, 62, 4, 'n', 0], [64, 66, -6, 'p', 280]]
      el.innerHTML = `<div class="rd-scrap">${items.map(([x, y, r, k, h], i) => `<div class="${k}" style="left:${x}%;top:${y}%;--r:${r}deg;--i:${i};--h:${h}">${k === 'n' ? '今天好天氣 ☀︎' : ''}<i class="tape"></i></div>`).join('')}</div>`
    },
  },

  'focus-carousel': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-focus">${cards(7, (i) => pic(i * 50))}</div>`
      const nodes = [...el.firstChild.children]
      return every(1400, (n) => nodes.forEach((c, i) => c.style.setProperty('--d', i - 1 - (n % 5))))
    },
  },

  'swipe-card-stack': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="rd-tinder"></div>')
      const box = el.querySelector('.rd-tinder')
      let k = 0
      const add = () => {
        const c = document.createElement('div')
        c.className = 'rd-card'
        c.innerHTML = pic((k++ * 70) % 360)
        box.prepend(c)
      }
      add(); add(); add()
      return every(1500, (n) => {
        if (!n) return
        const top = box.lastElementChild
        top.classList.add(n % 2 ? 'out-r' : 'out-l')
        setTimeout(() => top.remove(), 500)
        add()
      })
    },
  },

  'stack-fan-out': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-fan">${cards(5, (i) => pic(i * 60))}</div>`)
      return toggleEvery(el.querySelector('.rd-fan'), 'on', 1500)
    },
  },

  'pricing-toggle': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="rd-price"><div class="sw"><span>月繳</span><i></i><span>年繳</span><em>省 20%</em></div><div class="num">$<span><b>390</b><b>312</b></span><small>/ 月</small></div></div>')
      return toggleEvery(el.querySelector('.rd-price'), 'yearly', 1600)
    },
  },

  'card-expand-detail': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-expand"><div class="rd-card" style="--h:140">${pic(140)}<b>北海道 5 日</b><p>小樽運河、洞爺湖、美瑛花田，搭配溫泉旅館兩晚。</p></div></div>`
      const box = el.firstChild, card = box.firstChild
      return every(1800, (n) => n && flip([card], () => box.classList.toggle('open')))
    },
  },

  'infinite-card-wall': {
    bg: 'dark',
    run(el) {
      const col = (k) => {
        const set = Array.from({ length: 4 }, (_, i) => pic((k * 80 + i * 40) % 360, `h${(i + k) % 3}`)).join('')
        return `<div class="col" style="--d:${k % 2 ? 'reverse' : 'normal'};--s:${9 + k}s"><div>${set}${set}</div></div>`
      }
      el.innerHTML = `<div class="rd-wall">${[0, 1, 2, 3].map(col).join('')}</div>`
    },
  },

  'testimonial-slider': {
    bg: 'light',
    run(el) {
      const qs = [['真的省下好多時間！', '— 設計師 Amy'], ['團隊終於有共同語言了', '— PM Ken'], ['動畫品質一次到位', '— 工程師 Leo']]
      el.innerHTML = `<div class="rd-quotes"><div class="track">${qs.map(([q, a]) => `<div class="q"><b>“${q}”</b><small>${a}</small></div>`).join('')}</div><div class="dots">${qs.map(() => '<i></i>').join('')}</div></div>`
      const track = el.querySelector('.track'), dots = [...el.querySelectorAll('.dots i')]
      return every(2200, (n) => {
        const k = n % qs.length
        track.style.transform = `translateX(${-k * 100}%)`
        dots.forEach((d, i) => d.classList.toggle('on', i === k))
      })
    },
  },

  'masonry-cascade': {
    bg: 'dark',
    run(el) {
      const hs = [40, 24, 32, 28, 44, 20, 30, 36, 26]
      el.innerHTML = `<div class="rd-masonry">${hs.map((h, i) => `<i class="rd-pic" style="--h:${i * 40};height:${h}cqh;--i:${i}"></i>`).join('')}</div>`
    },
  },

  'focus-dim-siblings': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-dim">${cards(6, (i) => pic(i * 55))}</div>`
      const box = el.firstChild, nodes = [...box.children]
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect()
        nodes.forEach((c) => {
          const b = c.getBoundingClientRect()
          c.classList.toggle('on', x >= b.left - r.left && x <= b.right - r.left && y >= b.top - r.top && y <= b.bottom - r.top)
        })
        box.classList.toggle('has', nodes.some((c) => c.classList.contains('on')))
      })
    },
  },

  'add-to-cart-fly': {
    bg: 'light',
    run(el) {
      el.innerHTML = `<div class="rd-shop"><div class="item">${pic(30)}<button>加入購物車</button></div><div class="cart">🛒<em>0</em></div><i class="fly">${pic(30)}</i></div>`
      const fly = el.querySelector('.fly'), badge = el.querySelector('em'), btn = el.querySelector('button')
      let n = 0
      const go = () => {
        replay(fly, 'go')
        setTimeout(() => { badge.textContent = ++n % 10; replay(badge, 'pop') }, 750)
      }
      btn.addEventListener('click', go)
      return every(2200, go)
    },
  },

  'card-info-slide-up': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-info">${pic(250)}<div class="panel"><b>極光之旅</b><small>冰島 · 7 天 6 夜</small><button>查看行程</button></div></div>`)
      return toggleEvery(el.querySelector('.rd-info'), 'on', 1500)
    },
  },

  'drag-to-reorder': {
    bg: 'light',
    run(el) {
      const names = ['設計稿', '切版', '測試', '上線']
      el.innerHTML = `<div class="rd-reorder">${names.map((t, i) => `<div style="--y:${i}">☰ ${t}</div>`).join('')}</div>`
      const rows = [...el.firstChild.children]
      let order = [0, 1, 2, 3]
      return every(1100, (n) => {
        const a = n % 3
        rows.forEach((r) => r.classList.remove('lift'))
        rows[order[a]].classList.add('lift')
        ;[order[a], order[a + 1]] = [order[a + 1], order[a]]
        order.forEach((ri, pos) => rows[ri].style.setProperty('--y', pos))
      })
    },
  },

  'selectable-cards': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-select">${['基本', '進階', '專業'].map((t) => `<button><b>${t}</b><i>✓</i></button>`).join('')}</div>`)
      const btns = [...el.querySelectorAll('button')]
      btns.forEach((b) => b.addEventListener('click', () => b.classList.toggle('on')))
      return every(800, (n) => btns.forEach((b, i) => b.classList.toggle('on', [[0], [0, 1], [1], [1, 2], [2], []][n % 6].includes(i))))
    },
  },

  'border-spotlight-grid': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-bgrid">${'<div></div>'.repeat(6)}</div>`
      const grid = el.firstChild, nodes = [...grid.children]
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect()
        nodes.forEach((c) => {
          const b = c.getBoundingClientRect()
          c.style.setProperty('--x', `${x - (b.left - r.left)}px`)
          c.style.setProperty('--y', `${y - (b.top - r.top)}px`)
        })
      })
    },
  },

  '3d-ring-carousel': {
    bg: 'dark',
    run(el) {
      const n = 8
      el.innerHTML = center(`<div class="rd-ring">${Array.from({ length: n }, (_, i) => `<div style="--a:${(i * 360) / n}deg">${pic(i * 45)}</div>`).join('')}</div>`)
    },
  },

  'memory-match': {
    bg: 'dark',
    run(el) {
      const faces = ['🍎', '🍋', '🍇', '🍎', '🍇', '🍋']
      el.innerHTML = center(`<div class="rd-memory">${faces.map((f) => `<div class="c"><i class="back"></i><i class="front">${f}</i></div>`).join('')}</div>`)
      const cs = [...el.querySelectorAll('.c')]
      const script = [[0, 1], [0, 3], [2, 5], [1, 4]]
      const b = bag()
      b.add(every(1600, (n) => {
        const step = n % (script.length + 1)
        if (step === script.length) return cs.forEach((c) => c.classList.remove('open', 'done'))
        const [p, q] = script[step]
        cs[p].classList.add('open'); cs[q].classList.add('open')
        if (faces[p] === faces[q]) cs[p].classList.add('done'), cs[q].classList.add('done')
        else b.timeout(() => { cs[p].classList.remove('open'); cs[q].classList.remove('open') }, 900)
      }))
      return b.clear
    },
  },

  'stat-cards': {
    bg: 'dark',
    run(el) {
      const stats = [['營收', 84200], ['訂單', 1290], ['新會員', 356]]
      el.innerHTML = center(`<div class="rd-stats">${stats.map(([t]) => `<div><small>${t}</small><b>0</b><span>${'<i></i>'.repeat(5)}</span></div>`).join('')}</div>`)
      const nums = [...el.querySelectorAll('.rd-stats b')], box = el.querySelector('.rd-stats')
      return frames((t) => {
        const k = Math.min(1, (t % 4000) / 1400)
        box.classList.toggle('on', t % 4000 < 3600)
        nums.forEach((nb, i) => (nb.textContent = Math.round(stats[i][1] * (1 - (1 - k) ** 3)).toLocaleString()))
      })
    },
  },

  'page-flip-book': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-book"><div class="left"></div>${[0, 1, 2].map((i) => `<div class="page" style="--i:${i}"><div class="f">${i + 1}</div><div class="b"></div></div>`).join('')}<div class="right">4</div></div>`)
      const pages = [...el.querySelectorAll('.page')]
      return every(900, (n) => {
        const k = n % 8
        pages.forEach((p, i) => p.classList.toggle('turned', k > i && k < 5 + (2 - i)))
      })
    },
  },

  'stack-to-grid': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-s2g">${Array.from({ length: 6 }, (_, i) => `<i class="rd-pic" style="--h:${i * 55};--i:${i};--r:${(i % 3 - 1) * 8}deg"></i>`).join('')}</div>`
      return toggleEvery(el.firstChild, 'grid', 1600)
    },
  },

  'folding-card': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="rd-fold"><div class="bottom"><b>12 / 24</b><small>晚上 7 點 · 老地方見</small></div><div class="top"><div class="f">You’re Invited</div><div class="b"></div></div></div>')
      return toggleEvery(el.querySelector('.rd-fold'), 'open', 1800)
    },
  },

  'lanyard-badge': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="rd-lanyard"><i class="strap"></i><div class="badge"><i class="clip"></i><b>VISITOR</b><small>UI-db Conf</small></div></div>'
      const sw = el.firstChild
      let a = 0.5, v = 0, drag = false
      sw.addEventListener('pointerdown', () => (drag = true))
      el.addEventListener('pointermove', (e) => { if (drag) { const r = el.getBoundingClientRect(); a = ((e.clientX - r.left) / r.width - 0.5) * 1.6; v = 0 } })
      el.addEventListener('pointerup', () => (drag = false))
      return frames((t) => {
        if (!drag) { v += -a * 0.012; v *= 0.985; a += v }
        if (!drag && Math.abs(a) < 0.02 && Math.abs(v) < 0.002) a = 0.6 // 停下就再推一次
        sw.style.transform = `rotate(${a * 40}deg)`
      })
    },
  },

  'sticker-peel': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="rd-sticker"><b>HELLO</b><i class="curl"></i></div>')
      return toggleEvery(el.querySelector('.rd-sticker'), 'on', 1400)
    },
  },

  // ── 圖片 ───────────────────────────────
  'tilt-parallax-image': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-tilt">${pic(200)}<i class="moon"></i><b>Night</b></div>`)
      const card = el.querySelector('.rd-tilt')
      return pointer(el, (x, y) => {
        const dx = x / el.clientWidth - 0.5, dy = y / el.clientHeight - 0.5
        card.style.transform = `rotateY(${dx * 30}deg) rotateX(${-dy * 24}deg)`
      })
    },
  },

  'image-clip-reveal': {
    bg: 'dark',
    run(el) { el.innerHTML = center(`<div class="rd-clipr">${pic(30)}<i class="wipe"></i></div>`) },
  },

  'soft-mask-reveal': {
    bg: 'dark',
    run(el) { el.innerHTML = center(`<div class="rd-soft">${pic(300)}</div>`) },
  },

  'circle-to-card-image': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-c2c">${pic(170)}</div>`)
      return toggleEvery(el.querySelector('.rd-c2c'), 'on', 1500)
    },
  },

  'expanding-panels': {
    bg: 'dark',
    run(el) {
      const names = ['森林', '海灣', '沙漠', '雪山', '城市']
      el.innerHTML = `<div class="rd-panels">${names.map((t, i) => `<div style="--h:${i * 65}">${pic(i * 65)}<b>${t}</b></div>`).join('')}</div>`
      const ps = [...el.firstChild.children]
      ps.forEach((p, i) => p.addEventListener('pointerenter', () => ps.forEach((q, j) => q.classList.toggle('on', i === j))))
      return every(1500, (n) => ps.forEach((p, i) => p.classList.toggle('on', i === n % ps.length)))
    },
  },

  pan: {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rd-pan">${pic(40, 'wide')}</div>` },
  },

  'hover-zoom-in-frame': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(`<div class="rd-frame">${pic(110)}</div>`)
      return toggleEvery(el.querySelector('.rd-frame'), 'on', 1400)
    },
  },

  'hover-zoom-pan': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(`<div class="rd-frame zp">${pic(330)}</div>`)
      const frame = el.querySelector('.rd-frame'), img = frame.firstChild
      return pointer(el, (x, y) => {
        const r = el.getBoundingClientRect(), b = frame.getBoundingClientRect()
        const px = Math.max(0, Math.min(1, (x - (b.left - r.left)) / b.width)), py = Math.max(0, Math.min(1, (y - (b.top - r.top)) / b.height))
        img.style.transformOrigin = `${px * 100}% ${py * 100}%`
      })
    },
  },

  'saturate-on-hover': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-sat">${[20, 140, 260].map((h) => pic(h)).join('')}</div>`
      const ps = [...el.firstChild.children]
      return every(900, (n) => ps.forEach((p, i) => p.classList.toggle('on', i === n % 4)))
    },
  },

  'image-swap-on-hover': {
    bg: 'light',
    run(el) {
      el.innerHTML = center('<div class="rd-swap"><i class="shoe a"></i><i class="shoe b"></i></div>')
      return toggleEvery(el.querySelector('.rd-swap'), 'on', 1400)
    },
  },

  'hover-to-play-video': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<div class="rd-video"><div class="frame"><i class="sun"></i><i class="hill"></i></div><span class="play">▶</span><i class="bar"></i></div>')
      return toggleEvery(el.querySelector('.rd-video'), 'on', 2400)
    },
  },

  'lightbox-zoom': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rd-light">${[0, 1, 2, 3].map((i) => pic(i * 80)).join('')}<i class="shade"></i></div>`
      const box = el.firstChild, thumbs = [...box.querySelectorAll('.rd-pic')]
      return every(1500, (n) => {
        const k = Math.floor(n / 2) % 4
        flip([thumbs[k]], () => {
          thumbs.forEach((t, i) => t.classList.toggle('big', n % 2 === 1 && i === k))
          box.classList.toggle('open', n % 2 === 1)
        })
      })
    },
  },

  'thumbnail-gallery': {
    bg: 'dark',
    run(el) {
      const hs = [15, 120, 220, 300]
      el.innerHTML = `<div class="rd-gallery"><div class="main">${hs.map((h) => pic(h)).join('')}</div><div class="thumbs">${hs.map((h) => pic(h)).join('')}<i class="ind"></i></div></div>`
      const mains = [...el.querySelectorAll('.main .rd-pic')], ind = el.querySelector('.ind')
      return every(1300, (n) => {
        const k = n % hs.length
        mains.forEach((m, i) => m.classList.toggle('on', i === k))
        ind.style.setProperty('--k', k)
      })
    },
  },

  'slice-transition': {
    bg: 'dark',
    run(el) {
      const N = 6
      el.innerHTML = `<div class="rd-slices"><div class="under"></div><div class="over">${Array.from({ length: N }, (_, i) => `<i style="--i:${i};--n:${N}"></i>`).join('')}</div></div>`
      const under = el.querySelector('.under'), over = el.querySelector('.over')
      let h = 0
      return every(2000, () => {
        under.style.setProperty('--h', h)
        h = (h + 90) % 360
        over.style.setProperty('--h', h)
        replay(over, 'go')
      })
    },
  },

  'photo-stack-shuffle': {
    bg: 'light',
    run(el) {
      el.innerHTML = center(`<div class="rd-polar">${[0, 1, 2, 3].map((i) => `<div class="p" style="--h:${i * 80}">${pic(i * 80)}</div>`).join('')}</div>`)
      const ps = [...el.querySelectorAll('.p')]
      let order = [0, 1, 2, 3]
      const lay = () => order.forEach((pi, k) => { ps[pi].style.setProperty('--k', k); ps[pi].style.zIndex = 10 - k })
      lay()
      return every(1400, (n) => {
        if (!n) return
        const top = ps[order[0]]
        replay(top, 'out')
        setTimeout(() => { order = [...order.slice(1), order[0]]; lay() }, 350)
      })
    },
  },

  'glitch-image': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rd-glitch">${pic(260)}${pic(260, 'r')}${pic(260, 'c')}</div>`)
      const [, r, c] = el.querySelectorAll('.rd-pic')
      return every(90, (n) => {
        const on = n % 20 < 6
        const cut = () => { const a = Math.random() * 80; return `inset(${a}% 0 ${Math.max(0, 90 - a - Math.random() * 30)}% 0)` }
        r.style.cssText = on ? `transform:translateX(${(Math.random() - 0.5) * 14}px);clip-path:${cut()}` : ''
        c.style.cssText = on ? `transform:translateX(${(Math.random() - 0.5) * 14}px);clip-path:${cut()}` : ''
      })
    },
  },

  'crumpled-paper-reveal': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<svg width="0" height="0" style="position:absolute"><filter id="rdCrumple"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4"/><feDisplacementMap in="SourceGraphic" scale="0"><animate attributeName="scale" values="60;60;0;0;60" keyTimes="0;.1;.55;.9;1" dur="4s" repeatCount="indefinite"/></feDisplacementMap></filter></svg><div class="rd-paper"><b>給未來的我</b><small>記得保持好奇心。</small></div>`)
    },
  },
}
