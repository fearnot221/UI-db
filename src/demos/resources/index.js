// 參考網站的示意卡：不是原站畫面
import './resources.css'
import { frames } from '../utils.js'

const filters = ['文字', '按鈕', '卡片', '圖片', '背景', '遊戲']

export default {
  'motion-library': {
    bg: 'dark',
    run(el) {
      el.innerHTML = `<div class="rs-site"><b>0</b><small>Motion Library</small><div>${filters
        .map((f, i) => `<span style="--i:${i}">${f}</span>`)
        .join('')}</div></div>`
      const n = el.querySelector('b')
      return frames((t) => {
        const k = Math.min(1, (t % 5000) / 1500)
        n.textContent = Math.round(331 * (1 - (1 - k) ** 3))
      })
    },
  },
}
