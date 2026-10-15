// 文字動態 40 招的 demo 實作。
// key 對應 items 裡的 demo 欄位；bg 決定舞台底色（dark / accent / light）。
import './text-motion.css'
import { chars, every, frames, replay, bag, marquee, vmarquee, rand } from '../utils.js'

const cycleWords = (el, words, ms, cls, tag = 'b') =>
  every(ms, (n) => {
    el.innerHTML = `<${tag} class="${cls}">${words[n % words.length]}</${tag}>`
  })

export default {
  // ── IMPACT ────────────────────────────────
  'word-burst': {
    bg: 'dark',
    run(el) {
      const rays = Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36}deg"></i>`).join('')
      el.innerHTML = `<div class="tm-burst"><div class="tm-burst-rays">${rays}</div><b>超強</b></div>`
    },
  },

  'letter-sequence': {
    bg: 'accent',
    run(el) {
      const seq = [...'就是現在吧', '']
      return every(380, (n) => {
        const c = seq[n % seq.length]
        el.innerHTML = c ? `<b class="tm-slam">${c}</b>` : ''
      })
    },
  },

  'text-stamp': {
    bg: 'light',
    run(el) {
      const stamps = [['確定', -26, -8, -9], ['通過', 0, 10, 4], ['完成', 26, -4, -5]]
      el.innerHTML = `<div class="tm-stamp-wrap">${stamps
        .map(([w, x, y, r], i) => `<span class="tm-stamp" style="--x:${x}cqw;--y:${y}cqh;--r:${r}deg;--i:${i}">${w}</span>`)
        .join('')}</div>`
    },
  },

  'punch-zoom': {
    bg: 'dark',
    run(el) {
      const layers = [5, 4, 3, 2, 1, 0].map((i) => `<b class="tm-punch ${i ? 'ghost' : ''}" style="--i:${i}">開場</b>`).join('')
      el.innerHTML = `<div class="tm-center">${layers}</div>`
    },
  },

  'kinetic-stack': {
    bg: 'dark',
    run(el) {
      const lines = [['今晚', '-60cqw', '0', 22], ['一起', '60cqw', '0', 30], ['出發吧', '0', '60cqh', 26]]
      el.innerHTML = `<div class="tm-stack">${lines
        .map(([w, fx, fy, s], i) => `<b style="--fx:${fx};--fy:${fy};--s:${s}cqh;--i:${i}">${w}</b>`)
        .join('')}</div>`
    },
  },

  'stretch-text': {
    bg: 'accent',
    run(el) {
      el.innerHTML = `<div class="tm-stretch">${chars('拉長了')}</div>`
    },
  },

  'text-zoom-through': {
    bg: 'light',
    run(el) {
      return cycleWords(el, ['衝進', '字裡', '下一個'], 1700, 'tm-zoomthru')
    },
  },

  'text-squeeze': {
    bg: 'dark',
    run(el) {
      return cycleWords(el, ['彈力', 'Q彈', '啵！'], 1300, 'tm-squeeze')
    },
  },

  // ── FLOW ──────────────────────────────────
  'huge-text-scroll': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="tm-huge">
        ${marquee('台北夜行・台北夜行・', { dur: 7, cls: 'big' })}
        ${marquee('台北夜行・TAIPEI NIGHT WALK・台北夜行・TAIPEI NIGHT WALK・', { dur: 14, reverse: true, cls: 'strip' })}
      </div>`
    },
  },

  'vertical-typography': {
    bg: 'accent',
    run(el) {
      const cols = ['走疾走疾走疾走疾', '寂靜寂靜寂靜', '走疾走疾走疾走疾', '寂靜寂靜寂靜', '走疾走疾走疾走疾', '寂靜寂靜寂靜']
      el.innerHTML = `<div class="tm-vtype">${cols
        .map((t, i) => vmarquee(t, { dur: i % 2 ? 9 : 5, reverse: i % 2 === 1, cls: i % 2 ? 'calm' : 'rush' }))
        .join('')}</div>`
    },
  },

  'repeating-text': {
    bg: 'light',
    run(el) {
      let cells = ''
      for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) cells += `<span style="--d:${r + c}">流行</span>`
      el.innerHTML = `<div class="tm-repeat">${cells}</div>`
    },
  },

  'diagonal-text-bands': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="tm-bands">
        <div class="band a">${marquee('天亮以前・天亮以前・天亮以前・', { dur: 8 })}</div>
        <div class="band b">${marquee('天亮以前・天亮以前・天亮以前・', { dur: 10, reverse: true })}</div>
      </div>`
    },
  },

  'text-ribbon': {
    bg: 'dark',
    run(el) {
      const unit = '跟著節奏走・'
      el.innerHTML = `<svg class="tm-ribbon" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice">
        <path id="tmRibbonPath" d="M -60 120 C 40 10, 140 10, 200 80 S 360 150, 460 40" />
        <use href="#tmRibbonPath" class="band" />
        <text dy="6"><textPath href="#tmRibbonPath" startOffset="0">${unit.repeat(10)}</textPath></text>
      </svg>`
      const tp = el.querySelector('textPath')
      const seg = tp.getComputedTextLength() / 10 || 90
      return frames((t) => tp.setAttribute('startOffset', -((t * 0.04) % seg)))
    },
  },

  marquee: {
    bg: 'accent',
    run(el) {
      el.innerHTML = `<div class="tm-marquee">
        ${marquee('限時開賣・限時開賣・限時開賣・', { dur: 11, cls: 'r1' })}
        ${marquee('新品上市・新品上市・新品上市・', { dur: 7, reverse: true, cls: 'r2' })}
        ${marquee('預購中・預購中・預購中・預購中・預購中・', { dur: 15, cls: 'r3' })}
        ${marquee('最後一天・最後一天・最後一天・', { dur: 9, reverse: true, cls: 'r4' })}
      </div>`
    },
  },

  'parallax-columns': {
    bg: 'light',
    run(el) {
      const layer = (n, dur, cls) =>
        `<div class="layer ${cls}">${Array.from({ length: n }, (_, i) =>
          vmarquee('燈夜雨街燈夜雨街', { dur: dur + (i % 3), reverse: i % 2 === 1 })
        ).join('')}</div>`
      el.innerHTML = `<div class="tm-parallax">${layer(12, 22, 'back')}${layer(6, 13, 'mid')}${layer(3, 7, 'front')}</div>`
    },
  },

  'tape-cross': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="tm-tape">
        <div class="tape a">${marquee('禁止進入・KEEP OUT・禁止進入・KEEP OUT・', { dur: 9 })}</div>
        <div class="tape b">${marquee('禁止進入・KEEP OUT・禁止進入・KEEP OUT・', { dur: 9, reverse: true })}</div>
      </div>`
    },
  },

  // ── DEPTH ─────────────────────────────────
  'text-tunnel': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="tm-center">${Array.from({ length: 7 }, (_, i) =>
        `<b class="tm-tunnel ${i % 2 ? 'outline' : ''}" style="--i:${i}">宇宙</b>`
      ).join('')}</div>`
    },
  },

  'text-corridor': {
    bg: 'dark',
    run(el) {
      const rows = Array.from({ length: 24 }, () => '<span>前進・前進・前進・前進</span>').join('')
      const face = (r) => `<div class="face" style="--r:${r}deg"><div class="plane"><div class="flow">${rows}${rows}</div></div></div>`
      el.innerHTML = `<div class="tm-corridor">${[0, 90, 180, 270].map(face).join('')}<b class="end">前進</b></div>`
    },
  },

  'text-cylinder': {
    bg: 'light',
    run(el) {
      const cyl = (c, i) =>
        `<div class="cyl" style="--dir:${i % 2 ? -1 : 1}">${Array.from({ length: 8 }, (_, k) =>
          `<span class="${k % 2 ? 'box' : ''}" style="--k:${k}">${c}</span>`
        ).join('')}</div>`
      el.innerHTML = `<div class="tm-cylinders">${[...'轉圈圈轉'].map(cyl).join('')}</div>`
    },
  },

  'text-vortex': {
    bg: 'dark',
    run(el) {
      const n = 12
      el.innerHTML = `<div class="tm-vortex">${Array.from({ length: n }, (_, k) =>
        `<b style="--k:${k - n / 2};--t:${(k / n) * 100}%;--b:${100 - ((k + 1) / n) * 100}%">漩渦</b>`
      ).join('')}</div>`
    },
  },

  'ring-text-tunnel': {
    bg: 'dark',
    run(el) {
      const text = [...'穿越光的隧道・穿越光的隧道・']
      const ring = (i) =>
        `<div class="ring" style="--i:${i}">${text
          .map((c, k) => `<span style="--a:${(k * 360) / text.length}deg">${c}</span>`)
          .join('')}</div>`
      el.innerHTML = `<div class="tm-rings">${Array.from({ length: 5 }, (_, i) => ring(i)).join('')}</div>`
    },
  },

  'text-orbit': {
    bg: 'accent',
    run(el) {
      const text = [...'ORBIT・軌道・ORBIT・軌道・']
      el.innerHTML = `<div class="tm-orbit-scene"><div class="tm-orbit">
        <div class="path"></div>
        ${text.map((c, k) => `<span style="--a:${(k * 360) / text.length}deg">${c}</span>`).join('')}
      </div><b class="title">軌道</b></div>`
    },
  },

  'text-cube': {
    bg: 'light',
    run(el) {
      el.innerHTML = `<div class="tm-cube-scene"><div class="tm-cube">${[...'春夏秋冬']
        .map((c, i) => `<span style="--i:${i}">${c}</span>`)
        .join('')}</div></div>`
    },
  },

  'extrude-text': {
    bg: 'dark',
    run(el) {
      const depth = 16
      el.innerHTML = `<div class="tm-extrude-scene"><div class="tm-extrude">${Array.from({ length: depth }, (_, i) =>
        `<b style="--z:${i};--l:${i / depth}" class="${i === 0 ? 'face' : ''}">立體</b>`
      ).join('')}</div></div>`
    },
  },

  // ── SWITCH ────────────────────────────────
  'split-flap': {
    bg: 'dark',
    run(el) {
      const words = ['末班列車', '準時發車', '往高雄站', '月台三號']
      const pool = [...'ABCDEFGHJKLMNPRSTUVWXYZ0123456789車站班列準時發往號台月高雄末三']
      el.innerHTML = `<div class="tm-flaps">${'□□□□'.split('').map(() => '<div class="flap"><span></span></div>').join('')}</div>`
      const tiles = [...el.querySelectorAll('.flap span')]
      const b = bag()
      let w = 0
      const spin = () => {
        const word = [...words[w++ % words.length]]
        let tick = 0
        const id = setInterval(() => {
          tick++
          let done = true
          tiles.forEach((t, i) => {
            const stop = 7 + i * 4
            if (tick < stop) { done = false; t.textContent = rand(pool); replay(t, 'flip') }
            else if (tick === stop) { t.textContent = word[i]; replay(t, 'flip') }
          })
          if (done) { clearInterval(id); b.timeout(spin, 1800) }
        }, 70)
        b.add(() => clearInterval(id))
      }
      spin()
      return b.clear
    },
  },

  'flip-cards': {
    bg: 'accent',
    run(el) {
      const words = ['月光下', '晚安了', '好夢見']
      el.innerHTML = `<div class="tm-cards">${[...words[0]]
        .map((c) => `<div class="card" data-n="0"><span class="front">${c}</span><span class="back"></span></div>`)
        .join('')}</div>`
      const cards = [...el.querySelectorAll('.card')]
      let w = 0
      const id = setInterval(() => {
        const next = [...words[++w % words.length]]
        cards.forEach((card, i) => {
          const n = +card.dataset.n
          card.querySelector(n % 2 ? '.front' : '.back').textContent = next[i]
          card.dataset.n = n + 1
          card.style.transitionDelay = `${i * 120}ms`
          card.style.transform = `rotateY(${(n + 1) * 180}deg)`
        })
      }, 1800)
      return () => clearInterval(id)
    },
  },

  typewriter: {
    bg: 'light',
    run(el) {
      const lines = ['從前從前……', '有一隻貓', '牠想去看海']
      el.innerHTML = `<div class="tm-type"><span class="txt"></span><i class="caret"></i></div>`
      const txt = el.querySelector('.txt')
      const b = bag()
      let l = 0
      const type = (s, i = 0) => {
        txt.textContent = s.slice(0, i)
        if (i < s.length) b.timeout(() => type(s, i + 1), 130)
        else b.timeout(() => erase(s, s.length), 1300)
      }
      const erase = (s, i) => {
        txt.textContent = s.slice(0, i)
        if (i > 0) b.timeout(() => erase(s, i - 1), 45)
        else b.timeout(() => type(lines[++l % lines.length]), 350)
      }
      type(lines[0])
      return b.clear
    },
  },

  'slot-text': {
    bg: 'dark',
    run(el) {
      const results = ['大吉利', '好運來', '發大財']
      const pool = [...'吉利運財福祿壽喜發大好來旺']
      el.innerHTML = `<div class="tm-slots">${'□□□'.split('').map(() => '<div class="reel"><div class="strip"></div></div>').join('')}</div>`
      const strips = [...el.querySelectorAll('.strip')]
      let r = 0
      const spin = () => {
        const prev = [...results[(r + results.length - 1) % results.length]]
        const word = [...results[r++ % results.length]]
        strips.forEach((s, i) => {
          const len = 14 + i * 6
          const seq = [prev[i], ...Array.from({ length: len - 2 }, () => rand(pool)), word[i]]
          s.style.transition = 'none'
          s.style.transform = 'translateY(0)'
          s.innerHTML = seq.map((c) => `<span>${c}</span>`).join('')
          void s.offsetWidth
          s.style.transition = `transform ${1.1 + i * 0.45}s cubic-bezier(.15,.75,.25,1.04)`
          s.style.transform = `translateY(calc(-${len - 1} * 1.25em))`
        })
      }
      return every(3600, spin)
    },
  },

  odometer: {
    bg: 'light',
    run(el) {
      const target = '12480'
      const strip = Array.from({ length: 30 }, (_, k) => `<span>${k % 10}</span>`).join('')
      const digits = [...target].map((_, i) => `<div class="digit"><div class="col">${strip}</div></div>${i === 1 ? '<em>,</em>' : ''}`).join('')
      el.innerHTML = `<div class="tm-odo"><small>累計</small>${digits}<small>人</small></div>`
      const cols = [...el.querySelectorAll('.col')]
      return every(4200, () => {
        cols.forEach((c) => { c.style.transition = 'none'; c.style.transform = 'translateY(0)' })
        void el.offsetWidth
        cols.forEach((c, i) => {
          const idx = +target[i] + (i >= 2 ? 20 : 10)
          c.style.transition = `transform ${1.2 + i * 0.35}s cubic-bezier(.2,.8,.2,1)`
          c.style.transform = `translateY(calc(-${idx} * 1.2em))`
        })
      })
    },
  },

  'headline-swap': {
    bg: 'accent',
    run(el) {
      const heads = ['台灣上線', '今晚開賣', '全新登場', '限量加開']
      el.innerHTML = `<div class="tm-headline"><span class="label">快訊</span><div class="box"><span class="txt">${heads[0]}</span><i class="wipe"></i></div></div>`
      const txt = el.querySelector('.txt')
      const wipe = el.querySelector('.wipe')
      const b = bag()
      b.add(every(2200, (n) => {
        if (!n) return
        replay(wipe, 'go')
        b.timeout(() => (txt.textContent = heads[n % heads.length]), 330)
      }))
      return b.clear
    },
  },

  'led-text': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<canvas class="tm-led"></canvas>'
      const cv = el.querySelector('canvas')
      const ctx = cv.getContext('2d')
      const rows = 26
      const msg = '最新消息・BREAKING NEWS・'
      // 用離屏 canvas 把文字畫成點陣（字型載入後重畫一次）
      let px, tw
      const build = () => {
        const off = document.createElement('canvas')
        const octx = off.getContext('2d', { willReadFrequently: true })
        const font = `900 ${rows - 3}px "Noto Sans TC", sans-serif`
        octx.font = font
        tw = Math.ceil(octx.measureText(msg).width)
        off.width = tw
        off.height = rows
        octx.font = font
        octx.fillStyle = '#fff'
        octx.textBaseline = 'middle'
        octx.fillText(msg, 0, rows / 2 + 1)
        px = octx.getImageData(0, 0, tw, rows).data
      }
      build()
      document.fonts?.load(`900 ${rows - 3}px "Noto Sans TC"`, msg).then(build)
      const lit = (x, y) => px[(y * tw + (((x % tw) + tw) % tw)) * 4 + 3] > 110
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim() || '#dcf244'
      let offset = 0
      const draw = () => {
        const dpr = window.devicePixelRatio || 1
        const w = el.clientWidth, h = el.clientHeight
        if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, w, h)
        const pitch = h / (rows + 2)
        const cols = Math.ceil(w / pitch)
        const top = (h - rows * pitch) / 2
        for (let y = 0; y < rows; y++)
          for (let x = 0; x < cols; x++) {
            const on = lit(x + offset, y)
            ctx.fillStyle = on ? accent : 'rgba(255,255,255,0.07)'
            ctx.shadowBlur = on ? pitch * 0.6 : 0
            ctx.shadowColor = accent
            ctx.beginPath()
            ctx.arc(x * pitch + pitch / 2, top + y * pitch + pitch / 2, pitch * 0.4, 0, Math.PI * 2)
            ctx.fill()
          }
        offset++
      }
      return every(55, draw)
    },
  },

  'split-halves': {
    bg: 'dark',
    run(el) {
      const words = ['重生', '破繭', '新局', '起飛']
      return every(2000, (n) => {
        const a = words[n % words.length]
        const b = words[(n + 1) % words.length]
        el.innerHTML = `<div class="tm-split go"><b class="next">${b}</b><b class="half top">${a}</b><b class="half bot">${a}</b></div>`
      })
    },
  },

  // ── STYLE ─────────────────────────────────
  'outline-text': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="tm-outline">${Array.from({ length: 5 }, (_, i) =>
        `<div class="row" style="--i:${i}">疾風怒濤・疾風怒濤・疾風怒濤</div>`
      ).join('')}</div>`
    },
  },

  'glitch-slices': {
    bg: 'accent',
    run(el) {
      const n = 7
      el.innerHTML = `<div class="tm-glitch">${Array.from({ length: n }, (_, k) =>
        `<b style="--t:${(k / n) * 100}%;--b:${100 - ((k + 1) / n) * 100}%">故障</b>`
      ).join('')}</div>`
      const slices = [...el.querySelectorAll('b')]
      return every(90, (t) => {
        const on = t % 18 < 5 || (t % 18 === 9)
        slices.forEach((s) => {
          const x = on ? (Math.random() - 0.5) * 18 : 0
          s.style.transform = `translateX(${x}cqw)`
          s.classList.toggle('rgb', on && Math.random() > 0.4)
        })
      })
    },
  },

  'text-mask-pattern': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="tm-center"><b class="tm-mask">祭典</b></div>'
    },
  },

  'long-shadow': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="tm-center"><b class="tm-longshadow">光與影</b></div>'
      const t = el.querySelector('b')
      const accent = getComputedStyle(el).getPropertyValue('--accent').trim()
      return frames((ms) => {
        const a = (ms / 4000) * Math.PI * 2 + Math.PI / 4
        const step = t.clientHeight / 90
        const dx = Math.cos(a) * step, dy = Math.sin(a) * step
        const sh = []
        for (let i = 1; i <= 34; i++) sh.push(`${(dx * i).toFixed(1)}px ${(dy * i).toFixed(1)}px 0 ${accent}`)
        t.style.textShadow = sh.join(',')
      })
    },
  },

  'liquid-fill': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="tm-center"><b class="tm-liquid">滿</b></div>'
    },
  },

  'highlight-text': {
    bg: 'accent',
    run(el) {
      el.innerHTML = '<div class="tm-hl-card"><span class="tm-hl">一句話的力量</span></div>'
    },
  },

  'split-invert': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="tm-invert"><div class="layer a"><b>反轉</b></div><div class="layer b"><b>反轉</b></div></div>`
    },
  },

  'text-echo': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="tm-center">${Array.from({ length: 9 }, (_, i) =>
        `<b class="tm-echo ${i === 8 ? 'lead' : ''}" style="--i:${8 - i}">殘影</b>`
      ).join('')}</div>`
    },
  },
}
