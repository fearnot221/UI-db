// 統一分類：不管來源，每招都歸到一個類型與時機
export const types = [
  { id: 'text', label: '文字', en: 'Text' },
  { id: 'button', label: '按鈕', en: 'Buttons' },
  { id: 'form', label: '表單・控制項', en: 'Forms' },
  { id: 'card', label: '卡片・群組', en: 'Cards' },
  { id: 'media', label: '圖片・媒體', en: 'Media' },
  { id: 'svg', label: '圖形・SVG', en: 'Graphics' },
  { id: 'bg', label: '背景・氛圍', en: 'Backgrounds' },
  { id: 'layout', label: '版面・頁面', en: 'Layout' },
  { id: 'scroll', label: '捲動', en: 'Scroll' },
  { id: 'cursor', label: '游標', en: 'Cursor' },
  { id: 'loading', label: '載入', en: 'Loading' },
]

export const timings = ['進場', '退場', '切換', '循環待機', '懸停・點擊', '捲動觸發', '拖曳手勢']

const SCROLL = '捲動觸發'
const byGroup = {
  impact: ['text', '進場'], flow: ['text', '循環待機'], depth: ['text', '循環待機'], switch: ['text', '切換'], style: ['text', '循環待機'],
  button: ['button', '懸停・點擊'], feedback: ['form', '懸停・點擊'],
  spinner: ['loading', '循環待機'], placeholder: ['loading', '循環待機'],
  gradient: ['bg', '循環待機'], pattern: ['bg', '循環待機'],
  trigger: ['scroll', SCROLL], linked: ['scroll', SCROLL],
  'mp-visual': ['svg', '循環待機'], 'mp-ui': ['form', '懸停・點擊'],
  rm: ['text', '循環待機'],
  'ml-text': ['text'], 'ml-button': ['button'], 'ml-form': ['form'], 'ml-card': ['card'], 'ml-media': ['media'],
  'ml-svg': ['svg'], 'ml-bg': ['bg'], 'ml-layout': ['layout'], 'ml-cursor': ['cursor'],
}
const LOADERS = new Set(['geometricloader', 'toploadingbar'])
const key = (en) => en.toLowerCase().replace(/[^a-z0-9]/g, '')

// 同名效果只留一筆：優先自製 demo，並連到原站頁面
export function organize(own, library) {
  const libByKey = new Map(library.map((it) => [key(it.en), it]))
  const libByNo = new Map(library.map((it) => [it.no, it]))
  const libType = (it) => (LOADERS.has(key(it.en)) ? 'loading' : byGroup[it.group][0])
  // 重製版用 ml（原站編號）精準對應，其餘用英文名對應
  const matchOf = (it) => (it.ml ? libByNo.get(it.ml) : libByKey.get(key(it.en)))
  const merged = own.map((it) => {
    const lib = matchOf(it)
    const [type, timing] = byGroup[it.group]
    return { ...it, type: lib && type !== 'loading' ? libType(lib) : type, timing: lib ? lib.tags[0] : timing, related: lib?.url }
  })
  const taken = new Set(own.map(matchOf).filter(Boolean))
  const rest = library.filter((it) => !taken.has(it)).map((it) => ({ ...it, type: libType(it), timing: it.tags[0] }))
  return [...merged, ...rest].map((it) => (it.timing === SCROLL ? { ...it, type: 'scroll' } : it))
}
