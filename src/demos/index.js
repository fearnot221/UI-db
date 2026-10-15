import textMotion from './text-motion/index.js'

// collection id → { demoKey: { bg, run(el) } }
export const demosByCollection = {
  'text-motion-40': textMotion,
}

// 每個組別的主色（舞台用）
export const groupAccent = {
  impact: '#ee8fbd',
  flow: '#dcf244',
  depth: '#d97a5b',
  switch: '#dcf244',
  style: '#ee8fbd',
}

// 在 el 上掛載 demo，回傳 cleanup
export function mountDemo(el, item) {
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
