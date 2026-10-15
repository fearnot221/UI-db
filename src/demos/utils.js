// demo 共用小工具。每個 demo 的 run(el) 回傳一個 cleanup 函式。

export const chars = (s, cls = '') =>
  [...s].map((c, i) => `<span class="${cls}" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('')

// 立即執行一次，之後每 ms 執行一次
export function every(ms, fn) {
  let n = 0
  fn(n++)
  const id = setInterval(() => fn(n++), ms)
  return () => clearInterval(id)
}

export function frames(fn) {
  let id
  const start = performance.now()
  const tick = (now) => {
    fn(now - start)
    id = requestAnimationFrame(tick)
  }
  id = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(id)
}

// 重新觸發 CSS 動畫
export function replay(node, cls) {
  node.classList.remove(cls)
  void node.offsetWidth
  node.classList.add(cls)
}

// 收集多個 timer / cleanup，一次清掉
export function bag() {
  const fns = []
  return {
    add(fn) { fns.push(fn); return fn },
    timeout(fn, ms) { const id = setTimeout(fn, ms); fns.push(() => clearTimeout(id)) },
    clear() { fns.splice(0).forEach((f) => f()) },
  }
}

// 無限捲動帶：內容重複兩次，track 位移 -50%
export const marquee = (text, { dur = 10, reverse = false, cls = '' } = {}) =>
  `<div class="tm-mq ${cls}"><div class="tm-mq-track" style="--dur:${dur}s;animation-direction:${reverse ? 'reverse' : 'normal'}"><span>${text}</span><span>${text}</span></div></div>`

export const vmarquee = (text, { dur = 10, reverse = false, cls = '' } = {}) =>
  `<div class="tm-vmq ${cls}"><div class="tm-vmq-track" style="--dur:${dur}s;animation-direction:${reverse ? 'reverse' : 'normal'}"><span>${text}</span><span>${text}</span></div></div>`

export const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]
