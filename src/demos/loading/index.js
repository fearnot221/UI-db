// 載入動畫 12 招
import './loading.css'
import { frames } from '../utils.js'

// 不等速但單調遞增的進度：0→1 花 3 秒，停 0.8 秒後重來
const progress = (t) => {
  const k = (t % 3800) / 3000
  if (k >= 1) return 1
  return k - Math.sin(k * Math.PI * 6) / (Math.PI * 6)
}

export default {
  'ring-spinner': { bg: 'dark', run(el) { el.innerHTML = '<div class="ld-center"><i class="ld-ring"></i></div>' } },

  'bouncing-dots': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="ld-center ld-dots">${'<i></i>'.repeat(3)}</div>` },
  },

  'pulse-ring': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="ld-center ld-pulse"><i></i><i></i><i></i><b></b></div>' },
  },

  'orbit-loader': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="ld-center ld-orbit"><span class="o1"><i></i></span><span class="o2"><i></i></span><b></b></div>' },
  },

  'bar-equalizer': {
    bg: 'dark',
    run(el) { el.innerHTML = `<div class="ld-center ld-eq">${[0, 3, 1, 4, 2].map((d) => `<i style="--d:${d}"></i>`).join('')}</div>` },
  },

  'morphing-shape': { bg: 'dark', run(el) { el.innerHTML = '<div class="ld-center"><i class="ld-morph"></i></div>' } },

  'skeleton-shimmer': {
    bg: 'light',
    run(el) {
      const card = '<div class="ld-skel"><i class="av"></i><div><i class="l1"></i><i class="l2"></i><i class="l3"></i></div></div>'
      el.innerHTML = `<div class="ld-center ld-skels">${card}${card}</div>`
    },
  },

  'progress-bar': {
    bg: 'dark',
    run(el) {
      el.innerHTML = '<div class="ld-center"><div class="ld-bar"><div class="head"><span>上傳中…</span><b>0%</b></div><div class="track"><i></i></div></div></div>'
      const fill = el.querySelector('.track i')
      const num = el.querySelector('b')
      return frames((t) => {
        const p = progress(t)
        fill.style.transform = `scaleX(${p})`
        num.textContent = `${Math.round(p * 100)}%`
      })
    },
  },

  'indeterminate-bar': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="ld-center"><div class="ld-indet"><i></i></div></div>' },
  },

  'circular-progress': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="ld-center"><div class="ld-circle">
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" class="bg"/><circle cx="50" cy="50" r="42" class="fg" pathLength="100"/></svg><b>0%</b></div></div>`
      const fg = el.querySelector('.fg')
      const num = el.querySelector('b')
      return frames((t) => {
        const p = progress(t)
        fg.style.strokeDashoffset = 100 - p * 100
        num.textContent = `${Math.round(p * 100)}%`
      })
    },
  },

  'typing-indicator': {
    bg: 'light',
    run(el) {
      el.innerHTML = '<div class="ld-center ld-chat"><div class="msg">今晚要吃什麼？</div><div class="typing"><i></i><i></i><i></i></div></div>'
    },
  },

  'blur-reveal': {
    bg: 'dark',
    run(el) { el.innerHTML = '<div class="ld-center"><div class="ld-photo"><div class="img"></div></div></div>' },
  },
}
