// 文字動態 40 招 — 來源：Threads @ai_tjb
// 欄位：
//   no      編號
//   zh / en 中文名 / 英文原名（寫進提示詞的關鍵）
//   desc    一句話說明（原影片字卡）
//   tags    適用情境（原影片標籤）
//   prompt  可直接貼給 AI 的描述
//   demo    對應 src/demos/text-motion/ 裡的 demo key

const C = 'text-motion-40'

export default [
  // ── IMPACT 衝擊 ─────────────────────────────
  { no: 1, group: 'impact', zh: '文字爆開', en: 'Word Burst', desc: '單字咚一聲彈出來', tags: ['強調', '亮點'],
    prompt: 'Word Burst：單字從 0 放大到 120% 再回彈到 100%（彈性 overshoot），同時四周放射出短線條爆開後消失。' },
  { no: 2, group: 'impact', zh: '逐字敲擊', en: 'Letter Sequence', desc: '一個字一個字砸上來', tags: ['節奏', '歌詞'],
    prompt: 'Letter Sequence：一次只出現一個字，每個字從 200% 縮到 100% 砸在畫面中央，配合節拍依序替換。' },
  { no: 3, group: 'impact', zh: '印章', en: 'Text Stamp', desc: '像蓋章一樣一個個蓋上去', tags: ['公告', '決定'],
    prompt: 'Text Stamp：文字帶外框，從 300% 大小、微微旋轉快速壓下到 100%，落地瞬間畫面輕微震動，像蓋章。' },
  { no: 4, group: 'impact', zh: '衝擊放大', en: 'Punch Zoom', desc: '從深處飛出、後面拖著殘影', tags: ['開場', '強調'],
    prompt: 'Punch Zoom：文字從畫面深處（scale 0 + 模糊）高速衝到前景，後方拖著數層半透明殘影。' },
  { no: 5, group: 'impact', zh: '動態堆疊', en: 'Kinetic Stack', desc: '詞一個個飛進來疊起來', tags: ['MV', '歌詞'],
    prompt: 'Kinetic Stack / Kinetic Typography：每個詞從不同方向快速飛入，一行一行往上堆疊成一個文字區塊。' },
  { no: 6, group: 'impact', zh: '伸縮字', en: 'Stretch Text', desc: '文字上下拉長再縮回', tags: ['俏皮', '衝擊'],
    prompt: 'Stretch Text：文字以底部為基準，scaleY 拉長到 2 倍再彈回，帶有彈性 easing。' },
  { no: 7, group: 'impact', zh: '穿越放大', en: 'Text Zoom Through', desc: '衝進字裡，接到下一個詞', tags: ['轉場', '速度感'],
    prompt: 'Text Zoom Through：鏡頭往文字筆畫裡衝，文字放大到填滿畫面成為轉場，接著出現下一個詞。' },
  { no: 8, group: 'impact', zh: '擠壓彈跳', en: 'Text Squeeze', desc: '像橡皮一樣壓扁再換字', tags: ['彈性', '切換'],
    prompt: 'Text Squeeze / Squash & Stretch：文字像橡皮被壓扁（scaleX 1.4、scaleY 0.5），彈起時換成下一個字。' },

  // ── FLOW 流動 ───────────────────────────────
  { no: 9, group: 'flow', zh: '巨字滑過', en: 'Huge Text Scroll', desc: '超大字一快一慢橫越畫面', tags: ['背景', '標題'],
    prompt: 'Huge Text Scroll：超大字級的文字橫向無限捲動，下方再疊一條小字反向、不同速度的跑馬燈。' },
  { no: 10, group: 'flow', zh: '直書逆走', en: 'Vertical Typography', desc: '直排文字往反方向流', tags: ['東方', '靜與動'],
    prompt: 'Vertical Typography：數欄直排文字（writing-mode: vertical-rl），相鄰欄位一上一下反方向無限流動。' },
  { no: 11, group: 'flow', zh: '重複波浪', en: 'Repeating Text', desc: '同一個詞排滿，波浪式變色', tags: ['背景', '圖騰'],
    prompt: 'Repeating Text：同一個詞排滿整個畫面成網格，顏色依位置延遲變化，形成斜向波浪掃過。' },
  { no: 12, group: 'flow', zh: '斜線帶', en: 'Diagonal Text Bands', desc: '斜斜的帶子，文字反向跑', tags: ['轉場', '街頭'],
    prompt: 'Diagonal Text Bands：兩條傾斜的色帶交錯，帶子裡的文字以相反方向無限捲動。' },
  { no: 13, group: 'flow', zh: '緞帶', en: 'Text Ribbon', desc: '文字沿著波浪線流動', tags: ['裝飾', '配樂感'],
    prompt: 'Text Ribbon / Text on Path：文字沿著 S 形波浪曲線（SVG textPath）流動，像飄動的緞帶。' },
  { no: 14, group: 'flow', zh: '跑馬燈', en: 'Marquee', desc: '字體、速度不同的帶子疊在一起', tags: ['公告', '街頭'],
    prompt: 'Marquee：多條跑馬燈上下疊放，每條字體、字重、速度與方向都不同。' },
  { no: 15, group: 'flow', zh: '直書三層', en: 'Parallax Columns', desc: '三層直排文字一起流動', tags: ['意境', '東方'],
    prompt: 'Parallax Columns：前中後三層直排文字，越遠越小越淡、流動越慢，形成視差景深。' },
  { no: 16, group: 'flow', zh: '封鎖膠帶', en: 'Tape Cross', desc: '寫著字的膠帶交叉成 X', tags: ['警告', '街頭'],
    prompt: 'Tape Cross / Caution Tape：兩條印字的黃黑封鎖膠帶交叉成 X，文字在膠帶上反向捲動。' },

  // ── DEPTH 景深 ──────────────────────────────
  { no: 17, group: 'depth', zh: '文字隧道', en: 'Text Tunnel', desc: '從文字中間穿過去', tags: ['開場', '科幻'],
    prompt: 'Text Tunnel：同一個詞多層同心排列，由小到大不斷往鏡頭放大並淡出，像穿過文字構成的隧道。' },
  { no: 18, group: 'depth', zh: '文字走廊', en: 'Text Corridor', desc: '地板牆壁都是字，一路往前', tags: ['沉浸', 'MV'],
    prompt: 'Text Corridor：用 3D perspective 建立地板、天花板、左右牆，四面都鋪滿文字並持續朝鏡頭移動。' },
  { no: 19, group: 'depth', zh: '圓柱', en: 'Text Cylinder', desc: '文字圓柱反向旋轉', tags: ['立體', 'Logo'],
    prompt: 'Text Cylinder：文字排在 3D 圓柱表面繞軸旋轉，相鄰圓柱方向相反。' },
  { no: 20, group: 'depth', zh: '漩渦', en: 'Text Vortex', desc: '文字扭轉捲成漩渦', tags: ['奇幻', '亮點'],
    prompt: 'Text Vortex / Twist：文字切成多條橫向切片，每片旋轉角度遞增，整體扭轉成漩渦再還原。' },
  { no: 21, group: 'depth', zh: '圓環隧道', en: 'Ring Text Tunnel', desc: '一圈圈文字撲面而來', tags: ['開場', '科幻'],
    prompt: 'Ring Text Tunnel：文字排成一圈圈圓環，從中心向外放大撲面而來，同時緩慢旋轉。' },
  { no: 22, group: 'depth', zh: '軌道', en: 'Text Orbit', desc: '單字帶著景深繞圈', tags: ['Logo', '標題'],
    prompt: 'Text Orbit：主標題置中，一圈小字沿傾斜的 3D 橢圓軌道環繞，轉到後方時被主標題遮住。' },
  { no: 23, group: 'depth', zh: '方塊', en: 'Text Cube', desc: '四面寫字的方塊直向翻轉', tags: ['切換', '立體'],
    prompt: 'Text Cube：3D 立方體四個面各寫一個字，沿 X 軸每次翻轉 90 度切換到下一面。' },
  { no: 24, group: 'depth', zh: '立體字', en: 'Extrude Text', desc: '立體字的厚度方向轉一圈', tags: ['標題'],
    prompt: 'Extrude Text：用多層疊加做出有厚度的 3D 擠出文字，沿 Y 軸旋轉一圈展示側面厚度。' },

  // ── SWITCH 切換 ─────────────────────────────
  { no: 25, group: 'switch', zh: '翻牌', en: 'Split Flap', desc: '像車站時刻表一樣翻到定位', tags: ['復古', '車站'],
    prompt: 'Split Flap Display：每個字在上下兩半的翻牌格裡，快速翻過數個隨機字元後依序停在目標字，像車站時刻表。' },
  { no: 26, group: 'switch', zh: '翻卡', en: 'Flip Cards', desc: '一張張翻面換字', tags: ['切換', '公告'],
    prompt: 'Flip Cards：每個字是一張卡片，依序沿 Y 軸翻轉 180 度，背面是新的字。' },
  { no: 27, group: 'switch', zh: '打字機', en: 'Typewriter', desc: '一個字一個字打出來再換掉', tags: ['故事', '字幕'],
    prompt: 'Typewriter Effect：文字逐字打出，尾端有閃爍游標，打完停頓後逐字刪除，再打下一句。' },
  { no: 28, group: 'switch', zh: '拉霸', en: 'Slot Text', desc: '滾輪轉一轉停下來', tags: ['結果揭曉'],
    prompt: 'Slot Machine Text：每個字是一個拉霸滾輪，垂直快速滾動後由左到右依序減速停在結果。' },
  { no: 29, group: 'switch', zh: '計數器', en: 'Odometer', desc: '數字滾動往上加', tags: ['成績', '數字'],
    prompt: 'Odometer / Rolling Number：數字每一位是垂直滾動的數字帶，從 0 滾動累加到目標數值。' },
  { no: 30, group: 'switch', zh: '標題切換', en: 'Headline Swap', desc: '新聞標題一個換一個', tags: ['快訊', '解說'],
    prompt: 'Headline Swap / News Ticker Swap：左側固定標籤（快訊），右側標題框以色塊擦除（wipe）方式換成下一則。' },
  { no: 31, group: 'switch', zh: 'LED 看板', en: 'LED Text', desc: '點點組成的電子字', tags: ['復古', '科技'],
    prompt: 'LED Dot Matrix Text：文字由發光圓點陣列組成，像電子看板一樣橫向捲動。' },
  { no: 32, group: 'switch', zh: '上下裂開', en: 'Split Halves', desc: '字裂開，露出另一個詞', tags: ['轉場', '反差'],
    prompt: 'Split Halves：文字沿水平中線裂成上下兩半往外分開，露出後方的另一個詞。' },

  // ── STYLE 風格 ──────────────────────────────
  { no: 33, group: 'style', zh: '空心字', en: 'Outline Text', desc: '空心字一行一行填上顏色', tags: ['質感', 'MV'],
    prompt: 'Outline Text：多行重複的空心描邊字（text-stroke），一行接一行被實心色填滿。' },
  { no: 34, group: 'style', zh: '故障切片', en: 'Glitch Slices', desc: '大字被切成好幾條錯開', tags: ['衝擊', 'MV'],
    prompt: 'Glitch Slices：大字被切成數條水平切片，不規則地左右錯開並帶 RGB 色偏，短暫閃爍後復原。' },
  { no: 35, group: 'style', zh: '圖案遮罩', en: 'Text Mask Pattern', desc: '文字變成窗，條紋從裡面流過', tags: ['俏皮', '祭典'],
    prompt: 'Text Mask Pattern：文字當作遮罩（background-clip: text），裡面的斜條紋圖案持續流動。' },
  { no: 36, group: 'style', zh: '長陰影', en: 'Long Shadow', desc: '長長的影子轉一圈', tags: ['扁平風'],
    prompt: 'Long Shadow：扁平風長陰影從文字延伸出去，陰影方向繞文字旋轉一圈。' },
  { no: 37, group: 'style', zh: '液體填滿', en: 'Liquid Fill', desc: '空心字被液體慢慢裝滿', tags: ['療癒', 'MV'],
    prompt: 'Liquid Fill：空心字內部有帶波浪的液面，水位慢慢上升直到填滿文字。' },
  { no: 38, group: 'style', zh: '螢光筆', en: 'Highlight Text', desc: '螢光筆從字後面劃過', tags: ['強調', '解說'],
    prompt: 'Highlight Text / Marker Highlight：螢光筆色塊從左到右在文字後方劃過（scaleX 0→1）。' },
  { no: 39, group: 'style', zh: '雙色反轉', en: 'Split Invert', desc: '斜線分界，兩色互換', tags: ['切換', '標題'],
    prompt: 'Split Invert：一條斜線分界掃過畫面，分界兩側的底色與文字色互相反轉。' },
  { no: 40, group: 'style', zh: '殘影', en: 'Text Echo', desc: '字後面拖著一串殘影', tags: ['漂浮', 'MV'],
    prompt: 'Text Echo / Motion Trail：文字移動時後方拖著多層延遲、漸淡、帶模糊的殘影。' },
].map((item) => ({
  ...item,
  id: `tm-${String(item.no).padStart(2, '0')}`,
  collection: C,
  demo: item.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
}))
