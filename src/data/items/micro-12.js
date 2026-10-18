// 按鈕與微互動 12 招 — UI-db 自行整理
import { defineItems } from './define.js'

export default defineItems('mi', 'micro-12', [
  { no: 1, group: 'button', zh: '漣漪按鈕', en: 'Ripple Button', desc: '點下去，圓形波紋從手指位置擴散', tags: ['Material', '點擊'],
    prompt: 'Ripple Effect：點擊按鈕時，在點擊座標生成一個圓形，從 0 放大到覆蓋整顆按鈕並淡出（overflow: hidden）。' },
  { no: 2, group: 'button', zh: '磁吸按鈕', en: 'Magnetic Button', desc: '游標靠近，按鈕被吸過去', tags: ['游標', '趣味'],
    prompt: 'Magnetic Button：游標進入按鈕周圍範圍時，按鈕依游標與中心的距離往游標方向位移（約 30%），離開時彈回原位。' },
  { no: 3, group: 'button', zh: '掃光按鈕', en: 'Shimmer Button', desc: '一道光定時從按鈕上掃過', tags: ['CTA', '吸睛'],
    prompt: 'Shimmer Button：按鈕上有一條傾斜的半透明白色漸層，定時從左到右掃過，吸引點擊。' },
  { no: 4, group: 'button', zh: '流光邊框', en: 'Glow Border', desc: '彩色光沿著邊框一直繞', tags: ['科技', 'AI'],
    prompt: 'Animated Glow Border：用旋轉的 conic-gradient 當邊框，外層再疊一層模糊光暈，光沿著按鈕外框繞圈。' },
  { no: 5, group: 'button', zh: '按壓回彈', en: 'Press Squish', desc: '按下縮一點，放開彈回來', tags: ['手感', '行動裝置'],
    prompt: 'Press Squish / Tactile Press：按下時按鈕 scale(0.94) 並縮小陰影，放開時用彈簧曲線回到 1。' },
  { no: 6, group: 'button', zh: '填滿按鈕', en: 'Hover Fill', desc: '滑過時顏色從一側填滿', tags: ['Hover', '極簡'],
    prompt: 'Hover Fill：空心按鈕在 hover 時，背景色塊從左側 scaleX(0→1) 填滿，文字顏色同步反轉。' },
  { no: 7, group: 'feedback', zh: '愛心爆開', en: 'Like Burst', desc: '按讚時愛心彈起、周圍噴出小點', tags: ['社群', '喜悅'],
    prompt: 'Like Burst：點愛心時圖示縮小再彈大並變紅，周圍一圈小圓點向外噴出後消失（像 Twitter 按讚）。' },
  { no: 8, group: 'feedback', zh: '開關切換', en: 'Toggle Switch', desc: '圓鈕滑過去時會被拉長', tags: ['設定', '表單'],
    prompt: 'Toggle Switch：開關切換時圓鈕滑到另一側，移動中寬度拉長像果凍，底色在灰與主色間過渡。' },
  { no: 9, group: 'feedback', zh: '勾選繪製', en: 'Checkbox Draw', desc: '勾勾像用筆畫出來', tags: ['表單', '待辦'],
    prompt: 'Animated Checkbox：勾選時方框填色，勾號用 SVG stroke-dashoffset 從 0 畫到完整。' },
  { no: 10, group: 'feedback', zh: '複製成功', en: 'Copy Feedback', desc: '複製圖示變成打勾，跳出提示', tags: ['開發者', '確認'],
    prompt: 'Copy to Clipboard Feedback：點複製後圖示交叉淡換成打勾，上方彈出「已複製」小提示，2 秒後還原。' },
  { no: 11, group: 'feedback', zh: '錯誤搖晃', en: 'Shake Error', desc: '輸入錯誤時欄位左右搖頭', tags: ['表單', '錯誤'],
    prompt: 'Shake on Error：送出錯誤時輸入框左右快速搖晃 3 次，邊框變紅並在下方淡入錯誤訊息。' },
  { no: 12, group: 'feedback', zh: '通知滑入', en: 'Toast Slide', desc: '通知從下方滑入，倒數後離開', tags: ['通知', '系統'],
    prompt: 'Toast Notification：通知從畫面下方滑入並帶彈性，底部進度條倒數縮短，時間到滑出消失。' },
])
