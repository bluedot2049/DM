// 中英切換。index.html 寫的是中文原稿，英文都在這支檔案裡：
//   BLOCK：裡面有 <mark>、<br>、<span> 的段落，照「整段文字」找，整段換成英文 HTML（語序才會對）
//   TEXT ：純文字，照字串一對一換；app.js 之後寫進來的字（播放／停、貓頭人選項…）也會被即時換掉
//   ATTR ：圖片 alt、aria-label
// 語言順序：網址 ?lang=en ＞ 上次選的 ＞ 瀏覽器語言（不是中文就給英文）。
// 要改英文，直接改下面的字；要加新段落，中文原稿當 key、英文當 value。
(() => {
  const TITLE = {
    zh: '吳承恩｜模組化設計師・Generative Art & Music Designer',
    en: 'Darien｜Generative Art & Music Designer',
  };
  const DESC = {
    zh: '吳承恩，模組化設計師（Generative Art & Music Designer），讀眼藝術工作室 RAWA，美術、音樂相關經驗 10 年。美術、音樂、工程一家做，做成零件和規則，之後加做又快又一致。可遠端：接案、全職、兼職。',
    en: 'Darien (吳承恩), Generative Art & Music Designer at RAWA Studio, Taiwan, with 10 years in art and music. Art, music and code built as parts and rules, so every new piece is fast and consistent. Remote: contract, full-time or part-time.',
  };

  const BLOCK = {
    // 開場
    '模組化設計師': '<span>Generative</span><span>Art &amp; Music</span>',
    'Generative Art & Music Designer美術・音樂相關經驗 10 年可遠端・接案／全職／兼職': 'Designed as parts and rules, built with AI<span>10 years in art &amp; music</span><span>Remote · contract / full-time / part-time</span>',
    '案子缺東缺西，美術、音樂、工程要找三家。': 'Need art, music<br>and code?<br>That\'s three vendors.',
    '找我一家就好。做成零件和規則，下次不用重來。': '<mark>Just hire one.</mark><br><br>I build it as parts and rules,<br>so next time you don\'t start over.',
    // 01
    '把作品拆成零件和規則，就能更低成本更新後續的版本。': 'I break the work into <mark>parts and rules</mark>, so every later version costs less.',
    '把美感寫成程式，先做減法：什麼不能同時存在、怎麼搭、什麼線條風格。': 'Turn taste into code, <mark>subtracting first</mark>: what can\'t go together, what pairs well, which line style.',
    '節省大量機械操作的時間，把精力留在感受上。再經由不斷修正': 'Less time on mechanical work, more on how it feels.<br>Then refine, and refine<span class="dots" role="img" aria-label="…"><i></i><i></i><i></i></span>',
    '第一次把系統做起來，之後加做又快又一致。': 'Build the system once,<br>and every addition is <mark>fast and consistent</mark>.',
    // 02
    '畫一套零件，一整族角色，可以無限延伸應用。': 'Draw one set of parts and get <mark>a whole family of characters</mark>, endlessly extendable.',
    '拼圖來了。': '<mark>Here\'s your puzzle.</mark>',
    '先畫部件，再照規則拼成字，招牌、印章都同一個樣子。': 'Draw the components, assemble characters by rule: <mark>signs and stamps share one look</mark>.',
    '拆成樂器零件現場合成，聽一整天也不會一模一樣。': 'Split into instrument parts and synthesized live, so <mark>it never plays the same way twice</mark>.',
    '用 HTML 做，搭建快速，手機掃一下就開。': 'Built in HTML, <mark>up fast</mark>, opens with one phone scan.',
    '弄了一個世界，可以拿來幹嘛？': 'So you built a world.<br>What\'s it for?',
    '場景都是說故事的零件，換個鏡頭就是繪本、影片。': 'Every scene is a storytelling part.<br>Change the camera and it\'s a <mark>picture book or a film</mark>.',
    '想像這裡有一首詩': 'Imagine<br>a poem here',
    // 03
    '講得好聽，做得出來嗎？': 'Sounds nice.<br>Can you actually build it?',
    '一座用程式畫的畫廊，美術、音樂、工程靠模組化一個人做出來。': 'A gallery <mark>drawn in code</mark>:<br>art, music and engineering,<br><mark><span class="ph">made modular, </span><span class="ph">by one person.</span></mark>',
    '個人經營，用免費遊戲空間吸引玩家；未來將在此網站展出實體作品。': 'A solo project: a free game space that draws players in.<br>Physical artworks will be exhibited here in future.',
    '這是為了跟朋友享受拍照蓋的地方。': 'I built it as a place<br>to <mark>take photos with friends</mark>.',
    '站在鏡子前，魔法眼睛會幫你拍一張「靈魂相片」。造型、衣櫃、進度，都印在這張照片上。': 'Stand before the mirror and a magic eye takes your "soul photo".<br>Look, wardrobe and progress are all <mark>printed into that photo</mark>.',
    '同一個網址，手機電腦都能玩。加了錯誤更正，LINE 壓縮、截圖、縮小都讀得回來。': 'One link, playable on phone or desktop.<br>With error correction, it still loads after chat-app compression, screenshots or resizing.',
    '缺什麼自己做。你的團隊缺什麼，也能做。': 'If a tool is missing, I build it.<br>I can build what your team is missing, too.',
    '筆電即可運作的即時VJ程式。特別為無setting的演出寫算法，依照音樂情緒有層次變化。': 'A real-time VJ app that runs on a laptop.<br>Written for shows with no setup time; visuals layer up with the music\'s mood.',
    '樂譜、陣型圖、動作小人，系統化排成印刷譜本。打譜全自動。': 'Scores, formation maps and motion figures, laid out as print-ready books.<br>Engraving is <mark>fully automated</mark>.',
    '照片調色程式，讀 RAW 檔即時調色。只留自己需要的功能與操作手感，不必依賴貴鬆鬆的軟體。': 'A photo grading app with real-time RAW editing.<br>Only the features and feel I need, no pricey software required.',
    '從影片中挑選封面，挑選客製模板字卡，直接寫進 MP4 檔。視覺化整理影片檔案。': 'Pick a frame and a custom title template, and write the cover straight into the MP4.<br>Your video files, organized visually.',
    'AI 影片特效工作站：與 AI 共用同一個介面工作，出了初稿可以馬上人工調整。': 'An AI video-effects workstation:<br>you and the AI share one interface, so the first draft can be hand-tuned right away.',
    // 04
    '聽說 AI 很猛，隨便幾句話就能生成？': 'I hear AI is amazing.<br>A few words and it\'s done?',
    '（花了三年研究）AI 能放大個人的能力，但原本的專業是根基。AI 做加法，我做減法。': '(Three years of research later)<br>AI amplifies what one person can do,<br>but real craft is the foundation.<br>AI adds. <mark class="ph">I subtract.</mark>',
    '開發中 3D 合作射擊遊戲。手感、反饋、美術氛圍、UI 設計': 'A 3D co-op shooter in development.<br><mark>Game feel, feedback, art mood, UI design</mark>',
    // 05
    '攝影、影片、平面設計，都是用 AI 之前做的。': 'Photography, film, graphic design:<br>all done <mark>before AI</mark>.',
    '為什麼找你，不找工程師？': 'Why you,<br>and not an engineer?',
    '導演說「這裡再緊張一點」，工程師聽不懂。我在劇場和音樂現場做視覺 10 年，聽得懂，也知道要改哪個數字。': '<span class="ph">The director says </span><span class="ph">"more tension here,"</span><br>and the engineer is lost.<br><span class="ph">I\'ve done visuals for theater </span><span class="ph">and live music for 10 years.</span><br><mark><span class="ph">I get it, </span><span class="ph">and I know which number to change.</span></mark>',
    // 06
    '讀眼藝術工作室，歡迎合作。': '<mark><span class="ph">RAWA Studio: </span><span class="ph">let\'s work together.</span></mark>',
  };

  const TEXT = {
    // 選單
    '做什麼': 'What', '用途': 'Uses', '作品': 'Work', '根基': 'Roots', '聯絡': 'Hire',
    // 開場
    '讀眼藝術工作室 RAWA { 可開收據 }': 'RAWA Studio { invoices available }',
    '設計': 'Design', '美術': 'Art', '音樂': 'Music', '工程': 'Code',
    // 01
    '01　做什麼？': '01　What I do',
    '模組化是什麼意思？': 'What does "modular" mean?',
    '零件': 'Parts', '先畫好頭髮、眼睛、嘴巴、衣服。': 'Draw the hair, eyes, mouths and clothes first.',
    '規則': 'Rules', '種組法': 'combinations',
    '成品': 'Output', '快速做出大量素材。': 'Lots of assets, fast.',
    '使用工具': 'Tools', '寫程式': 'Code', '美術・音樂・影像': 'Art · Music · Video', 'Adobe PS／AI／LR': 'Adobe PS / AI / LR',
    // 02
    '02　能用在哪裡': '02　Where it fits',
    '想要設計模組化角色。': 'We want a modular character design.',
    '換一批': 'Shuffle', '看零件表': 'Parts sheet',
    '頭髮': 'Hair', '眼睛': 'Eyes', '嘴巴': 'Mouth', '衣服': 'Clothes',
    '我只要一隻吉祥物就好。': 'I just need one mascot.',
    '表情': 'Face', '手': 'Pose', '道具': 'Prop', '字': 'Word', '隨便拼一張': 'Random',
    '笑': 'Smile', '放空': 'Blank', '哭': 'Cry', '嚇到': 'Shocked', '生氣': 'Angry',
    '揮手': 'Wave', '比讚': 'Thumbs up', '萬歲': 'Hooray', '抱頭': 'Head in hands',
    '空手': 'None', '咖啡': 'Coffee', '魚': 'Fish', '愛心': 'Heart',
    '一隻貓頭人，': 'One cat-head character, ', '張貼圖。點下面任一張拿來改：': ' stickers. Tap any one below to remix it:',
    '活動或 IP 想要一套自己的字。': 'Our event or IP wants its own lettering.',
    '展場的音樂要放一整天。': 'The venue needs music all day long.',
    '▶ 播放': '▶ Play', '■ 停': '■ Stop', '現場算四軌中…': 'Rendering four tracks live…',
    '琴': 'Keys', '音盒': 'Music box', '貝斯': 'Bass', '鼓': 'Drums', '雜音': 'Vinyl',
    '曲子：煉金畫廊「星盤夜讀」': 'Track: "Reading by the Star Chart", Alchemy Gallery',
    '活動只辦一次，也可以做網站嗎？': 'It\'s a one-off event. Is a website worth it?',
    '單次活動網站': 'Event site', '報名': 'Join', '時間、地點、報名，一頁講完': 'Time, place and sign-up on one page',
    '節目冊': 'Program', '曲目和演出者，現場掃 QR 碼看': 'Pieces and performers; scan the QR code at the venue',
    '說明書': 'Manual', '一步一步圖解，隨時可以改': 'Illustrated step by step, editable anytime',
    '示意': 'Mock-up', '繪本': 'Picture book', '影片': 'Film',
    // 03
    '03　作品': '03　Work',
    '[煉金畫廊] 互動網頁／遊戲': '[Alchemy Gallery] Interactive web / game',
    '網頁 HTML，電腦、手機皆可直接連線。': 'Runs in the browser, on desktop and mobile.',
    '支援多人連線': 'Multiplayer', '手機與電腦都有完整使用者介面': 'Full UI on both mobile and desktop',
    '自己造字「煉金體」': 'Custom typeface: "Alchemy Script"', '99% 素材程式生成，首頁下載量僅約 3.4 MB': '99% of assets generated by code; first load is only about 3.4 MB',
    '煉金畫廊　地名字卡設計': 'Alchemy Gallery　Location title cards',
    '走進新的地區，畫面上方浮出的地名': 'The place name that rises at the top of the screen when you enter a new area',
    '紋飾': 'Ornament', '一粒點': 'A dot', '漸粗的線': 'A swelling line', '空心菱形': 'Hollow diamond', '水銀記號': 'Mercury sign', '小菱形': 'Small diamond',
    '煉金體：直筆、圓環、菱形點，部件照規則拼字，已造 144 字': 'Alchemy Script: straight strokes, rings and diamond dots, assembled by rule. 144 characters so far.',
    '入口': 'Enter',
    '遊戲裡可以做什麼？': 'What do you do in the game?',
    '以下為遊戲角色拍攝的照片': 'Photos taken by in-game characters',
    '觀光客初來乍到': 'Tourists, just arrived', '朋友拍我': 'My friend shoots me', '我拍朋友': 'I shoot my friend',
    '存檔是一張照片': 'Your save file is a photo',
    '自製工具': 'Tools I built', '譜本設計': 'Score book design',
    // 03 書籍設計
    '[伊底帕斯的雙眼] 書籍設計・排版': '[The Eyes of Oedipus] Book design & typesetting',
    '一本 140 頁的 A5 小說。書名字、封面、裝飾到內文排版，整本做成零件和規則。': 'A 140-page A5 novel. Title lettering, cover, ornaments and body typesetting, all built as parts and rules.',
    '書名字從筆畫骨架重畫，輸出可進 Illustrator 的向量曲線': 'Title lettering redrawn from stroke skeletons, exported as vector curves that open in Illustrator',
    '九章各一款章首飾、章節扉頁圓徽、四款牌框，同一套線條規則': 'A head ornament for each of nine chapters, chapter roundels and four card frames, all under one line system',
    '花草照慕夏、比亞茲萊、杜勒的畫法重畫，不停在「圖示」': 'Flowers and leaves redrawn after Mucha, Beardsley and Dürer, so they read as drawings, not icons',
    '內文照 W3C《中文排版需求》細排：避頭尾、跨頁齊底、段末不留孤字': 'Body text set to the W3C Chinese Layout Requirements: line-break rules, spreads that end level, no orphan lines',
    '封面 15 款配色、30 多種網點素材，600 dpi、出血、印刷規格一次備齊': '15 cover colourways, 30+ screentones, 600 dpi with bleed: print-ready from the start',
    '書名字：從筆畫骨架重畫的明體，頭尾加遊絲': 'Title lettering: a Ming-style face redrawn from stroke skeletons, with hairline swashes',
    '九章章首飾：一章一個母題，線條粗細只分三級': 'Nine chapter heads: one motif per chapter, only three line weights',
    '四款牌框：蛇與夜海、帷幕與沙漏、帶刺薔薇、絞繩花環': 'Four card frames: serpent and night sea, curtain and hourglass, thorned rose, braided garland',
    '章節扉頁圓徽': 'Chapter roundels',
    '封面配色：同一張封面拆成圖層換色，不重畫': 'Cover colourways: one cover split into layers and recoloured, never redrawn',
    '花草修正：原版｜只改線（輕重、收尖）｜線加形（不對稱、偏心）': 'Refining the flowers: original | line only (weight, tapering) | line and shape (asymmetry, off-centre)',
    // 04
    '04　用 AI 做的嗎？': '04　Made with AI?',
    '開聲音': 'Sound on', '關聲音': 'Sound off',
    '最重要的是整體感': 'What matters most is the whole',
    '使用 Godot 遊戲引擎製作。': 'Built with the Godot engine.',
    '背景美術設定': 'Background art concepts',
    // 05
    '05　根基': '05　Roots',
    '那沒有 AI 的時候呢？': 'And before AI?',
    '表演攝影': 'Performance photography', '雲林國際偶戲節、場館演出、團隊攝影工作統籌': 'Yunlin International Puppetry Festival, venue shows, leading photo teams',
    '影像製作': 'Video production', '導演、拍攝、後製一條龍': 'Directing, shooting and post-production, end to end',
    '平面設計': 'Graphic design', '多種美術風格設計、專輯設計、印刷品製作，自動適應團隊風格。': 'Many art styles, album design and print production, adapting to each team\'s style.',
    '插畫・角色': 'Illustration · Characters', 'CSP 為主，Photoshop／Illustrator 輔助': 'Mainly Clip Studio Paint, with Photoshop / Illustrator',
    '得獎': 'Awards',
    '嘉義市國際管樂節 短影片競賽 首獎（2024）・第四屆有事青年節 團隊競賽 第二名': 'First Prize, Short Film Contest, Chiayi City International Band Festival (2024) · Second Place, Team Competition, 4th 有事青年節 Youth Festival',
    // 06
    '06　找我合作': '06　Work with me',
    '某天，業主衝進來。': 'A client bursts in.',
    '有錢！': 'Budget!', '要搞創作又搞設計': 'Art AND design', '接嗎 ?!': 'You in?!', '咚！': 'BAM!',
    '有錢!? 接!': 'Budget!? I\'m in!',
    '敘事影像': 'Narrative film', '角色設計': 'Character design', '一套字體': 'A typeface', '互動裝置': 'Interactive installation', '宣傳與印刷': 'Promo & print', '線上展覽': 'Online exhibition',
    '多種合作經驗': 'Who I\'ve worked with', '我': 'Me',
    '導演・編舞': 'Directors · Choreo', '長官': 'Officials', '舞台': 'Stage', '企劃・製作': 'Producers',
    '音樂・樂手': 'Musicians', '美術・設計': 'Designers', '宣傳': 'Promo',
    '好多地方要搞，怎起。': 'So much to do. Where do we start?',
    '我們當專案或產品來談。': 'Let\'s treat it as a project, or a product.',
    '三種都行': 'Three ways to work',
    '委託': 'Commission', '有一個明確的任務，專案執行。': 'A clear brief, delivered as a project.',
    '共同開發': 'Co-develop', '我進團隊，一起合作。': 'I join your team for the build.',
    '加入團隊': 'Join the team', '遠端全職或兼職，長期一起做。': 'Remote full-time or part-time, long term.',
    '缺哪塊，補哪塊。': 'Whatever piece is missing, I fill it.',
    '誰適合找我': 'Who I\'m for',
    '老闆・管理層': 'Owners · Managers', '整包外包，一個窗口。': 'One contact for the whole package.',
    '團隊': 'Teams', '缺一塊技術，我補上。': 'Missing a skill? I fill the gap.',
    '創作者': 'Creators', '沒有現成的，一起做出來。': 'Nothing off the shelf? We\'ll make it.',
    'LINE ID：saksaar': 'LINE ID: saksaar',
    'LINE 聊需求': 'Message me (email or LINE)', '討論與制定計畫': 'Plan together', '開工': 'Start',
    '讀眼藝術工作室・嘉義市': 'RAWA Studio · Chiayi, Taiwan', '可遠端：接案・全職・兼職': 'Remote: contract · full-time · part-time',
    '2026/11/20 更新': 'Updated 2026/11/20',
  };

  const ATTR = {
    '伊底帕斯的雙眼封面：英文書名、日月徽章與茛苕葉畫框': 'The Eyes of Oedipus cover: English title, sun and moon medallions, acanthus frame',
    '全書 140 頁的跨頁縮圖，一章一列，標出插圖頁位': 'All 140 pages as spreads, one chapter per row, with illustration slots marked',
    '封底畫框三款提案：透雕、簡葉、角花黑底': 'Three back-cover frame options: pierced, simple leaf, corner flowers on black',
    '漫畫網點素材總覽：圓點、漸層、斜線、砂目、集中線': 'Screentone sheet: dots, gradients, lines, grain, speed lines',
    '中文書名字：伊底帕斯的雙眼，頭尾帶遊絲': 'Chinese title lettering for The Eyes of Oedipus, with hairline swashes',
    '九章的章首飾與章號': 'Head ornaments and numerals for nine chapters',
    '四款塔羅牌框：蛇與夜海、帷幕與沙漏、帶刺薔薇、絞繩花環': 'Four tarot-style frames: serpent and night sea, curtain and hourglass, thorned rose, braided garland',
    '章節扉頁圓徽：薔薇、鏡子、帷幕、星盤、日出': 'Chapter roundels: rose, mirror, curtain, star dial, sunrise',
    '同一張封面的五款配色：瓶綠、瓶綠金框、牛血紅金框、墨水藍、墨黑金框': 'Five colourways of one cover: bottle green, green with gold, oxblood with gold, ink blue, ink black with gold',
    '花草輪廓修改前後：薔薇、水仙、畫框角': 'Flower outlines before and after: rose, narcissus, frame corner',
    '。。。': '…',
    '一排長得都不一樣的小人': 'A row of little figures, each one different',
    '貓頭人貼圖': 'Cat-head sticker',
    '繪本左頁：粉色淺水上的櫻花樹': 'Picture book, left page: a cherry tree over pink shallows',
    '影片畫格：黃昏的碼頭': 'Film frame: a pier at dusk',
    '影片畫格：夜裡的山城': 'Film frame: a hill town at night',
    '影片畫格：月面工廠': 'Film frame: a factory on the moon',
    '黃色布上兩幅裝框的畫：張嘴的馬、一瓶花': 'Two framed paintings on yellow cloth: a horse with its mouth open, a vase of flowers',
    '工作桌上攤著蠟筆、色鉛筆和畫到一半的花': 'Crayons, colored pencils and a half-drawn flower on a worktable',
    '黃昏的草原、大樹和碼頭': 'A meadow, a big tree and a pier at dusk',
    '夜裡亮著燈的海邊山城': 'A seaside hill town lit up at night',
    '粉色淺水上的一棵櫻花樹': 'A cherry tree over pink shallows',
    '月面上的工廠建築群': 'Factory buildings on the moon',
    '上一張': 'Previous', '下一張': 'Next',
    '煉金體字樣': 'Alchemy Script specimen',
    '海市的夜市：滿街燈籠、小吃攤，石階通往山上的鳥居': 'Night market in Haishi: lanterns, food stalls and stone steps up to a torii gate',
    '從低處往上拍的巷子，戴斗笠的紅色狐狸（我）拄著法杖站在白階上，四周燈籠和招牌都糊成光斑，右下角印著日期': 'Low-angle shot of an alley: a red fox in a straw hat (me) leans on a staff on white steps, lanterns blurred into bokeh, date stamp in the corner',
    '從高處往下拍燈籠巷的階梯，朋友正舉著相機回拍，右下角印著日期': 'High-angle shot down lantern-lined steps, my friend shooting back with a camera, date stamp in the corner',
    '靈魂相片：金色拱形鏡框裡站著戴斗笠的紅色狐狸，上方一顆大眼睛，虹膜和鏡框都是密密的金色刻痕': 'Soul photo: a red fox in a straw hat inside an arched gold mirror frame, a large eye above, iris and frame densely engraved in gold',
    'RAWA 的吉祥物': 'RAWA mascot',
    'WAVERAWA：音樂變成的線條畫面': 'WAVERAWA: music turned into line visuals',
    '東皇太一譜本封面：鼓的四周圍著動作小人': 'Score book cover for 東皇太一: motion figures around a drum',
    '譜本內頁：編制與舞台配置': 'Score book page: instrumentation and stage layout',
    'COLORAWA：調色桌，左邊相片膠卷，右邊混色器和曲線': 'COLORAWA: grading desk with a film strip on the left, color mixer and curves on the right',
    'STICKERAWA：影片封面編輯畫面': 'STICKERAWA: video cover editor',
    'POVRAWA：剪輯軟體畫面': 'POVRAWA: editing software',
    '遊戲畫面：布偶法師在紅色洞窟裡跟著音樂戰鬥': 'Gameplay: a puppet mage fighting to the music in a red cave',
    '一排黑色怪物的剪影，中間都有一顆紅眼，越來越大': 'A row of black monster silhouettes, each with one red eye, growing larger',
    '黑白分鏡：大鬍子巫師、戴斗笠的人、拿槍的黑貓': 'Black-and-white storyboard: a bearded wizard, a figure in a straw hat, a black cat with a gun',
    '黑白分鏡：黑色宇宙裡漂流的小角色': 'Black-and-white storyboard: a small character drifting through black space',
    '設定草圖：牆上的紅光球': 'Concept sketch: red glowing orbs on a wall',
    '設定草圖：紅牆前點燃的火炬，火焰點燃後不要熄滅': 'Concept sketch: lit torches before a red wall; the flames stay lit',
    '太日樂集演出，鼓手揮棒擊鼓': 'Taiji Ensemble performance: a drummer mid-stroke',
    '布袋戲偶在舞台燈光下': 'A glove puppet under stage lights',
    '雲林國際偶戲節舞台上，偶師和兩個小孩玩懸絲偶': 'On stage at the Yunlin International Puppetry Festival, a puppeteer and two children play with a marionette',
    '影片作品片段：MV、紀錄片': 'Video reel: music videos, documentaries',
    '望鄉演出海報': 'Poster for 望鄉',
    '樂樂樂演出海報': 'Poster for 樂樂樂',
    '太日樂集《雲林印象－古坑印景》演出海報': 'Taiji Ensemble poster: 雲林印象－古坑印景',
    '太空人插畫，戴粉紅圍巾': 'Illustration of an astronaut in a pink scarf',
    '義興閣布袋戲角色貼紙': 'Character stickers for 義興閣 glove puppetry',
    '黑白貼圖「早安」，一群小角色說你好': 'Black-and-white "good morning" sticker: a crowd of little characters saying hello',
    '能做的作品形式': 'What I can make',
    '加 LINE 好友（ID：saksaar）': 'Add me on LINE (ID: saksaar)',
    'LINE 加好友 QR 碼（ID：saksaar）': 'LINE QR code (ID: saksaar)',
    '聯絡之後': 'After you get in touch',
  };
  // app.js 組出來的 aria-label（貓頭人：表情、手、道具、字）：拆成字詞換
  const PHRASE = [['貓頭人貼圖：', 'Cat-head sticker: '], ['拿這張來改：', 'Remix this one: '], ['，寫「', ', saying "'], ['」', '"'], ['、', ', ']];
  const CAT_WORDS = ['笑', '放空', '哭', '嚇到', '生氣', '揮手', '比讚', '萬歲', '抱頭', '空手', '咖啡', '魚', '愛心'];

  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const flip = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
  const TEXT_ZH = flip(TEXT);
  const CJK = /[　-〿一-鿿＀-￯]/;
  const ATTRS = ['alt', 'aria-label'];
  const skip = (n) => n.closest?.('svg, script, style, [data-cat-key="字"], .sticker-word, .glyph-grid, .combines, .goods, .card-title, .tc-name, .gate-name');

  let lang = 'zh';
  const blockZh = new Map();      // 元素 → 中文 innerHTML
  const textZh = new WeakMap();   // 文字節點 → 中文
  const attrZh = new WeakMap();   // 元素 → { attr: 中文 }

  // live：app.js 之後寫進來的。只有這種才拿英文去對回中文（例如混音台記住的開場字）
  function setText(node, live) {
    const raw = node.nodeValue, key = raw.trim();
    if (!key) return;
    const el = node.parentElement;
    if (!el || skip(el)) return;
    const lead = raw.slice(0, raw.indexOf(key)), tail = raw.slice(raw.indexOf(key) + key.length);
    if (lang === 'en' && TEXT[key] != null) {
      textZh.set(node, raw);
      node.nodeValue = lead + TEXT[key] + tail;
    } else if (lang === 'zh') {
      if (textZh.has(node)) { node.nodeValue = textZh.get(node); textZh.delete(node); }
      else if (live && TEXT_ZH[key] != null) node.nodeValue = lead + TEXT_ZH[key] + tail;
    }
  }
  function setAttrs(el) {
    if (el.closest('script, style')) return;
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v) continue;
      const saved = attrZh.get(el) || {};
      if (lang === 'en' && CJK.test(v)) {
        let en = ATTR[v];
        if (en == null && PHRASE.some(([zh]) => v.includes(zh))) {
          en = v;
          const words = CAT_WORDS.slice().sort((a, b) => b.length - a.length).map((w) => [w, TEXT[w]]);
          for (const [zh, e] of [...PHRASE, ...words]) en = en.split(zh).join(e);
        }
        if (en != null && en !== v) { saved[a] = v; attrZh.set(el, saved); el.setAttribute(a, en); }
      } else if (lang === 'zh' && saved[a] != null) {
        el.setAttribute(a, saved[a]); delete saved[a];
      }
    }
  }
  function walk(root, live) {
    if (root.nodeType === 3) return setText(root, live);
    if (root.nodeType !== 1) return;
    setAttrs(root);
    const it = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    for (let n = it.nextNode(); n; n = it.nextNode()) n.nodeType === 3 ? setText(n, live) : setAttrs(n);
  }
  function blocks() {
    if (lang === 'en') {
      for (const el of document.querySelectorAll('h1, p')) {
        if (!el.isConnected || !el.firstElementChild || skip(el)) continue;
        const en = BLOCK[norm(el.textContent)];
        if (en == null) continue;
        blockZh.set(el, el.innerHTML);
        el.innerHTML = en;
      }
    } else {
      for (const [el, zh] of blockZh) el.innerHTML = zh;
      blockZh.clear();
    }
  }

  let mo;
  function apply(next, save) {
    lang = next;
    mo?.disconnect();
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    document.title = TITLE[lang];
    document.querySelector('meta[name="description"]')?.setAttribute('content', DESC[lang]);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://bluedot2049.github.io/DM/' + (lang === 'en' ? '?lang=en' : ''));
    blocks();
    walk(document.body);
    const btn = document.querySelector('[data-lang-toggle]');
    if (btn) {
      btn.querySelector('span').textContent = lang === 'en' ? '中文' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? '切換成中文' : 'Switch to English');
      btn.setAttribute('lang', lang === 'en' ? 'zh-Hant' : 'en');
    }
    if (save) {
      try { localStorage.setItem('lang', lang); } catch (e) { /* 私密模式存不了也沒關係 */ }
      const u = new URL(location.href);
      if (lang === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang');
      history.replaceState(history.state, '', u);
      // 對話框尾巴、作品疊的大小都照文字長度算，換完語言讓 app.js 重算一次
      requestAnimationFrame(() => dispatchEvent(new Event('resize')));
    }
    observe();
  }
  // app.js 之後寫進來的字（按鈕文字、貓頭人選項、aria-label），出現就換成目前的語言
  function observe() {
    mo = mo || new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === 'characterData') setText(m.target, true);
        else if (m.type === 'attributes') setAttrs(m.target);
        else for (const n of m.addedNodes) walk(n, true);
      }
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* 讀不到就照瀏覽器 */ }
  const param = new URLSearchParams(location.search).get('lang');
  const first = param === 'en' || param === 'zh' ? param
    : saved === 'en' || saved === 'zh' ? saved
    : /^zh/i.test(navigator.language || 'zh') ? 'zh' : 'en';

  if (first === 'en') apply('en', false); else observe();
  document.querySelector('[data-lang-toggle]')?.addEventListener('click', () => apply(lang === 'en' ? 'zh' : 'en', true));
})();
