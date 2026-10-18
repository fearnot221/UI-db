// 捲動效果 12 招 — UI-db 自行整理
import { defineItems } from './define.js'

export default defineItems('sc', 'scroll-12', [
  { no: 1, group: 'trigger', zh: '淡入上移', en: 'Fade Up', desc: '滾進畫面時從下方淡入', tags: ['通用', '區塊'],
    prompt: 'Fade Up on Scroll：元素進入視窗（IntersectionObserver）時從 translateY(24px)、透明度 0 過渡到原位。' },
  { no: 2, group: 'trigger', zh: '交錯進場', en: 'Stagger Reveal', desc: '一排卡片一張接一張出現', tags: ['網格', '列表'],
    prompt: 'Staggered Reveal：一組卡片進入視窗時依序出現，每張延遲 80ms，形成接力感。' },
  { no: 3, group: 'trigger', zh: '左右滑入', en: 'Slide In', desc: '內容輪流從左邊、右邊滑進來', tags: ['時間軸', '敘事'],
    prompt: 'Alternating Slide In：時間軸項目進入視窗時，奇數從左、偶數從右滑入並淡入。' },
  { no: 4, group: 'trigger', zh: '縮放進場', en: 'Scale In', desc: '從小放大到原尺寸', tags: ['圖片', '強調'],
    prompt: 'Scale In on Scroll：元素進入視窗時從 scale(0.8)、透明度 0 彈性放大到 1。' },
  { no: 5, group: 'trigger', zh: '逐行浮現', en: 'Line Reveal', desc: '標題每一行從遮罩下方升起', tags: ['標題', '編輯風'],
    prompt: 'Line Reveal / Mask Reveal：標題每一行包在 overflow: hidden 裡，進入視窗時文字從 translateY(100%) 依序升起。' },
  { no: 6, group: 'trigger', zh: '數字滾動', en: 'Count Up', desc: '數字滾進畫面才開始往上數', tags: ['數據', '成就'],
    prompt: 'Count Up on Scroll：統計數字進入視窗時才從 0 用 ease-out 累加到目標值。' },
  { no: 7, group: 'linked', zh: '閱讀進度條', en: 'Reading Progress', desc: '頂部細線跟著捲動長長', tags: ['文章', '部落格'],
    prompt: 'Scroll Progress Bar：頁面頂部細條寬度 = 已捲動距離 ÷ 可捲動總長，捲回去會縮短。' },
  { no: 8, group: 'linked', zh: '視差捲動', en: 'Parallax', desc: '遠景慢、近景快，產生深度', tags: ['Hero', '景深'],
    prompt: 'Parallax Scrolling：背景、中景、前景各自以不同比例（如 0.2、0.5、1）跟著捲動位移，產生深度。' },
  { no: 9, group: 'linked', zh: '堆疊卡片', en: 'Sticky Stack', desc: '卡片黏在頂端一張疊一張', tags: ['作品集', '功能介紹'],
    prompt: 'Sticky Card Stack：每張卡片 position: sticky、top 依序遞增，捲動時後一張蓋上前一張，前一張微微縮小變暗。' },
  { no: 10, group: 'linked', zh: '橫向捲動', en: 'Horizontal Scroll', desc: '往下捲，內容卻往旁邊走', tags: ['作品集', '展示'],
    prompt: 'Horizontal Scroll Section：區塊固定（sticky）在畫面中，垂直捲動進度轉換成內部橫列的 translateX。' },
  { no: 11, group: 'linked', zh: '捲動填色字', en: 'Scroll Text Fill', desc: '捲動時文字一個字一個字亮起', tags: ['敘事', 'Apple'],
    prompt: 'Scroll-linked Text Highlight：段落文字先是淡灰色，依捲動進度逐字變成實色（像 Apple 產品頁）。' },
  { no: 12, group: 'linked', zh: '縮小導覽列', en: 'Shrinking Header', desc: '往下捲時導覽列變矮、加陰影', tags: ['導覽', '通用'],
    prompt: 'Shrinking Sticky Header：捲動超過門檻後，sticky 導覽列高度與 Logo 縮小、背景變半透明模糊並加陰影。' },
])
