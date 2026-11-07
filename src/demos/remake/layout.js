// 版面 25 + 捲動 28。捲動類沿用 scroll/ 的自動捲動小頁面
import './layout.css'
import { every, frames, replay, bag, pointer } from '../utils.js'
import { page, autoScroll, reveal, onScroll } from '../scroll/index.js'

const center = (html) => `<div class="rl-center">${html}</div>`
const toggleEvery = (node, cls, ms) => every(ms, (n) => node.classList.toggle(cls, n % 2 === 1))
const hero = (t = 'Scroll ↓') => `<div class="sc-hero">${t}</div>`
const clamp = (v) => Math.min(1, Math.max(0, v))
// 依 FLIP 移動
function flip(nodes, change) {
  const first = nodes.map((n) => n.getBoundingClientRect())
  change()
  nodes.forEach((n, i) => {
    const last = n.getBoundingClientRect()
    if (!last.width) return
    n.animate([{ transform: `translate(${first[i].left - last.left}px, ${first[i].top - last.top}px)` }, { transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)' })
  })
}

// 捲動連動：一段 sticky 區塊，fn(p, view, s) 依進度更新
const pinned = (inner, fn, height = 300) => (el) => {
  const view = page(el, `<div class="rl-pin" style="height:${height}cqh"><div class="rl-sticky">${inner}</div></div>`)
  view.querySelector('.sc-page').classList.add('rl-flat')
  onScroll(view, (p, s) => fn(p, view, s))
  return autoScroll(view, false)
}
// 捲動頁：自訂內容，fn(p, view, s)
const scrolled = (html, fn, fixed = '') => (el) => {
  const view = page(el, html, fixed)
  if (fn) onScroll(view, (p, s) => fn(p, view, s, el))
  return autoScroll(view, false)
}
const triggered = (html, onIn) => (el) => {
  const view = page(el, html)
  const b = bag()
  b.add(autoScroll(view, true))
  b.add(reveal(view, onIn))
  return b.clear
}
const blocks = (n, cls = 'rl-block') => Array.from({ length: n }, (_, i) => `<div class="${cls}" style="--i:${i};--h:${i * 60}">0${i + 1}</div>`).join('')

export default {
  // ── 版面 ───────────────────────────────
  'gentle-fade-up': {
    bg: 'light',
    run(el) { el.innerHTML = center('<div class="rl-gentle"><small>NEW</small><b>讓動態更自然</b><p>不搶戲，只是剛好。</p><button>開始使用</button></div>') },
  },

  'timeline-draw': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="rl-tl"><i class="line"></i>${['構想', '設計', '開發', '上線'].map((t, i) => `<div style="--i:${i}"><b></b><span>${t}</span></div>`).join('')}</div>` },
  },

  'z-pattern-reveal': {
    bg: 'light',
    run(el) { el.innerHTML = '<div class="rl-z"><b class="logo" style="--i:0">LOGO</b><nav style="--i:1"><i></i><i></i><i></i></nav><i class="img" style="--i:2"></i><button style="--i:3">立即加入</button></div>' },
  },

  'pull-to-refresh': {
    bg: 'light',
    run(el) { el.innerHTML = `<div class="rl-phone"><i class="spin"></i><div class="list">${['早安～', '今天開會', '晚餐吃什麼', '週末計畫'].map((t) => `<div>${t}</div>`).join('')}</div></div>` },
  },

  'bottom-sheet': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rl-phone sheet-demo"><div class="list"><div></div><div></div><div></div></div><i class="shade"></i><div class="sheet"><i class="handle"></i><b>分享到…</b><div class="apps"><i></i><i></i><i></i><i></i></div></div></div>'
      return toggleEvery(el.querySelector('.rl-phone'), 'on', 1700)
    },
  },

  'tab-bar-indicator': {
    bg: 'dark',
    run(el) {
      const tabs = [['⌂', '首頁'], ['⌕', '搜尋'], ['♡', '收藏'], ['☺', '我的']]
      el.innerHTML = center(`<div class="rl-tabbar"><i class="pill"></i>${tabs.map(([i, t]) => `<button><span>${i}</span><em>${t}</em></button>`).join('')}</div>`)
      const bar = el.querySelector('.rl-tabbar'), btns = [...bar.querySelectorAll('button')]
      const set = (k) => { bar.style.setProperty('--k', k); btns.forEach((b, i) => b.classList.toggle('on', i === k)) }
      btns.forEach((b, i) => b.addEventListener('click', () => set(i)))
      return every(1200, (n) => set(n % 4))
    },
  },

  'splash-to-home': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="rl-phone dark"><div class="home"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i></div><div class="splash"><b>UI</b></div></div>' },
  },

  'sliding-nav-highlight': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center('<nav class="rl-nav"><i class="hl"></i><a>首頁</a><a>作品集</a><a>關於我們</a><a>聯絡</a></nav>')
      const nav = el.querySelector('nav'), hl = nav.firstChild, links = [...nav.querySelectorAll('a')]
      return pointer(el, (x) => {
        const r = el.getBoundingClientRect(), nb = nav.getBoundingClientRect()
        const k = links.findIndex((a) => { const b = a.getBoundingClientRect(); return x >= b.left - r.left && x <= b.right - r.left })
        const a = links[k < 0 ? 0 : k]
        const b = a.getBoundingClientRect()
        hl.style.cssText = `left:${b.left - nb.left}px;width:${b.width}px`
        links.forEach((l) => l.classList.toggle('on', l === a))
      })
    },
  },

  'curtain-page-transition': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rl-curtain"><div class="pg">Page 1</div><div class="bars">${[0, 1, 2, 3, 4].map((i) => `<i style="--i:${i}"></i>`).join('')}</div></div>`
      const box = el.firstChild, pg = box.firstChild
      const b = bag()
      b.add(every(2600, (n) => {
        replay(box, 'go')
        b.timeout(() => { pg.textContent = `Page ${(n % 3) + 2}`; pg.style.setProperty('--h', n * 90) }, 700)
      }))
      return b.clear
    },
  },

  'hamburger-menu-reveal': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rl-burger"><button aria-label="選單"><i></i><i></i><i></i></button><ul>${['首頁', '作品', '部落格', '聯絡'].map((t, i) => `<li style="--i:${i}">${t}</li>`).join('')}</ul></div>`
      const box = el.firstChild
      box.querySelector('button').addEventListener('click', () => box.classList.toggle('on'))
      return toggleEvery(box, 'on', 1600)
    },
  },

  'push-side-drawer': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rl-push"><aside><b>選單</b><i></i><i></i><i></i></aside><main><i class="bar"></i><i></i><i></i><i></i></main></div>'
      return toggleEvery(el.firstChild, 'on', 1600)
    },
  },

  'modal-dialog': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rl-modal"><div class="bg"><i></i><i></i><i></i></div><i class="shade"></i><div class="dlg"><b>確定要刪除？</b><small>這個動作無法復原</small><div><button>取消</button><button class="del">刪除</button></div></div></div>'
      return toggleEvery(el.firstChild, 'on', 1600)
    },
  },

  'accordion-faq': {
    bg: 'light',
    run(el) {
      const qs = [['可以退款嗎？', '購買後 7 天內可全額退款。'], ['支援哪些付款方式？', '信用卡、Apple Pay 與轉帳。'], ['可以多人共用嗎？', '團隊方案最多 10 人。']]
      el.innerHTML = `<div class="rl-acc">${qs.map(([q, a]) => `<div class="it"><button>${q}<i>▾</i></button><div class="ans"><p>${a}</p></div></div>`).join('')}</div>`
      const its = [...el.querySelectorAll('.it')]
      const open = (k) => its.forEach((it, i) => it.classList.toggle('on', i === k))
      its.forEach((it, i) => it.querySelector('button').addEventListener('click', () => open(i)))
      return every(1600, (n) => open(n % 4 === 3 ? -1 : n % 4))
    },
  },

  'directional-tabs': {
    bg: 'dark',
    run(el) {
      const tabs = ['概覽', '規格', '評論']
      el.innerHTML = `<div class="rl-dtabs"><div class="head">${tabs.map((t) => `<button>${t}</button>`).join('')}<i class="ind"></i></div><div class="body"><div class="pane">${tabs[0]}的內容</div></div></div>`
      const box = el.firstChild, body = box.querySelector('.body'), btns = [...box.querySelectorAll('button')]
      let cur = 0
      const go = (k) => {
        if (k === cur) return
        const dir = k > cur ? 1 : -1
        const old = body.firstChild
        const nu = document.createElement('div')
        nu.className = 'pane'
        nu.textContent = `${tabs[k]}的內容`
        nu.style.setProperty('--h', k * 100)
        body.append(nu)
        old.animate([{ transform: 'none', opacity: 1 }, { transform: `translateX(${-dir * 40}%)`, opacity: 0 }], { duration: 400, easing: 'ease' }).onfinish = () => old.remove()
        nu.animate([{ transform: `translateX(${dir * 40}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 400, easing: 'ease' })
        box.style.setProperty('--k', k)
        cur = k
      }
      btns.forEach((b, i) => b.addEventListener('click', () => go(i)))
      return every(1400, (n) => go([0, 1, 2, 1][n % 4]))
    },
  },

  'filterable-grid': {
    bg: 'dark',
    run(el) {
      const items = ['a', 'b', 'a', 'c', 'b', 'a', 'c', 'b']
      el.innerHTML = `<div class="rl-filter"><div class="chips"><b data-f="all">全部</b><b data-f="a">網站</b><b data-f="b">App</b><b data-f="c">品牌</b></div><div class="grid">${items.map((k, i) => `<i data-k="${k}" style="--h:${{ a: 200, b: 320, c: 40 }[k]};--i:${i}"></i>`).join('')}</div></div>`
      const cells = [...el.querySelectorAll('.grid i')], chips = [...el.querySelectorAll('.chips b')]
      const set = (f) => flip(cells, () => {
        cells.forEach((c) => c.classList.toggle('hide', f !== 'all' && c.dataset.k !== f))
        chips.forEach((c) => c.classList.toggle('on', c.dataset.f === f))
      })
      return every(1500, (n) => set(['all', 'a', 'b', 'c'][n % 4]))
    },
  },

  'bento-grid-expand': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rl-bento">${['快速', '安全', '同步', '協作'].map((t, i) => `<div style="--h:${i * 80}"><b>${t}</b></div>`).join('')}</div>`
      const box = el.firstChild, cells = [...box.children]
      cells.forEach((c, i) => c.addEventListener('pointerenter', () => box.dataset.k = i))
      return every(1300, (n) => (box.dataset.k = n % 4))
    },
  },

  'list-row-fill': {
    bg: 'light',
    run(el) {
      el.innerHTML = `<div class="rl-rows">${['品牌識別', '網站設計', '動態設計', '插畫'].map((t, i) => `<div>${t}<span>0${i + 1}</span></div>`).join('')}</div>`
      const rows = [...el.querySelectorAll('.rl-rows div')]
      return pointer(el, (x, y) => {
        const k = Math.floor((y / el.clientHeight) * rows.length)
        rows.forEach((r, i) => r.classList.toggle('on', i === k))
      })
    },
  },

  'step-progress': {
    bg: 'dark',
    run(el) {
      el.innerHTML = center(`<div class="rl-steps"><div class="track"><i class="fill"></i></div>${['購物車', '資料', '付款', '完成'].map((t, i) => `<div class="s" style="--i:${i}"><b>${i + 1}</b><small>${t}</small></div>`).join('')}</div>`)
      const box = el.querySelector('.rl-steps')
      return every(1000, (n) => box.style.setProperty('--k', n % 5 > 3 ? 0 : n % 5))
    },
  },

  'mega-menu': {
    bg: 'light',
    run(el) {
      el.innerHTML = `<div class="rl-mega"><nav><b>商品 ▾</b><span>方案</span><span>資源</span></nav><div class="panel">${['設計', '開發', '行銷', '支援'].map((t, i) => `<div style="--i:${i}"><b>${t}</b><i></i><i></i><i></i></div>`).join('')}</div></div>`
      return toggleEvery(el.firstChild, 'on', 1700)
    },
  },

  'push-navigation': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rl-phone pushnav"><div class="pg a"><b>設定</b><i></i><i></i><i></i></div><div class="pg b"><b>‹ 通知</b><i></i><i></i></div></div>'
      return toggleEvery(el.firstChild, 'on', 1700)
    },
  },

  'empty-state': {
    bg: 'light',
    run(el) { el.innerHTML = center('<div class="rl-empty"><div class="art">📭</div><b>還沒有任何訊息</b><small>開始一段新的對話吧</small><button>新增訊息</button></div>') },
  },

  'cookie-banner': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="rl-page"><i></i><i></i><i></i></div><div class="rl-cookie">🍪 我們使用 Cookie 改善體驗<button>同意</button></div>'
      const banner = el.querySelector('.rl-cookie'), btn = banner.querySelector('button')
      const b = bag()
      b.add(every(3600, () => {
        banner.className = 'rl-cookie in'
        btn.textContent = '同意'
        b.timeout(() => (btn.textContent = '✓'), 1800)
        b.timeout(() => (banner.className = 'rl-cookie out'), 2400)
      }))
      return b.clear
    },
  },

  'speed-dial-fab': {
    bg: 'light',
    run(el) {
      el.innerHTML = `<div class="rl-fab">${[['✎', '新增筆記'], ['📷', '拍照'], ['🔗', '連結']].map(([i, t], k) => `<a style="--i:${k}"><em>${t}</em><span>${i}</span></a>`).join('')}<button>+</button></div>`
      const box = el.firstChild
      box.querySelector('button').addEventListener('click', () => box.classList.toggle('on'))
      return toggleEvery(box, 'on', 1600)
    },
  },

  'collapsible-sidebar': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rl-side"><aside>${[['⌂', '首頁'], ['▤', '專案'], ['◷', '排程'], ['⚙', '設定']].map(([i, t]) => `<div><span>${i}</span><em>${t}</em></div>`).join('')}</aside><main><i></i><i></i><i></i></main></div>`
      return toggleEvery(el.firstChild, 'mini', 1600)
    },
  },

  'command-palette': {
    bg: 'dark',
    run(el) {
      const all = ['開啟設定', '新增專案', '切換深色模式', '匯出檔案', '邀請成員']
      el.innerHTML = `<div class="rl-cmd"><div class="box"><div class="q"><span>⌘K</span><b></b></div><ul>${all.map((t) => `<li>${t}</li>`).join('')}</ul></div></div>`
      const box = el.firstChild, q = box.querySelector('.q b'), lis = [...box.querySelectorAll('li')]
      const words = ['', '新', '新增', '切換', '']
      return every(700, (n) => {
        const k = n % 8
        box.classList.toggle('on', k > 0 && k < 7)
        const w = words[Math.min(k, 4)] || ''
        q.textContent = w
        let first = true
        lis.forEach((li) => {
          const show = !w || li.textContent.includes(w)
          li.hidden = !show
          li.classList.toggle('sel', show && first)
          if (show) first = false
        })
      })
    },
  },

  // ── 捲動 ───────────────────────────────
  'scroll-text-reveal': {
    bg: 'dark',
    run: pinned(`<p class="rl-reveal">${[...'每一個字都在等待被看見，捲動就是你和內容之間的對話。'].map((c) => `<span>${c}</span>`).join('')}</p>`, (p, view) => {
      const ss = view.querySelectorAll('.rl-reveal span')
      ss.forEach((s, i) => s.style.setProperty('--k', clamp(p * 1.2 * ss.length - i)))
    }),
  },

  'scroll-marquee-text': {
    bg: 'dark',
    run: pinned('<div class="rl-smq"><b>SCROLL · MOTION · SCROLL · MOTION</b><b>捲動 · 動態 · 捲動 · 動態</b></div>', (p, view) => {
      const [a, b] = view.querySelectorAll('.rl-smq b')
      a.style.transform = `translateX(${-p * 60}%)`
      b.style.transform = `translateX(${-60 + p * 60}%)`
    }),
  },

  'zoom-through-text': {
    bg: 'dark',
    run: pinned('<div class="rl-ztt"><div class="next">新的章節</div><b>ZOOM</b></div>', (p, view) => {
      const b = view.querySelector('.rl-ztt b')
      b.style.transform = `scale(${1 + p ** 3 * 40})`
      view.querySelector('.rl-ztt .next').style.opacity = clamp((p - 0.6) / 0.3)
    }),
  },

  'scattered-assemble': {
    bg: 'dark',
    run(el) {
      const text = [...'ASSEMBLE']
      const seeds = text.map(() => [(Math.random() - 0.5) * 70, (Math.random() - 0.5) * 70, (Math.random() - 0.5) * 360])
      return pinned(`<div class="rl-scatter">${text.map((c) => `<span>${c}</span>`).join('')}</div>`, (p, view) => {
        const k = 1 - clamp(p * 1.3)
        view.querySelectorAll('.rl-scatter span').forEach((s, i) => {
          const [x, y, r] = seeds[i]
          s.style.transform = `translate(${x * k}cqw, ${y * k}cqh) rotate(${r * k}deg)`
          s.style.opacity = 0.3 + (1 - k) * 0.7
        })
      })(el)
    },
  },

  'blur-to-focus': {
    bg: 'dark',
    run: scrolled(hero() + `<div class="rl-focus">${[0, 1, 2, 3].map((i) => `<i class="rd-pic" style="--h:${i * 70}"></i>`).join('')}</div>` + hero(''), (p, view) => {
      const mid = view.clientHeight / 2
      view.querySelectorAll('.rl-focus i').forEach((n) => {
        const b = n.getBoundingClientRect(), v = view.getBoundingClientRect()
        const d = Math.abs(b.top - v.top + b.height / 2 - mid) / mid
        n.style.filter = `blur(${Math.min(12, d * 12)}px)`
        n.style.transform = `scale(${1 - Math.min(0.15, d * 0.15)})`
      })
    }),
  },

  'text-along-path': {
    bg: 'dark',
    run: pinned(`<svg class="rl-path" viewBox="0 0 400 160"><path id="rlPath" d="M -20 120 C 80 20, 160 20, 220 80 S 360 150, 420 40"/><text><textPath href="#rlPath" startOffset="100%">捲動讓文字沿著曲線前進 · Scroll along the path</textPath></text></svg>`, (p, view) => {
      view.querySelector('textPath').setAttribute('startOffset', `${100 - p * 160}%`)
    }),
  },

  'sticky-stacking-cards': {
    bg: 'dark',
    run: scrolled(hero('Projects') + Array.from({ length: 4 }, (_, i) => `<div class="rl-stk" style="--i:${i};--r:${(i % 2 ? 1 : -1) * (2 + i)}deg;--h:${i * 70}"><b>Project 0${i + 1}</b></div>`).join('') + '<div class="sc-spacer"></div>', (p, view, s) => {
      view.querySelectorAll('.rl-stk').forEach((c, i, all) => {
        if (i === all.length - 1) return
        const next = all[i + 1]
        const k = clamp(1 - (next.getBoundingClientRect().top - c.getBoundingClientRect().top) / c.offsetHeight)
        c.style.scale = 1 - k * 0.08
      })
    }),
  },

  'count-up-on-scroll': {
    bg: 'dark',
    run: pinned('<div class="rl-counter"><b>0</b><small>位設計師正在使用</small></div>', (p, view) => {
      view.querySelector('.rl-counter b').textContent = Math.round(p * 28640).toLocaleString()
    }),
  },

  'scroll-flip-card': {
    bg: 'dark',
    run: pinned('<div class="rl-sflip"><div class="in"><div class="f">正面</div><div class="b">背面</div></div></div>', (p, view) => {
      view.querySelector('.rl-sflip .in').style.transform = `rotateY(${p * 180}deg)`
    }),
  },

  'scroll-fan-out': {
    bg: 'dark',
    run: pinned(`<div class="rl-sfan">${[0, 1, 2, 3, 4].map((i) => `<i class="rd-pic" style="--i:${i};--h:${i * 60}"></i>`).join('')}</div>`, (p, view) => {
      view.querySelectorAll('.rl-sfan i').forEach((c, i) => (c.style.transform = `rotate(${(i - 2) * 16 * p}deg) translateX(${(i - 2) * 9 * p}cqh)`))
    }),
  },

  'scroll-zoom-to-full': {
    bg: 'dark',
    run: pinned('<div class="rl-szoom"><i class="rd-pic" style="--h:200"></i><b>Full Bleed</b></div>', (p, view) => {
      const k = 1 - p
      view.querySelector('.rl-szoom i').style.clipPath = `inset(${k * 28}% ${k * 30}% round ${k * 40}px)`
    }),
  },

  'image-parallax-in-frame': {
    bg: 'dark',
    run: scrolled(hero() + [0, 1, 2].map((i) => `<div class="rl-pframe"><i class="rd-pic" style="--h:${i * 100}"></i></div>`).join('') + hero(''), (p, view) => {
      const v = view.getBoundingClientRect()
      view.querySelectorAll('.rl-pframe').forEach((f) => {
        const b = f.getBoundingClientRect()
        const k = (b.top - v.top + b.height / 2) / v.height - 0.5
        f.firstChild.style.transform = `translateY(${k * -30}%)`
      })
    }),
  },

  'scroll-velocity-skew': {
    bg: 'dark',
    run(el) {
      const view = page(el, hero() + blocks(6) + hero(''))
      const b = bag()
      let last = view.scrollTop, skew = 0
      b.add(autoScroll(view, false))
      b.add(frames(() => {
        const v = view.scrollTop - last
        last = view.scrollTop
        skew += (Math.max(-12, Math.min(12, v * 2.5)) - skew) * 0.15
        view.querySelectorAll('.rl-block').forEach((n) => (n.style.transform = `skewY(${skew}deg)`))
      }))
      return b.clear
    },
  },

  'scroll-draw-path': {
    bg: 'dark',
    run: pinned('<svg class="rl-draw" viewBox="0 0 200 100"><path pathLength="1" d="M10 80 C 40 10, 70 10, 90 50 S 140 90, 160 40 S 190 10, 195 30"/></svg>', (p, view) => {
      view.querySelector('.rl-draw path').style.strokeDashoffset = 1 - p
    }),
  },

  'scroll-rotating-cube': {
    bg: 'dark',
    run: pinned(`<div class="rl-cube">${['ONE', 'TWO', 'THREE', 'FOUR'].map((t, i) => `<span style="--i:${i}">${t}</span>`).join('')}</div>`, (p, view) => {
      view.querySelector('.rl-cube').style.transform = `rotateX(${p * 270}deg)`
    }),
  },

  'scroll-shape-morph': {
    bg: 'dark',
    run(el) {
      // 三種形狀都用 10 個頂點，才能互相插值
      const N = 10
      const circle = Array.from({ length: N }, (_, i) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2; return [50 + Math.cos(a) * 45, 50 + Math.sin(a) * 45] })
      const square = [[50, 5], [95, 5], [95, 50], [95, 95], [72, 95], [50, 95], [5, 95], [5, 50], [5, 5], [28, 5]]
      const star = Array.from({ length: N }, (_, i) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 20 : 48; return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r] })
      const mix = (A, B, k) => A.map(([x, y], i) => `${x + (B[i][0] - x) * k}% ${y + (B[i][1] - y) * k}%`).join(',')
      return pinned('<i class="rl-morph"></i>', (p, view) => {
        const s = view.querySelector('.rl-morph')
        s.style.clipPath = `polygon(${p < 0.5 ? mix(circle, square, p * 2) : mix(square, star, (p - 0.5) * 2)})`
      })(el)
    },
  },

  'velocity-marquee': {
    bg: 'dark',
    run(el) {
      const view = page(el, hero() + hero('') + hero(''), '<div class="rl-vmq"><div class="track"><span>VELOCITY · MARQUEE · </span><span>VELOCITY · MARQUEE · </span></div></div>')
      const track = el.querySelector('.rl-vmq .track')
      const b = bag()
      let x = 0, last = view.scrollTop
      b.add(autoScroll(view, false))
      b.add(frames(() => {
        const v = view.scrollTop - last
        last = view.scrollTop
        x -= 0.6 + v * 3
        const w = track.scrollWidth / 2
        x = ((x % w) - w) % w
        track.style.transform = `translateX(${x}px)`
      }))
      return b.clear
    },
  },

  'section-theme-switch': {
    bg: 'dark',
    run: scrolled(['#1a1446', '#0f3d3e', '#4a1d2f', '#3b2f0b'].map((c, i) => `<section class="rl-theme" data-c="${c}">章節 ${i + 1}</section>`).join(''), (p, view, s, el) => {
      const secs = [...view.querySelectorAll('.rl-theme')]
      const mid = s + view.clientHeight / 2
      const cur = secs.findLast((x) => x.offsetTop <= mid) || secs[0]
      view.style.background = cur.dataset.c
    }),
  },

  'scroll-reveal': {
    bg: 'dark',
    run: triggered(hero() + Array.from({ length: 4 }, (_, i) => `<div class="rl-clip sc-rv" style="--h:${i * 80}"><b>區塊 0${i + 1}</b></div>`).join('')),
  },

  'parallax-layers': {
    bg: 'dark',
    run(el) {
      const view = page(el, hero('') + hero('') + hero(''), '<div class="rl-plx"><b class="l0">FAR</b><b class="l1">MID</b><b class="l2">NEAR</b></div>')
      const ls = [...el.querySelectorAll('.rl-plx b')]
      onScroll(view, (p, s) => ls.forEach((l, i) => (l.style.transform = `translateY(${-s * [0.3, 0.6, 1][i]}px)`)))
      return autoScroll(view, false)
    },
  },

  'scroll-spy-dot-nav': {
    bg: 'dark',
    run(el) {
      const names = ['介紹', '功能', '價格', '聯絡']
      const view = page(el, names.map((t, i) => `<section class="rl-spy" style="--h:${i * 80}">${t}</section>`).join(''), `<nav class="rl-dots">${names.map((t) => `<i><em>${t}</em></i>`).join('')}</nav>`)
      const dots = [...el.querySelectorAll('.rl-dots i')], secs = [...view.querySelectorAll('.rl-spy')]
      onScroll(view, (p, s) => {
        const k = secs.findLastIndex((x) => x.offsetTop <= s + view.clientHeight / 2)
        dots.forEach((d, i) => d.classList.toggle('on', i === Math.max(0, k)))
      })
      return autoScroll(view, false)
    },
  },

  'shrinking-sticky-header': {
    bg: 'light',
    run: scrolled(`<header class="rl-pillhead"><b>UI-db</b><nav><span>作品</span><span>關於</span></nav></header>${Array.from({ length: 10 }, (_, i) => `<div class="sc-row"><i></i><span>文章 ${i + 1}</span></div>`).join('')}`, (p, view, s) => {
      view.querySelector('.rl-pillhead').classList.toggle('pill', s > 20)
    }),
  },

  'hide-header-on-scroll': {
    bg: 'light',
    run(el) {
      const view = page(el, `<div class="rl-pad"></div>${Array.from({ length: 12 }, (_, i) => `<div class="sc-row"><i></i><span>動態 ${i + 1}</span></div>`).join('')}`, '<header class="rl-hidehead"><b>UI-db</b><span>☰</span></header>')
      const head = el.querySelector('.rl-hidehead')
      let last = 0
      onScroll(view, (p, s) => { head.classList.toggle('hide', s > last && s > 30); last = s })
      return autoScroll(view, false)
    },
  },

  'circle-reveal-transition': {
    bg: 'dark',
    run: pinned('<div class="rl-circle"><div class="a">第一章</div><div class="b">第二章</div></div>', (p, view) => {
      view.querySelector('.rl-circle .b').style.clipPath = `circle(${p * 80}% at 50% 50%)`
    }),
  },

  'split-screen-scroll': {
    bg: 'dark',
    run: pinned(`<div class="rl-split"><div class="l">${[0, 1, 2, 3].map((i) => `<i class="rd-pic" style="--h:${i * 80}"></i>`).join('')}</div><div class="r">${[3, 2, 1, 0].map((i) => `<i class="rd-pic" style="--h:${i * 80 + 40}"></i>`).join('')}</div></div>`, (p, view) => {
      view.querySelector('.rl-split .l').style.transform = `translateY(${-p * 66}%)`
      view.querySelector('.rl-split .r').style.transform = `translateY(${-66 + p * 66}%)`
    }),
  },

  'back-to-top-progress': {
    bg: 'light',
    run(el) {
      const view = page(el, `<article class="sc-article"><h3>長篇文章</h3>${Array.from({ length: 30 }, (_, i) => `<i style="width:${90 - (i % 4) * 8}%"></i>`).join('')}</article>`, '<button class="rl-top" aria-label="回到頂部"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" pathLength="1"/></svg>↑</button>')
      const btn = el.querySelector('.rl-top'), c = btn.querySelector('circle')
      btn.addEventListener('click', () => view.scrollTo({ top: 0, behavior: 'smooth' }))
      onScroll(view, (p, s) => { c.style.strokeDashoffset = 1 - p; btn.classList.toggle('on', s > 30) })
      return autoScroll(view, false)
    },
  },

  'split-doors-reveal': {
    bg: 'dark',
    run: pinned('<div class="rl-doors"><div class="inside">Welcome</div><i class="l"></i><i class="r"></i></div>', (p, view) => {
      view.querySelector('.rl-doors .l').style.transform = `translateX(${-p * 100}%)`
      view.querySelector('.rl-doors .r').style.transform = `translateX(${p * 100}%)`
    }),
  },

  'infinite-scroll': {
    bg: 'light',
    run(el) {
      const view = page(el, '<div class="rl-inf"></div><div class="rl-loader"><i></i></div>')
      const list = view.querySelector('.rl-inf'), loader = view.querySelector('.rl-loader')
      let n = 0, busy = false
      const more = () => {
        for (let i = 0; i < 4; i++) list.insertAdjacentHTML('beforeend', `<div class="sc-row"><i></i><span>貼文 ${++n}</span></div>`)
      }
      more(); more()
      const b = bag()
      const io = new IntersectionObserver((es) => {
        if (!es[0].isIntersecting || busy) return
        busy = true
        b.timeout(() => { if (n > 40) { list.innerHTML = ''; n = 0; view.scrollTop = 0; more() } more(); busy = false }, 700)
      }, { root: view })
      io.observe(loader)
      b.add(() => io.disconnect())
      b.add(autoScroll(view, false))
      return b.clear
    },
  },
}
