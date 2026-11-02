// Motion Library 索引：只存名稱、分類與連結；描述、提示詞與預覽都在原站
// 格式：編號|中文名|英文名|時機|情境|技術
import { defineItems } from './define.js'

const SITE = 'https://kittenjam-motion-library.vercel.app'

const raw = {
  'ml-text': `1|閃電砸落|Lightning Strike|進場|標題・Hero|CSS
2|雷射切斷|Laser Cut|退場|轉場切換|CSS
3|硬幣翻轉|Coin Flip|循環待機|強調重點|CSS
4|爆炸四散|Explode Out|退場|轉場切換|CSS
5|粒子消散|Disintegrate|退場|轉場切換|CSS
6|心跳放大|Heartbeat Zoom|循環待機|強調重點|CSS
7|文字萬花筒|Text Kaleido|循環待機|背景裝飾|CSS
8|倒數砸落|Number Slam|進場|數字資訊|CSS
9|波浪文字|Wave Letters|循環待機|標題・Hero|CSS
10|定格晃動|Stop Motion|循環待機|強調重點|CSS
12|放大鏡|Magnifier Lens|循環待機|強調重點|CSS
13|亂碼解讀|Scramble Decode|進場|標題・Hero|CSS
14|骨牌倒下|Domino Letters|退場|強調重點|CSS
15|漸層流動|Gradient Flow|循環待機|標題・Hero|CSS
16|圓環文字|Circle Text|循環待機|Logo・品牌|CSS
17|水面倒影|Water Reflection|循環待機|標題・Hero|CSS
18|逐字彈跳|Letter Bounce|循環待機|標題・Hero|CSS
19|文字旗幟|Text Flag|循環待機|強調重點|CSS
20|重力反轉|Gravity Flip|循環待機|轉場切換|CSS
21|磁鐵吸附|Magnet Pull|進場|Logo・品牌|CSS
23|字重變粗|Weight Grow|循環待機|強調重點|CSS
24|文字扇|Text Fan|進場|Logo・品牌|CSS
25|卡拉OK小球|Karaoke Ball|循環待機|強調重點|CSS
26|鐘擺搖晃|Swing Letters|循環待機|Logo・品牌|CSS
27|像素溶解|Pixel Dissolve|退場|轉場切換|CSS
28|圓環換字|Rotating Words|切換|數字資訊|CSS
29|殘影疾走|Blur Trail|進場|轉場切換|CSS
31|∞ 軌道|Roller Path|循環待機|背景裝飾|CSS
32|洗牌重排|Shuffle Letters|循環待機|標題・Hero|CSS
33|文字漩渦|Text Spiral|循環待機|背景裝飾|CSS
34|顫抖穩定|Jitter Settle|循環待機|強調重點|CSS
35|彈性拉伸|Elastic Wave Stretch|循環待機|標題・Hero|CSS
36|墨水暈開|Ink Bleed|進場|標題・Hero|CSS
37|文字聚集|Letter Assemble|進場|標題・Hero|CSS
38|字體樣本|Text Mosaic|循環待機|背景裝飾|CSS
39|崩落|Crumble Down|退場|轉場切換|CSS
40|漂浮|Float Drift|循環待機|背景裝飾|CSS
41|文字爆開|Word Burst|進場|強調重點|CSS
42|逐字敲擊|Letter Sequence|進場|標題・Hero|CSS
43|印章|Text Stamp|進場|強調重點|CSS
44|衝擊放大|Punch Zoom|進場|標題・Hero|CSS
45|動態堆疊|Kinetic Stack|進場|標題・Hero|CSS
46|穿越放大|Text Zoom Through|切換|轉場切換|CSS
47|擠壓彈跳|Text Squeeze|切換|強調重點|CSS
55|文字隧道|Text Tunnel|循環待機|轉場切換|CSS
57|圓柱|Text Cylinder|循環待機|Logo・品牌|CSS
58|圓環隧道|Ring Text Tunnel|循環待機|轉場切換|CSS
59|軌道|Text Orbit|循環待機|Logo・品牌|CSS
60|方塊|Text Cube|切換|轉場切換|CSS
61|立體字|Extrude Text|循環待機|Logo・品牌|CSS
62|翻牌|Split Flap|切換|數字資訊|CSS
63|翻卡|Flip Cards|切換|轉場切換|CSS
64|打字機|Typewriter|切換|標題・Hero|CSS
65|拉霸|Slot Text|切換|數字資訊|CSS
66|計數器|Odometer|切換|數字資訊|CSS
67|標題切換|Headline Swap|切換|數字資訊|CSS
68|LED 看板|LED Text|循環待機|數字資訊|CSS
70|故障切片|Glitch Slices|退場|強調重點|CSS
71|圖案遮罩|Text Mask Pattern|循環待機|標題・Hero|CSS
72|長陰影|Long Shadow|循環待機|Logo・品牌|CSS
73|液體填滿|Liquid Fill|循環待機|強調重點|CSS
74|螢光筆|Highlight Text|進場|強調重點|CSS
75|斜線反轉|Split Invert|切換|轉場切換|CSS
76|逐字升起|Split Rise|進場|標題・Hero|GSAP
77|亂碼揭示|Scramble Reveal|進場|標題・Hero|GSAP
78|打字換句|Typing Swap|切換|標題・Hero|GSAP
79|彈性落下|Elastic Drop|進場|標題・Hero|GSAP
80|3D 翻字|3D Char Flip|進場|轉場切換|GSAP
81|隨機散聚|Random Scatter|進場|標題・Hero|GSAP
83|遮罩換詞|Word Rotator|切換|標題・Hero|GSAP
84|數字累加|Number Counter|進場|數字資訊|GSAP
85|磁力文字|Magnetic Letters|懸停・點擊|介面互動|GSAP
86|逐行揭示|Line Reveal|進場|標題・Hero|GSAP
87|壓扁彈跳|Squash Bounce|進場|強調重點|GSAP
126|逐行淡入|Soft Line Fade|進場|標題・Hero|GSAP
152|捲動逐字點亮|Scroll Text Reveal|捲動觸發|標題・Hero|GSAP
159|捲動橫移大字|Scroll Marquee Text|捲動觸發|背景裝飾|GSAP
162|連結底線滑入|Underline Slide Link|懸停・點擊|介面互動|CSS
163|空心字填滿|Outline Text Fill|懸停・點擊|標題・Hero|CSS
170|逐字跳動|Letter Hover Bounce|懸停・點擊|標題・Hero|CSS
177|文字粒子化|Particle Text|懸停・點擊|標題・Hero|Canvas
182|呼吸|Breathe|循環待機|強調重點|CSS
183|漂移|Drift|進場|標題・Hero|CSS
185|翻滾|Tumble|進場|標題・Hero|CSS
186|霓虹閃爍|Neon Flicker|循環待機|標題・Hero|CSS
188|合併|Merge|進場|標題・Hero|CSS
189|展開|Spread|進場|標題・Hero|CSS
190|滑行|Skate|進場|標題・Hero|CSS
272|穿越大字轉場|Zoom Through Text|捲動觸發|捲動效果|GSAP
274|散落文字聚合|Scattered Assemble|捲動觸發|捲動效果|GSAP
277|模糊對焦|Blur to Focus|捲動觸發|捲動效果|GSAP
278|沿曲線跑的文字|Text Along Path|捲動觸發|捲動效果|GSAP
280|上下切開文字|Split Text Hover|懸停・點擊|標題・Hero|CSS
281|字距展開|Letter Spacing Expand|懸停・點擊|介面互動|CSS
286|螢光筆劃記|Highlighter Hover|懸停・點擊|強調重點|CSS
288|連結預覽卡|Link Preview Popover|懸停・點擊|介面互動|CSS
290|手寫描繪|Handwriting Draw|進場|標題・Hero|GSAP
291|字重波浪|Weight Wave|循環待機|標題・Hero|CSS
292|光源投影字|Light Source Shadow|懸停・點擊|標題・Hero|CSS
293|圖片填字|Image Filled Text|循環待機|標題・Hero|CSS
294|逐字模糊浮現|Blur In Letters|進場|標題・Hero|GSAP
295|劃掉改寫|Strike & Rewrite|切換|強調重點|GSAP
296|聊天訊息出現|Chat Message Pop|進場|App 介面|GSAP
297|殘影堆疊|Echo Stack|循環待機|標題・Hero|CSS
298|多語問候切換|Multilingual Greeting|切換|標題・Hero|GSAP
328|重力標籤堆|Gravity Tag Pile|進場|標題・Hero|Canvas`,
  'ml-button': `95|磁吸按鈕|Magnetic Button|懸停・點擊|介面互動|GSAP
102|文字翻滾按鈕|Rolling Text Button|懸停・點擊|介面互動|CSS
103|游標擴散填滿按鈕|Direction-aware Fill Button|懸停・點擊|介面互動|CSS
109|光澤掃過按鈕|Shine Sweep Button|懸停・點擊|介面互動|CSS
110|旋轉光邊按鈕|Rotating Gradient Border|循環待機|介面互動|CSS
111|愛心按讚爆開|Like Burst|懸停・點擊|介面互動|CSS
130|行動按鈕提示|Gentle CTA Cue|進場|強調重點|GSAP
146|按鈕載入成功|Loading Button|懸停・點擊|App 介面|GSAP
166|Dock 放大選單|Dock Magnify|懸停・點擊|介面互動|CSS
171|邊框描繪按鈕|Border Draw Button|懸停・點擊|介面互動|CSS
231|立體按壓按鈕|3D Press Button|懸停・點擊|介面互動|CSS
232|果凍彈跳按鈕|Jelly Button|懸停・點擊|介面互動|CSS
233|按鈕漣漪回饋|Ripple Click|懸停・點擊|介面互動|CSS
234|滑動確認|Slide to Confirm|拖曳手勢|介面互動|GSAP
235|長按確認|Hold to Confirm|懸停・點擊|介面互動|CSS
236|箭頭接力按鈕|Icon Slide Button|懸停・點擊|介面互動|CSS
237|霓虹呼吸按鈕|Neon Glow Button|循環待機|介面互動|CSS
238|複製成功回饋|Copy Feedback|切換|介面互動|CSS
239|展開文字按鈕|Expanding Button|懸停・點擊|介面互動|CSS
240|紙飛機送出|Send Plane Button|懸停・點擊|介面互動|GSAP
285|社群圖示填滿|Social Icon Fill|懸停・點擊|介面互動|CSS`,
  'ml-form': `141|開關切換|Toggle Switch|懸停・點擊|介面互動|CSS
147|數量步進器|Number Stepper|懸停・點擊|App 介面|CSS
148|輸入框浮動標籤|Floating Label Input|懸停・點擊|App 介面|CSS
149|星星評分|Star Rating|懸停・點擊|App 介面|CSS
151|錯誤震動提示|Shake on Error|懸停・點擊|App 介面|CSS
169|提示框彈出|Tooltip Pop|懸停・點擊|介面互動|CSS
241|勾選框打勾|Animated Checkbox|切換|介面互動|CSS
242|分段控制器|Segmented Control|切換|介面互動|CSS
243|密碼強度條|Password Strength|切換|介面互動|CSS
244|滑桿數值氣泡|Range Slider Bubble|拖曳手勢|介面互動|CSS
245|驗證碼輸入|OTP Input|切換|介面互動|CSS
246|展開搜尋框|Expanding Search|切換|介面互動|CSS
247|下拉選單展開|Dropdown Reveal|切換|介面互動|CSS
248|標籤輸入|Tag Input|進場|介面互動|CSS
249|水滴單選|Liquid Radio|切換|介面互動|GSAP
250|拖放上傳|File Drop Upload|拖曳手勢|介面互動|GSAP
289|表格十字高亮|Table Crosshair Highlight|懸停・點擊|數字資訊|CSS`,
  'ml-card': `91|版面重排|Flip Layout|切換|介面互動|GSAP
97|拖曳甩動|Drag & Toss|拖曳手勢|介面互動|GSAP
98|發牌展開|Card Deal|進場|轉場切換|GSAP
104|卡片依序浮現|Staggered Card Reveal|進場|介面互動|GSAP
112|卡片浮起|Hover Lift Card|懸停・點擊|介面互動|CSS
113|光暈邊框卡片|Spotlight Card|懸停・點擊|介面互動|CSS
114|骨架載入|Skeleton Shimmer|循環待機|介面互動|CSS
118|通知堆疊|Toast Stack|進場|介面互動|CSS
129|步驟依序連接|Connected Steps|進場|介面互動|GSAP
132|左右交錯淡入|Zigzag Cascade|進場|介面互動|GSAP
145|滑動刪除|Swipe to Delete|拖曳手勢|App 介面|GSAP
154|黏著堆疊卡片|Sticky Stacking Cards|捲動觸發|介面互動|GSAP
155|數據捲到才計數|Count Up on Scroll|捲動觸發|數字資訊|GSAP
164|卡片 3D 翻面|Flip Card|懸停・點擊|介面互動|CSS
180|刮刮樂揭示|Scratch Reveal|拖曳手勢|介面互動|Canvas
187|剪貼簿|Scrapbook|進場|標題・Hero|CSS
212|焦點卡片輪播|Focus Carousel|切換|介面互動|CSS
213|左右滑卡|Swipe Card Stack|拖曳手勢|介面互動|GSAP
214|疊卡散開|Stack Fan Out|懸停・點擊|介面互動|CSS
215|價格方案切換|Pricing Toggle|切換|數字資訊|GSAP
216|卡片展開詳情|Card Expand Detail|切換|介面互動|GSAP
217|無限捲動卡片牆|Infinite Card Wall|循環待機|背景裝飾|CSS
218|評論輪播|Testimonial Slider|切換|介面互動|GSAP
219|瀑布流依序落下|Masonry Cascade|進場|介面互動|GSAP
220|聚焦淡化其他|Focus Dim Siblings|懸停・點擊|介面互動|CSS
221|加入購物車飛入|Add to Cart Fly|懸停・點擊|介面互動|GSAP
270|捲動翻轉卡片|Scroll Flip Card|捲動觸發|捲動效果|GSAP
276|捲動扇形展開|Scroll Fan Out|捲動觸發|捲動效果|GSAP
284|資訊面板滑上|Card Info Slide Up|懸停・點擊|介面互動|CSS
287|全息閃卡|Holographic Card|懸停・點擊|標題・Hero|CSS
299|拖曳排序清單|Drag to Reorder|拖曳手勢|介面互動|GSAP
300|多選卡片|Selectable Cards|切換|介面互動|CSS
301|邊框聚光網格|Border Spotlight Grid|懸停・點擊|介面互動|CSS
302|3D 環形輪播|3D Ring Carousel|循環待機|標題・Hero|GSAP
303|翻牌配對遊戲|Memory Match|切換|介面互動|CSS
304|數據儀表卡片|Stat Cards|進場|數字資訊|GSAP
305|翻頁書|Page Flip Book|切換|介面互動|GSAP
306|照片堆展開|Stack to Grid|切換|介面互動|GSAP
307|對折邀請卡|Folding Card|切換|介面互動|GSAP
329|掛繩識別證|Lanyard Badge|進場|標題・Hero|Canvas
330|撕貼紙|Sticker Peel|懸停・點擊|強調重點|GSAP`,
  'ml-media': `105|3D 傾斜視差圖片|Tilt Parallax Image|懸停・點擊|介面互動|GSAP
115|圖片遮罩揭示|Image Clip Reveal|進場|轉場切換|CSS
116|前後對比滑桿|Before / After Slider|拖曳手勢|介面互動|CSS
131|柔邊遮罩揭示|Soft Mask Reveal|進場|標題・Hero|GSAP
153|捲動放大全幅圖片|Scroll Zoom to Full|捲動觸發|標題・Hero|GSAP
158|圖框內視差|Image Parallax in Frame|捲動觸發|捲動效果|GSAP
165|圖片圓形展開|Circle to Card Image|懸停・點擊|介面互動|CSS
168|展開式圖片面板|Expanding Panels|懸停・點擊|介面互動|CSS
184|平移|Pan|進場|轉場切換|CSS
191|緩慢推鏡|Ken Burns|循環待機|標題・Hero|CSS
260|框內微放大|Hover Zoom in Frame|懸停・點擊|介面互動|CSS
261|滑過放大檢視|Hover Zoom & Pan|懸停・點擊|介面互動|CSS
262|低飽和喚醒|Saturate on Hover|懸停・點擊|介面互動|CSS
263|商品圖切換|Image Swap on Hover|懸停・點擊|介面互動|CSS
264|滑過預覽影片|Hover to Play Video|懸停・點擊|介面互動|CSS
265|點圖放大燈箱|Lightbox Zoom|切換|介面互動|GSAP
266|縮圖列相簿|Thumbnail Gallery|切換|介面互動|GSAP
267|切片轉場|Slice Transition|切換|轉場切換|GSAP
268|拍立得洗牌|Photo Stack Shuffle|切換|介面互動|GSAP
269|故障錯位圖片|Glitch Image|懸停・點擊|介面互動|CSS
273|捲動速度傾斜|Scroll Velocity Skew|捲動觸發|捲動效果|GSAP
331|揉紙攤開|Crumpled Paper Reveal|進場|標題・Hero|Canvas`,
  'ml-svg': `88|手繪圈重點|Draw Highlight|進場|強調重點|GSAP
89|形狀變形|Shape Morph|切換|Logo・品牌|GSAP
90|路徑飛行|Path Flight|循環待機|背景裝飾|GSAP
133|上傳 SVG 描繪|Draw Your SVG|進場|Logo・品牌|GSAP
134|手寫簽名|Signature Writing|進場|Logo・品牌|GSAP
135|線條插畫逐筆描繪|Line Illustration Draw|進場|標題・Hero|GSAP
136|圖示描邊 hover|Icon Stroke Redraw|懸停・點擊|介面互動|GSAP
137|流程連線流動|Flowing Connectors|循環待機|數字資訊|CSS
138|波浪分隔線|Wave Divider|循環待機|背景裝飾|CSS
139|圓環進度|Circular Progress|進場|數字資訊|GSAP
140|打勾完成|Success Checkmark|進場|介面互動|GSAP
157|捲動繪製路徑|Scroll Draw Path|捲動觸發|捲動效果|GSAP
192|Logo 組合登場|Logo Build Reveal|進場|Logo・品牌|GSAP
193|音訊波形|Audio Waveform|循環待機|數字資訊|GSAP
194|漸層光流線條|Flowing Gradient Stroke|循環待機|背景裝飾|CSS
195|液體填充圖示|Liquid Fill Icon|循環待機|數字資訊|GSAP
196|雷達掃描|Radar Sweep|循環待機|數字資訊|CSS
197|折線圖繪製|Line Chart Draw|進場|數字資訊|GSAP
198|長條圖成長|Bar Chart Grow|進場|數字資訊|GSAP
199|圓餅圖分段|Donut Chart Segments|進場|數字資訊|GSAP
200|幾何載入動畫|Geometric Loader|循環待機|介面互動|CSS
201|SVG 濾鏡水波扭曲|Turbulence Distortion|循環待機|標題・Hero|CSS
271|捲動旋轉立方體|Scroll Rotating Cube|捲動觸發|捲動效果|GSAP
275|捲動形狀變形|Scroll Shape Morph|捲動觸發|捲動效果|GSAP
283|圖示微動畫|Icon Micro-animations|懸停・點擊|介面互動|CSS
318|地圖路線導航|Map Route|進場|數字資訊|GSAP
319|即時時鐘|Analog Clock|循環待機|數字資訊|CSS
320|天氣圖示動畫|Animated Weather Icons|循環待機|介面互動|CSS
321|選取框螞蟻線|Marching Ants Selection|循環待機|介面互動|CSS
322|有機流動色塊|Organic Blob|循環待機|背景裝飾|CSS
323|成就徽章解鎖|Badge Unlock|進場|強調重點|GSAP
324|心電圖線條|ECG Heartbeat Line|循環待機|數字資訊|GSAP
325|樹枝生長|Growing Plant|進場|標題・Hero|GSAP
326|齒輪連動|Gear Train|循環待機|背景裝飾|GSAP
327|指紋掃描解鎖|Fingerprint Scan|進場|App 介面|GSAP`,
  'ml-bg': `11|文字雨|Letter Rain|循環待機|背景裝飾|CSS
22|脈動格子|Word Pulse Grid|循環待機|背景裝飾|CSS
30|棋盤翻轉|Checker Words|循環待機|背景裝飾|CSS
48|巨字滑過|Huge Text Scroll|循環待機|背景裝飾|CSS
49|直書逆走|Vertical Typography|循環待機|背景裝飾|CSS
50|斜線帶|Diagonal Text Bands|循環待機|背景裝飾|CSS
51|緞帶|Text Ribbon|循環待機|背景裝飾|CSS
52|跑馬燈|Marquee|循環待機|背景裝飾|CSS
53|直書三層|Parallax Columns|循環待機|背景裝飾|CSS
54|封鎖膠帶|Tape Cross|循環待機|強調重點|CSS
56|文字走廊|Text Corridor|循環待機|背景裝飾|CSS
69|空心字|Outline Text|循環待機|背景裝飾|CSS
82|格狀擴散|Grid Stagger|循環待機|背景裝飾|GSAP
99|彩紙爆發|Confetti Burst|進場|強調重點|GSAP
100|滾輪加速跑馬燈|Velocity Marquee|捲動觸發|背景裝飾|GSAP
106|流動光暈漸層|Aurora Gradient|循環待機|背景裝飾|CSS
107|聚光網格|Spotlight Grid|懸停・點擊|背景裝飾|CSS
108|粒子連線|Particle Network|循環待機|背景裝飾|Canvas
160|章節主題切換|Section Theme Switch|捲動觸發|背景裝飾|GSAP
172|星空穿越|Warp Speed|循環待機|標題・Hero|Canvas
173|流場線條|Flow Field|循環待機|背景裝飾|Canvas
174|飄落花瓣|Falling Petals|循環待機|背景裝飾|Canvas
175|數字雨|Matrix Rain|循環待機|背景裝飾|Canvas
176|融合球|Metaballs|循環待機|背景裝飾|Canvas
178|磁力點陣|Magnetic Dot Grid|懸停・點擊|背景裝飾|Canvas
179|水波漣漪|Water Ripple|懸停・點擊|背景裝飾|Canvas
181|煙火|Fireworks|懸停・點擊|強調重點|Canvas
222|顆粒漸層|Grain Gradient|循環待機|標題・Hero|CSS
223|復古透視網格|Retro Grid Horizon|循環待機|標題・Hero|CSS
224|散景光點|Bokeh Lights|循環待機|背景裝飾|CSS
225|同心圓擴散|Pulse Rings|循環待機|背景裝飾|CSS
226|旋轉光芒|Sunburst Rays|循環待機|標題・Hero|CSS
227|閃爍星空|Twinkling Sky|循環待機|標題・Hero|Canvas
228|景深視差圖層|Depth Parallax|懸停・點擊|標題・Hero|CSS
229|起伏線條|Wavy Lines|循環待機|標題・Hero|Canvas
230|漂浮幾何|Floating Shapes|循環待機|背景裝飾|GSAP`,
  'ml-layout': `92|捲動揭示|Scroll Reveal|捲動觸發|捲動效果|GSAP
93|橫向捲動|Horizontal Scroll|捲動觸發|捲動效果|GSAP
94|視差圖層|Parallax Layers|捲動觸發|捲動效果|GSAP
101|捲動導覽點|Scroll Spy Dot Nav|捲動觸發|介面互動|GSAP
117|導覽列捲動縮小|Shrinking Sticky Header|捲動觸發|捲動效果|CSS
125|柔和上浮|Gentle Fade Up|進場|標題・Hero|GSAP
127|時間軸延伸|Timeline Draw|進場|介面互動|GSAP
128|Z 字閱讀動線|Z-pattern Reveal|進場|標題・Hero|GSAP
142|下拉重新整理|Pull to Refresh|拖曳手勢|App 介面|GSAP
143|底部抽屜|Bottom Sheet|進場|App 介面|GSAP
144|底部導覽列切換|Tab Bar Indicator|切換|App 介面|GSAP
150|啟動頁轉場|Splash to Home|進場|App 介面|GSAP
156|往下捲隱藏導覽列|Hide Header on Scroll|捲動觸發|介面互動|GSAP
161|圓形擴張轉場|Circle Reveal Transition|捲動觸發|轉場切換|GSAP
167|選單滑塊跟隨|Sliding Nav Highlight|懸停・點擊|介面互動|CSS
202|頁面轉場簾幕|Curtain Page Transition|切換|轉場切換|GSAP
203|漢堡選單展開|Hamburger Menu Reveal|懸停・點擊|介面互動|CSS
204|側邊抽屜推移|Push Side Drawer|懸停・點擊|介面互動|CSS
205|彈出視窗|Modal Dialog|進場|介面互動|CSS
206|手風琴問答|Accordion FAQ|懸停・點擊|介面互動|CSS
207|分頁標籤切換|Directional Tabs|切換|介面互動|GSAP
208|作品篩選重排|Filterable Grid|切換|介面互動|GSAP
209|Bento 格局展開|Bento Grid Expand|懸停・點擊|介面互動|CSS
210|左右分割捲動|Split Screen Scroll|捲動觸發|捲動效果|GSAP
211|回到頂部進度環|Back to Top Progress|捲動觸發|介面互動|GSAP
279|對開門轉場|Split Doors Reveal|捲動觸發|捲動效果|GSAP
282|清單列滑入填滿|List Row Fill|懸停・點擊|介面互動|CSS
308|頂部載入進度條|Top Loading Bar|進場|轉場切換|GSAP
309|步驟進度條|Step Progress|切換|介面互動|CSS
310|大型下拉選單|Mega Menu|懸停・點擊|介面互動|CSS
311|推入換頁|Push Navigation|切換|轉場切換|GSAP
312|空狀態插畫|Empty State|進場|介面互動|GSAP
313|Cookie 同意橫幅|Cookie Banner|進場|介面互動|GSAP
314|浮動按鈕展開選單|Speed Dial FAB|切換|介面互動|CSS
315|無限捲動載入|Infinite Scroll|捲動觸發|介面互動|GSAP
316|側欄收合|Collapsible Sidebar|切換|介面互動|CSS
317|指令面板|Command Palette|切換|介面互動|GSAP`,
  'ml-cursor': `96|游標跟隨|Cursor Follower|懸停・點擊|介面互動|GSAP
119|懸停放大游標|Hover Expand Cursor|懸停・點擊|介面互動|CSS
120|清單懸停預覽圖|Hover Image Reveal|懸停・點擊|介面互動|CSS
121|游標拖尾軌跡|Cursor Trail|懸停・點擊|介面互動|Canvas
122|點擊漣漪|Click Ripple|懸停・點擊|介面互動|CSS
123|旋轉文字環游標|Rotating Text Cursor|懸停・點擊|介面互動|CSS
124|手電筒探照|Flashlight Reveal|懸停・點擊|介面互動|CSS
251|反色混合游標|Blend Difference Cursor|懸停・點擊|標題・Hero|CSS
252|黏性游標|Sticky Cursor|懸停・點擊|介面互動|GSAP
253|速度拉伸游標|Velocity Stretch Cursor|懸停・點擊|介面互動|CSS
254|情境標籤游標|Contextual Cursor|懸停・點擊|介面互動|CSS
255|十字準星座標|Crosshair Cursor|懸停・點擊|介面互動|CSS
256|眼睛跟隨|Following Eyes|懸停・點擊|介面互動|CSS
257|放大鏡游標|Magnifier Lens|懸停・點擊|介面互動|CSS
258|黏液拖尾|Gooey Trail|懸停・點擊|標題・Hero|CSS
259|點擊噴出小物|Click Confetti Pop|懸停・點擊|強調重點|GSAP`,
}

const list = Object.entries(raw).flatMap(([group, text]) =>
  text.split('\n').map((line) => {
    const [no, zh, en, timing, scene, tech] = line.split('|')
    const url = `${SITE}/fx/${no}/`
    return { no: +no, group, zh, en, desc: `${timing}・${scene}・${tech}`, tags: [timing, scene, tech], url, embed: url,
      prompt: `${en}：完整說明與 AI 提示詞請見原站 ${url}` }
  })
)

console.assert(list.length === 331 && new Set(list.map((i) => i.no)).size === 331, 'Motion Library 應有 331 個不重複編號')

export default defineItems('ml', 'motion-library', list)
