import { defineConfig } from 'vite'
import { items, collections } from './src/data/index.js'

const SITE = 'https://ui.fearnot.tw/'
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

// 建置時把資料寫進 HTML：JSON-LD 結構化資料 + 給爬蟲 / 無 JS 環境看的靜態內容
function seo() {
  return {
    name: 'ui-db-seo',
    transformIndexHtml(html) {
      const ld = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebSite', name: 'UI-db', url: SITE, inLanguage: 'zh-Hant' },
          ...collections.map((c) => ({
            '@type': 'ItemList',
            name: `${c.title}（${c.en}）`,
            url: SITE,
            numberOfItems: items.filter((it) => it.collection === c.id).length,
            itemListElement: items
              .filter((it) => it.collection === c.id)
              .map((it, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: `${it.zh}（${it.en}）`,
                description: it.desc,
                url: `${SITE}#${it.id}`,
              })),
          })),
        ],
      }
      const list = collections
        .map((c) => {
          const lis = items
            .filter((it) => it.collection === c.id)
            .map((it) => `<li><a href="#${it.id}">${esc(it.zh)}（${esc(it.en)}）</a>：${esc(it.desc)}。${esc(it.prompt)}</li>`)
            .join('')
          return `<section><h2>${esc(c.title)}（${esc(c.en)}）</h2><p>${esc(c.note)} 來源：<a href="${c.source}">${esc(c.author)}</a></p><ol>${lis}</ol></section>`
        })
        .join('')
      return html
        .replace('</head>', `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`)
        .replace(
          '<div id="app"></div>',
          `<div id="app"><div class="seo-fallback"><h1>UI-db｜UI 效果與工具資料庫</h1>${list}</div></div>`
        )
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [seo()],
})
