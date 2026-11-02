import textMotion from './text-motion/index.js'
import micro from './micro/index.js'
import loading from './loading/index.js'
import background from './background/index.js'
import scroll from './scroll/index.js'
import motionPicks from './motion-picks/index.js'

// collection id → { demoKey: { bg, run(el) } }
export const demosByCollection = {
  'text-motion-40': textMotion,
  'micro-12': micro,
  'loading-12': loading,
  'background-12': background,
  'scroll-12': scroll,
  'motion-picks': motionPicks,
}

// 每個組別的主色（舞台用）
export const groupAccent = {
  impact: '#ee8fbd',
  flow: '#dcf244',
  depth: '#d97a5b',
  switch: '#dcf244',
  style: '#ee8fbd',
  button: '#7aa7ff',
  feedback: '#b69cff',
  spinner: '#5fd3c6',
  placeholder: '#ffb454',
  gradient: '#ff9e6b',
  pattern: '#6be0ff',
  trigger: '#8ef0a8',
  linked: '#f5d76e',
  'mp-visual': '#ff8fa3',
  'mp-ui': '#9be7ff',
}

// 嵌入原站頁面，裁切到預覽區。原站寬 800 時預覽約在 (30, 290)，大小 740×380
// shortcut: 依原站目前版面寫死裁切位置，原站改版要調整
function mountEmbed(el, item) {
  el.dataset.bg = 'dark'
  const s = Math.max(el.clientWidth / 740, el.clientHeight / 380)
  const x = (el.clientWidth - 740 * s) / 2 - 30 * s
  const y = (el.clientHeight - 380 * s) / 2 - 290 * s
  el.innerHTML = `<iframe class="stage-embed" src="${item.embed}" title="${item.zh}" loading="lazy" sandbox="allow-scripts allow-same-origin" style="transform:translate(${x}px,${y}px) scale(${s})"></iframe>`
  return () => { el.innerHTML = '' }
}

// 在 el 上掛載 demo，回傳 cleanup
export function mountDemo(el, item) {
  if (item.embed) return mountEmbed(el, item)
  const demo = demosByCollection[item.collection]?.[item.demo]
  if (!demo) {
    el.innerHTML = '<div class="stage-missing">尚無 demo</div>'
    return () => {}
  }
  el.dataset.bg = demo.bg
  el.style.setProperty('--accent', groupAccent[item.group] || '#ee8fbd')
  const cleanup = demo.run(el)
  return () => {
    if (typeof cleanup === 'function') cleanup()
    el.innerHTML = ''
  }
}
