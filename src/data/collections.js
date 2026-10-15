// 收藏集（Collection）：每一個來源 / 主題一組。
// 新增收藏集時，在這裡加一筆，再到 items/ 建立對應的項目檔。

export const categories = [
  { id: 'text-motion', label: '文字動態', en: 'Text Motion' },
  // 之後可擴充：{ id: 'scroll', label: '捲動效果', en: 'Scroll Effects' } ...
]

export const collections = [
  {
    id: 'text-motion-40',
    category: 'text-motion',
    title: '文字動態 40 招',
    en: 'Text Motion 40',
    author: '@ai_tjb',
    source: 'https://www.threads.com/@ai_tjb/post/DeeHoA3ktZ5',
    savedAt: '2026-10-16',
    note: '每招都有名字：把中文名 + 英文原名寫進提示詞，AI 就能做出那一招。',
    groups: [
      { id: 'impact', label: 'IMPACT', zh: '衝擊', desc: '一個字就能改變氣氛', range: '01–08' },
      { id: 'flow', label: 'FLOW', zh: '流動', desc: '文字一直流動不停', range: '09–16' },
      { id: 'depth', label: 'DEPTH', zh: '景深', desc: '鑽進文字裡面', range: '17–24' },
      { id: 'switch', label: 'SWITCH', zh: '切換', desc: '把一個詞換成另一個', range: '25–32' },
      { id: 'style', label: 'STYLE', zh: '風格', desc: '換個呈現方式就升級', range: '33–40' },
    ],
  },
]
