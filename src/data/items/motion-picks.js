// 動態精選 12 招：技法發現自 Motion Library，說明、提示詞與 demo 皆為 UI-db 自行撰寫
import { defineItems } from './define.js'

export default defineItems('mp', 'motion-picks', [
  { no: 1, group: 'mp-visual', zh: '黏融色球', en: 'Metaballs', desc: '圓球靠近時像液體黏在一起', tags: ['背景', '有機'],
    prompt: 'Metaballs：多個圓形漂移，父層加 blur 與高對比濾鏡，讓相近的圓邊緣融合成一團。' },
  { no: 2, group: 'mp-visual', zh: '彩紙噴發', en: 'Confetti Burst', desc: '慶祝時彩色紙片往上噴再飄落', tags: ['慶祝', '完成'],
    prompt: 'Confetti Burst：從一點朝上方隨機角度射出彩色小方片，受重力下墜並持續旋轉，落出畫面後移除。' },
  { no: 3, group: 'mp-visual', zh: '緩慢推鏡', en: 'Ken Burns', desc: '靜態畫面緩慢放大並平移', tags: ['圖片', '敘事'],
    prompt: 'Ken Burns Effect：圖片在 overflow hidden 的框內以 8 秒以上緩慢放大 15% 並微幅平移。' },
  { no: 4, group: 'mp-visual', zh: '霓虹燈管', en: 'Neon Flicker', desc: '招牌通電般不規則閃動', tags: ['標題', '夜晚'],
    prompt: 'Neon Flicker：文字用多層同色 text-shadow 發光，關鍵影格不規則切換亮暗，模擬燈管接觸不良。' },
  { no: 5, group: 'mp-visual', zh: '全息卡', en: 'Holographic Card', desc: '卡面彩虹反光隨傾斜移動', tags: ['卡片', '收藏'],
    prompt: 'Holographic Card：卡片做 3D 傾斜，疊一層彩虹 linear-gradient 用 color-dodge 混合，光帶位置隨傾斜角度移動。' },
  { no: 6, group: 'mp-visual', zh: '螞蟻線', en: 'Marching Ants', desc: '虛線選取框沿邊緣不停爬行', tags: ['編輯器', '選取'],
    prompt: 'Marching Ants：SVG 矩形設 stroke-dasharray，以 linear 無限動畫改變 stroke-dashoffset。' },
  { no: 7, group: 'mp-ui', zh: 'Dock 放大', en: 'Dock Magnify', desc: '游標附近的圖示依距離變大', tags: ['導覽', 'macOS'],
    prompt: 'Dock Magnification：計算每個圖示與游標的水平距離，距離越近 scale 越大，並以底部為基準放大。' },
  { no: 8, group: 'mp-ui', zh: '滾字按鈕', en: 'Rolling Text Button', desc: '文字往上滾，同一句從下方接上', tags: ['按鈕', 'Hover'],
    prompt: 'Rolling Text Button：按鈕內上下疊兩行相同文字，hover 時整組 translateY(-50%)，外層 overflow hidden。' },
  { no: 9, group: 'mp-ui', zh: '前後對比', en: 'Before After Slider', desc: '拖動分隔線比較兩張圖', tags: ['圖片', '比較'],
    prompt: 'Before/After Slider：兩張圖重疊，上層用 clip-path inset 依拖曳位置裁切，分隔線跟著移動。' },
  { no: 10, group: 'mp-ui', zh: '浮動標籤', en: 'Floating Label', desc: '聚焦時提示文字縮小移到上方', tags: ['表單', '輸入'],
    prompt: 'Floating Label：label 疊在輸入框內，聚焦或有值時縮小並上移到邊框位置，可用 :placeholder-shown 判斷。' },
  { no: 11, group: 'mp-ui', zh: '星級評分', en: 'Star Rating', desc: '星星依序點亮並輕彈一下', tags: ['表單', '回饋'],
    prompt: 'Star Rating：點選第 N 顆時，前 N 顆依序變色並做一次 scale 彈跳，每顆延遲 60ms。' },
  { no: 12, group: 'mp-ui', zh: '分段控制器', en: 'Segmented Control', desc: '底色滑塊滑到選中的項目', tags: ['切換', 'iOS'],
    prompt: 'Segmented Control：一個絕對定位的滑塊依選中索引 translateX，文字顏色同步過渡。' },
])
