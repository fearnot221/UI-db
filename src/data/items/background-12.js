// 背景效果 12 招 — UI-db 自行整理
import { defineItems } from './define.js'

export default defineItems('bg', 'background-12', [
  { no: 1, group: 'gradient', zh: '極光', en: 'Aurora', desc: '幾團模糊的彩光慢慢飄', tags: ['Hero', '夢幻'],
    prompt: 'Aurora Background：深色底上放 3–4 個大型彩色圓形，加強烈模糊（blur 60px+），各自緩慢漂移與縮放。' },
  { no: 2, group: 'gradient', zh: '網格漸層', en: 'Mesh Gradient', desc: '多個顏色點融在一起流動', tags: ['品牌', 'Stripe'],
    prompt: 'Mesh Gradient：疊加多個 radial-gradient 色點，各自位置緩慢移動，形成柔和交融的網格漸層（像 Stripe 首頁）。' },
  { no: 3, group: 'gradient', zh: '流動漸層', en: 'Animated Gradient', desc: '漸層顏色斜斜地一直流', tags: ['簡單', '活潑'],
    prompt: 'Animated Gradient：多色 linear-gradient 設 400% 大小，持續移動 background-position 讓顏色流動。' },
  { no: 4, group: 'gradient', zh: '錐形光暈', en: 'Conic Glow', desc: '中心一圈彩虹光在旋轉', tags: ['科技', '發光'],
    prompt: 'Conic Glow：中央放一個 conic-gradient 圓並加模糊，持續旋轉，像發光的光環。' },
  { no: 5, group: 'gradient', zh: '聚光燈', en: 'Spotlight', desc: '一束光跟著游標照亮網格', tags: ['游標', '互動'],
    prompt: 'Spotlight Effect：深色網格背景上，以游標位置為中心的 radial-gradient 光圈照亮周圍，遠處保持暗。' },
  { no: 6, group: 'gradient', zh: '顆粒雜訊', en: 'Noise Grain', desc: '漸層上疊一層會跳動的顆粒', tags: ['質感', '復古'],
    prompt: 'Grain / Noise Overlay：在漸層上疊一層 SVG feTurbulence 雜訊（低透明度），用 steps 動畫抖動位置模擬底片顆粒。' },
  { no: 7, group: 'pattern', zh: '點陣網格', en: 'Dot Grid', desc: '整齊的點陣被一道波浪點亮', tags: ['極簡', 'SaaS'],
    prompt: 'Dot Grid Background：radial-gradient 重複排成點陣，上面疊一個移動的圓形遮罩讓局部的點變亮。' },
  { no: 8, group: 'pattern', zh: '透視網格', en: 'Retro Grid', desc: '80 年代的地板網格往前跑', tags: ['Synthwave', '復古'],
    prompt: 'Retro Perspective Grid：網格平面 rotateX 往遠處延伸，持續往鏡頭方向捲動，地平線上有漸層夕陽（Synthwave）。' },
  { no: 9, group: 'pattern', zh: '粒子連線', en: 'Particle Network', desc: '漂浮的點靠近時會連線', tags: ['科技', '資料'],
    prompt: 'Particle Network：canvas 上的粒子隨機漂浮，兩點距離小於門檻時畫出越近越亮的連線（particles.js 風格）。' },
  { no: 10, group: 'pattern', zh: '星空穿越', en: 'Starfield', desc: '星星從中心往外飛，像曲速前進', tags: ['太空', '速度感'],
    prompt: 'Starfield / Warp Speed：canvas 上的星點依 z 深度投影，從中心往外加速飛出並拉出短尾線。' },
  { no: 11, group: 'pattern', zh: '波浪', en: 'Layered Waves', desc: '幾層波浪錯開速度流動', tags: ['海洋', '頁尾'],
    prompt: 'Layered Waves：三層半透明 SVG 波浪疊在底部，各自以不同速度水平移動。' },
  { no: 12, group: 'pattern', zh: '數位雨', en: 'Matrix Rain', desc: '綠色字元一行行往下掉', tags: ['駭客', '科幻'],
    prompt: 'Matrix Digital Rain：canvas 每一欄有字元往下掉，前端最亮、後方拖著漸淡的尾巴（駭客任務）。' },
])
