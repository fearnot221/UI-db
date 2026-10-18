// 載入動畫 12 招 — UI-db 自行整理
import { defineItems } from './define.js'

export default defineItems('ld', 'loading-12', [
  { no: 1, group: 'spinner', zh: '環形轉圈', en: 'Ring Spinner', desc: '缺一角的圓環一直轉', tags: ['通用', '經典'],
    prompt: 'Ring Spinner：圓形邊框只有一段上色（border-top），以 linear 無限旋轉。' },
  { no: 2, group: 'spinner', zh: '跳動圓點', en: 'Bouncing Dots', desc: '三個點輪流跳起來', tags: ['輕量', '聊天'],
    prompt: 'Bouncing Dots：三個圓點依序延遲上下跳動，形成波浪節奏。' },
  { no: 3, group: 'spinner', zh: '脈衝波紋', en: 'Pulse Ring', desc: '圓圈一圈圈往外擴散', tags: ['定位', '連線中'],
    prompt: 'Pulse Ring：中心圓點不動，外圍圓環從小放大並淡出，多圈錯開時間循環。' },
  { no: 4, group: 'spinner', zh: '軌道載入', en: 'Orbit Loader', desc: '小球繞著中心公轉', tags: ['科技', '太空'],
    prompt: 'Orbit Loader：兩顆小球以不同半徑與速度繞中心公轉，軌道用淡色細線畫出。' },
  { no: 5, group: 'spinner', zh: '等化器', en: 'Bar Equalizer', desc: '直條像音量一樣起伏', tags: ['音樂', '處理中'],
    prompt: 'Equalizer Loader：數根直條以 scaleY 上下伸縮，每根延遲不同，像音訊等化器。' },
  { no: 6, group: 'spinner', zh: '變形方塊', en: 'Morphing Shape', desc: '方形邊轉邊變成圓形', tags: ['幾何', '品牌'],
    prompt: 'Morphing Loader：方塊旋轉的同時 border-radius 在 0 和 50% 之間變化，方圓互換。' },
  { no: 7, group: 'placeholder', zh: '骨架屏', en: 'Skeleton Shimmer', desc: '先畫出內容的灰色輪廓', tags: ['列表', '卡片'],
    prompt: 'Skeleton Screen：用灰色圓角塊預先排出頭像、標題、內文的版型，上面有一道光由左到右掃過。' },
  { no: 8, group: 'placeholder', zh: '進度條', en: 'Progress Bar', desc: '一段一段前進，數字跟著跑', tags: ['上傳', '下載'],
    prompt: 'Determinate Progress Bar：進度條分段前進（不等速），右側百分比數字同步累加到 100%。' },
  { no: 9, group: 'placeholder', zh: '不定進度條', en: 'Indeterminate Bar', desc: '一段色塊在軌道上來回跑', tags: ['Material', '頂部'],
    prompt: 'Indeterminate Progress：細長軌道中一段色塊由左往右滑過，長度伸縮變化，無限循環。' },
  { no: 10, group: 'placeholder', zh: '圓形進度', en: 'Circular Progress', desc: '圓環被慢慢畫滿', tags: ['儀表', '完成度'],
    prompt: 'Circular Progress：SVG 圓用 stroke-dashoffset 從 0 畫到 100%，中央顯示百分比數字。' },
  { no: 11, group: 'placeholder', zh: '輸入中', en: 'Typing Indicator', desc: '對話泡泡裡三個點閃爍', tags: ['聊天', 'AI'],
    prompt: 'Typing Indicator：對話泡泡內三個圓點依序變亮變大，表示對方正在輸入（像 iMessage）。' },
  { no: 12, group: 'placeholder', zh: '模糊載入', en: 'Blur Reveal', desc: '圖片從模糊慢慢變清楚', tags: ['圖片', '漸進'],
    prompt: 'Progressive Image / Blur-up：先顯示放大且高斯模糊的縮圖，原圖載入後模糊淡出變清晰。' },
])
