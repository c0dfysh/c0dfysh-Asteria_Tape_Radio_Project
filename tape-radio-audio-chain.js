/* Audio chaining layer: Intro → matched cocktail voice track → optional licensed BGM. */
(() => {
  const INTRO_PATH = 'audio/电台串词前置 .v5（剪辑版）.mp3';
  const INTRO_TEXT = '聽得見嗎？耳邊那些催促你、困縛你的嘈雜聲，此刻終於停止了。辛苦了這麼久，此時此刻，准許你卸下所有的身份，把時間留給自己，好好放在心上。現在，慢慢呼吸，喝下這杯為你量身調配的特調，聽聽這段留給你的旋律。';
  const INTRO_EN_TEXT = 'Can you hear it? The voices that rushed and confined you have finally gone quiet. You have carried enough for today. For this moment, you may set every role down and keep this time for yourself. Breathe slowly, take a sip of the drink made for you, and listen to this melody left especially for your night.';
  const radioDataDictionary = {
    'Ramos Gin Fizz':{audioPath:'audio/GIN/Ramos Gin Fizz（只因留著你）.mp3',text:'這杯 Ramos Gin Fizz 以奶油與蛋白化成液體甜點。橙花的華麗白花香和重奶油交織，甜蜜溫暖，讓酒感變得柔軟。'},
    'Gin Tonic':{audioPath:'audio/GIN/Gin Tonic（酷愛）.mp3',text:'這杯 Gin Tonic 帶著杜松子和奎寧根莖的冷冽草本微苦，清醒、俐落，又帶一點痛快。'},
    'Dry Martini':{audioPath:'audio/GIN/Dry Martini（寂寞如風）.mp3',text:'這杯 Dry Martini 沒有甜度掩飾，只有乾脆的草藥與杜松子香氣，留下一片清冷而自由的空白。'},
    'Negroni':{audioPath:'audio/GIN/ Negroni（千千闕歌）.mp3',text:'這杯 Negroni 苦甜交織，層次豐富，烈而不膩，像歲月裡慢慢沉澱下來的釋懷。'},
    'Mojito':{audioPath:'audio/RUM/Mojito（朋友）.mp3',text:'碎冰、薄荷與輕盈甜潤交融，像一陣夏日微風，替你吹散白天積攢的煩悶。'},
    'Hemingway Daiquiri':{audioPath:'audio/RUM/Hemingway Daiquiri（葡萄成熟時）.mp3',text:'葡萄柚皮的微苦與成熟果香交織，把那些疲憊慢慢熬成一口回甘。'},
    'Piña Colada':{audioPath:'audio/RUM/Pina Colada（心急人上）.mp3',text:'濃郁椰奶與多汁菠蘿交織成夏日的清甜，讓久違的少女心在陽光裡放飛。'},
    "Dark 'N' Stormy":{audioPath:"audio/RUM/Dark 'N' Stormy（雜技）.mp3",text:'醇厚焦糖甜香遇上薑汁啤酒的辛辣，像最甜美的旋律裡藏著的一點心碎。'},
    'Old Fashioned':{audioPath:'audio/WHISKY/Old Fashioned（說謊的愛人）.mp3',text:'成熟穀物、橡木桶與煙燻交融，在大冰塊中慢慢沉澱，給深夜一份厚重的安穩。'},
    'Irish Coffee':{audioPath:'audio/WHISKY/Irish Coffee（背影）.mp3',text:'焦苦濃郁的黑咖啡穿過輕盈鮮奶油，與威士忌相遇，像深夜裡最溫柔的溺愛。'},
    'Paper Plane':{audioPath:'audio/WHISKY/Paper Plane（喜帖街）.mp3',text:'甜、酸、苦在杯中取得平衡，像一隻紙飛機，提醒你仍能在逆境裡重新出發。'},
    'Penicillin':{audioPath:'audio/WHISKY/Penicillin（紅綠燈）.mp3',text:'泥煤煙燻包裹著生薑蜂蜜的溫熱辛感，替你在路口徬徨時找回向前的底氣。'},
    'Sazerac':{audioPath:'audio/BRANDY/Sazerac（真的愛你）.mp3',text:'草本辛香、甜潤與皮革調層層疊起，將一份深沉的愛安靜放進人生的閱歷裡。'},
    'Stinger':{audioPath:'audio/BRANDY/Stinger（敢愛敢做）.mp3',text:'醇厚白蘭地與清冽薄荷香氣對撞，替繃緊的神經帶來一次爽快的鬆綁。'},
    'Champs-Élysées':{audioPath:'audio/BRANDY/Champs-Elysees（少女的祈禱）.mp3',text:'百里香與紫羅蘭香氣刺破白蘭地的沉悶，在氣泡中升起，讓你短暫卸下重擔。'},
    'Brandy Alexander':{audioPath:'audio/BRANDY/Brandy Alexander（香濃）.mp3',text:'濃郁可可焦香與鮮奶油交織出絲絨觸感，是一個沒有攻擊性的溫柔熱量擁抱。'},
    'Cosmopolitan':{audioPath:'audio/VODKA/Cosmopolitan（借你耳朵說愛你）.mp3',text:'蔓越莓的酸甜果香藏著一點現代都市的含蓄，像想對自己輕輕說出的表白。'},
    'Expresso Martini':{audioPath:'audio/VODKA/ Expresso Martini（暗戀航空）.mp3',text:'現磨濃縮咖啡的焦香撞上伏特加的乾淨力量，讓人在清醒與微醺之間遊走。'},
    'Moscow Mule':{audioPath:'audio/VODKA/ Moscow Mule（只有你不知道）.mp3',text:'生薑的辛辣和青檸的酸爽隨著氣泡消散，只留下令人安心的溫熱餘韻。'},
    'Paloma':{audioPath:'audio/TEQUILA/Paloma（Where Did U Go）.mp3',text:'西柚果皮的微苦與清爽酸甜完美結合，讓人忍不住在濕潤綠意裡深深呼吸。'},
    'El Diablo':{audioPath:'audio/TEQUILA/El Diablo（多情）.mp3',text:'黑醋栗的神祕甜香撞上薑汁啤酒冰爽的氣泡，給沉默的叛逆留下一點出口。'},
    'Rosita':{audioPath:'audio/TEQUILA/Rosita（暗湧）.mp3',text:'荒漠植物的泥土辛香被包裹在苦甜外衣裡，平靜表面下仍有不妥協的暗湧。'}
  };
  // Full Cantonese on-screen copy supplied for each matched cocktail.
  Object.assign(radioDataDictionary, {
    'Ramos Gin Fizz':{...radioDataDictionary['Ramos Gin Fizz'],text:'呢杯 Ramos Gin Fizz 喺經典款基礎上加咗鮮奶油同蛋白，變身成液體甜品，散發住花香調、美食調同芳香調。橙花水嗰種華麗嘅白花香，同重奶油交織埋一齊，好似一層夢幻嘅粉質保護殼。風味甜蜜溫暖，酒精感被完全柔化，帶嚟一種安穩得嚟又雀躍嘅療癒幸福感。而家，呢一首《只因留著你》，送畀呢一刻可以不完美嘅你。'},
    'Gin Tonic':{...radioDataDictionary['Gin Tonic'],text:'呢杯 Gin Tonic 主打木質草本調，帶有一絲絲微苦嘅澀感，交織住綠葉調同西普調。奎寧植物根莖嘅微苦同杜松子嗰種冷冽嘅草本木質調相互拉長，好似歌入面嗰種清醒得嚟又倔強嘅痛快。而家，等呢首《酷愛》陪住你，我哋慢慢釋懷。'},
    'Dry Martini':{...radioDataDictionary['Dry Martini'],text:'呢杯 Dry Martini 擁有標誌性嘅草本草藥味同杜松子嘅特殊香氣。完全冇任何甜度去掩飾，係一種絕對嘅清冷，只有乾脆利落嘅草藥味同杜松子香。飲下呢杯極乾馬天尼，係你喺呢個時候最清醒、最孤傲、唔容許任何人侵犯嘅獨立真空區。而家，聽下呢首《寂寞如風》，呢一刻唔使急住去忘記啲咩。'},
    'Negroni':{...radioDataDictionary.Negroni,text:'呢杯 Negroni 苦甜交織、層次豐富、烈得嚟又唔會膩。金巴利藥草嘅苦同美思嘅甜喺舌尖交織，真係好似漫長歲月入面數唔盡嘅悲歡離合。烈而不膩，係人到中年嘅厚重同釋懷。而家，呢一首《千千闕歌》，送畀呢一刻可以不完美嘅你。'},
    'Mojito':{...radioDataDictionary.Mojito,text:'呢杯 Mojito 由碎冰、薄荷同甜潤感交織。鋪天蓋地嘅碎冰、新鮮薄荷嘅清涼同輕盈嘅甜潤完美融合，好似老朋友重逢嗰陣嘅親切同放鬆。清爽嘅綠意好似一記微風，溫柔噉吹散你白天積落嘅所有煩悶。而家，等呢首《朋友》陪住你，我哋慢慢釋懷。'},
    'Hemingway Daiquiri':{...radioDataDictionary['Hemingway Daiquiri'],text:'呢杯 Hemingway Daiquiri 帶有微微嘅苦澀，伴隨住柔和嘅複合果香。葡萄柚皮嘅微苦同黑櫻桃成熟嘅複合果香，象徵住那些柴米油鹽嘅疲憊喺呢一刻，終於熬成了成熟過後嘅回甘。而家，聽下呢首《葡萄成熟時》，呢一刻唔使急住去忘記啲咩。'},
    'Piña Colada':{...radioDataDictionary['Piña Colada'],text:'呢杯 Piña Colada 充滿濃郁嘅夏日度假風情。濃厚嘅椰奶同多汁嘅菠蘿交織出清甜。千禧年最元氣嘅少女甜歌，化作呢杯酸甜慵懶嘅液體雪糕，等你在最冇負擔嘅陽光感入面，放飛嗰顆好耐冇見嘅雀躍少女心。而家，呢一首《心急人上》，送畀呢一刻可以不完美嘅你。'},
    "Dark 'N' Stormy":{...radioDataDictionary["Dark 'N' Stormy"],text:'呢杯 Dark N Stormy 伴隨住醇厚嘅焦糖甜香同薑汁啤酒嘅辛辣刺激。懸浮喺刺激生薑啤酒之上嘅醇厚焦糖，就好似用最甜美嘅聲線唱住最心碎嘅傷歌。生薑嘅辛辣令人心碎，黑朗姆嘅甜潤卻又一瞬間撫平人心。而家，等呢首《雜技》陪住你，我哋慢慢釋懷。'},
    'Old Fashioned':{...radioDataDictionary['Old Fashioned'],text:'呢杯 Old Fashioned 展現出成熟嘅風味。威士忌成熟嘅穀物厚重感同橡木桶嘅熏煙醇厚融合，在一塊大冰塊入面慢慢沉澱，最適合喺極度疲憊嘅時候作孤獨嘅消解。而家，聽下呢首《說謊的愛人》，呢一刻唔使急住去忘記啲咩。'},
    'Irish Coffee':{...radioDataDictionary['Irish Coffee'],text:'呢杯 Irish Coffee 由濃郁醇厚嘅黑咖啡搭配打發鮮奶油，展現極具治癒感嘅甜蜜。焦苦濃郁嘅黑咖啡撞上威士忌嘅厚重，卻穿過咗輕盈冰涼嘅鮮奶油。呢種冷熱奶咖嘅交融，係畀媽媽最溫柔嘅溺愛。而家，呢一首《背影》，送畀呢一刻可以不完美嘅你。'},
    'Paper Plane':{...radioDataDictionary['Paper Plane'],text:'呢杯 Paper Plane 完美平衡咗甜、酸、苦。阿佩羅嘅紅柚同阿瑪羅嘅草本苦甜完美平衡，好似一隻喺甜酸苦入面起飛嘅紙飛機。縱然生活滄海桑田，飲下它，依然可以在逆境入面重新出發，尋找人生嘅新平衡。等呢首《喜帖街》陪住你，我哋慢慢釋懷。'},
    'Penicillin':{...radioDataDictionary.Penicillin,text:'呢杯 Penicillin 融合咗生薑煙燻同泥煤風味。泥煤威士忌嘅煙燻藥感，包裹住生薑蜂蜜嘅溫熱辣感。好似喺生活嘅十字路口徘徊，飲下呢杯幫你再次搵返向前衝嘅底氣。而家，聽下呢首《紅綠燈》，呢一刻唔使急住去忘記啲咩。'},
    'Sazerac':{...radioDataDictionary.Sazerac,text:'呢杯 Sazerac 先甜、中烈、後苦，帶有草本、辛香同甜潤。將母愛、愧疚同感恩徹底升華為漫長嘅人生閱歷，草本辛香同皮革調令呢份沉甸甸嘅愛沉澱喺骨子裡。而家，呢一首《真的愛你》，送畀呢一刻可以不完美嘅你。'},
    'Stinger':{...radioDataDictionary.Stinger,text:'呢杯 Stinger 由濃郁醇厚嘅白蘭地基底同清冽涼爽嘅薄荷香氣完美交織。醇厚溫潤同清冽爽利乾脆對撞，好似高亢直白嘅狂熱歌聲，分分秒秒都在為你疲憊嘅神經進行一次爽快嘅鬆綁。而家，等呢首《敢愛敢做》陪住你，我哋慢慢釋懷。'},
    'Champs-Élysées':{...radioDataDictionary['Champs-Élysées'],text:'呢杯 Champs-Élysées 完美融合咗法國嘅標誌性風味。沙特酒嘅百里香同紫羅蘭香氣刺破白蘭地嘅沉悶，喺氣泡中升騰。等你在微醺嘅花香入面，短暫放低重擔，搵返好耐冇見嘅少女心。而家，聽下呢首《少女的祈禱》，呢一刻唔使急住去忘記啲咩。'},
    'Brandy Alexander':{...radioDataDictionary['Brandy Alexander'],text:'呢杯 Brandy Alexander 擁有可可濃郁嘅焦香，同鮮奶油交織。濃郁嘅可可焦香同鮮奶油交織出絲絨般嘅觸感，入口係一首治癒系嘅溫暖小甜歌。冇酒精嘅攻擊性，畀白天付出太多嘅你一個最溫柔嘅熱量擁抱。而家，呢一首《香濃》，送畀呢一刻可以不完美嘅你。'},
    'Cosmopolitan':{...radioDataDictionary.Cosmopolitan,text:'呢杯 Cosmopolitan 擁有朦朧嘅粉紅色。大都會天然帶有一種含蓄卻高級嘅現代都市感，蔓越莓嘅酸甜果香就好似那些藏在柴米油鹽之下、想要對自己或者愛人輕輕講出嘅呢喃表白。而家，等呢首《借你耳朵說愛你》陪住你，我哋慢慢釋懷。'},
    'Expresso Martini':{...radioDataDictionary['Expresso Martini'],text:'呢杯 Expresso Martini 嘅信條係：等我清醒，再等我不省人事。現磨濃縮咖啡嘅焦香撞擊伏特加嘅純淨力量，等人在清醒同微醺之間游走。一口落去，用濃郁嘅烘焙感為疲憊嘅大腦物理續命。而家，聽下呢首《暗戀航空》，呢一刻唔使急住去忘記啲咩。'},
    'Moscow Mule':{...radioDataDictionary['Moscow Mule'],text:'呢杯 Moscow Mule 帶有生薑嘅辛辣同青檸嘅酸爽。青春愛戀嘅酸澀同心碎，伴隨住碳酸氣泡消散在空氣入面，只留低生薑嘅厚重辛辣。而家，呢一首《只有你不知道》，送畀呢一刻可以不完美嘅你。'},
    'Paloma':{...radioDataDictionary.Paloma,text:'呢杯 Paloma 將清爽酸甜同微苦完美結合。西柚汁嘅植物果皮微苦同清爽酸甜完美結合，跟住高亢清脆嘅歌聲，在一汪濕潤、多汁嘅水生綠意入面大口呼吸。而家，等呢首《Where Did U Go》陪住你，我哋慢慢釋懷。'},
    'El Diablo':{...radioDataDictionary['El Diablo'],text:'呢杯 El Diablo 就好似一杯黑化咗嘅漿果藥水，融合咗美食調、東方調同果香調。黑醋栗深邃神秘嘅漿果甜香，碰撞生薑啤酒冰爽嘅氣泡。用一抹鬼馬嘅漿果風味，釋放心中無聲嘅叛逆。而家，聽下呢首《多情》，呢一刻唔使急住去忘記啲咩。'},
    'Rosita':{...radioDataDictionary.Rosita,text:'呢杯 Rosita 將荒漠植物泥土香同辛辣感包裹在苦甜西普外衣度。龍舌蘭原始嘅攻擊性被包裹在金巴利同紅美思嘅苦甜外衣入面。入口風味複雜深邃，平靜嘅表面下全是不妥協嘅暗湧。而家，呢一首《暗湧》，送畀呢一刻可以不完美嘅你。'}
  });
  const englishText = {
    'Ramos Gin Fizz':'This Ramos Gin Fizz turns cream and egg white into a liquid dessert. Orange blossom and rich cream create a warm, powdery embrace, softening the edge of alcohol. Now, let Just for Keeping You be your gentle permission to be imperfect.',
    'Gin Tonic':'This Gin Tonic is crisp with juniper, quinine, and a cool herbal bitterness. Green and chypre notes stretch into a clear, stubborn kind of relief. Let Cool Love stay with you while everything slowly settles.',
    'Dry Martini':'With no sweetness to hide behind, this Dry Martini is all clean herbs and juniper. It keeps a cool, private space just for you. There is no need to rush into forgetting anything tonight.',
    'Negroni':'This Negroni balances bitterness, sweetness, and depth without becoming heavy. Campari and sweet vermouth meet like the many joys and sorrows gathered through the years. This is Thousand Thousand Songs, for your unhurried night.',
    'Mojito':'Crushed ice, mint, and a light sweetness make this Mojito feel like a summer breeze. Its fresh green clarity gently loosens what the day has left on your shoulders. Let Friends keep you company.',
    'Hemingway Daiquiri':'A touch of grapefruit bitterness and ripe fruit turns this Hemingway Daiquiri into a slow, rewarding aftertaste. The tiredness of ordinary life can become something softer with time. Let When the Grapes Ripe play on.',
    'Piña Colada':'Coconut cream and juicy pineapple make this Piña Colada a bright, carefree holiday in a glass. Let its sweetness bring back a little of your long-missed, lively self. This is An Anxious Heart for you.',
    "Dark 'N' Stormy":'Dark caramel sweetness meets the sharp lift of ginger beer in this Dark N Stormy. It is like a heartbreaking song sung in the softest voice, then gently comforted by dark rum. Let Acrobatics stay by your side.',
    'Old Fashioned':'Mature grain, oak, and smoke settle slowly around a large cube of ice. This Old Fashioned is a quiet, grounded companion for the most tiring hours. Let The Lying Lover give you room to breathe.',
    'Irish Coffee':'Rich black coffee meets whiskey beneath a light layer of whipped cream. This Irish Coffee moves between warmth and coolness like a tender late-night embrace. This is The Silhouette, made gently for you.',
    'Paper Plane':'Sweet, sour, and bitter meet in balance in this Paper Plane. Like a paper plane lifting through difficult weather, it reminds you that a new direction is always possible. Let Wedding Invitation Street carry you onward.',
    'Penicillin':'Peaty smoke is wrapped in ginger and honey in this Penicillin. Its warmth is a small source of courage when you are standing at a complicated crossroads. Let Traffic Light help you find your way forward.',
    'Sazerac':'Sweetness, strength, and a lingering herbal bitterness give this Sazerac its long story. It holds love, gratitude, and all the feelings that settle deep in the bones. This is Really Love You, for your night.',
    'Stinger':'Velvety brandy meets bright, cooling mint in this Stinger. The contrast is a clean release for a tired mind. Let Dare to Love, Dare to Do loosen one more knot for you.',
    'Champs-Élysées':'Thyme and violet rise through the bubbles of this Champs-Élysées, brightening the weight of brandy. It is a fragrant pause where you can set something down and meet your younger self again. Let A Maiden’s Prayer play.',
    'Brandy Alexander':'Cocoa roast and fresh cream give this Brandy Alexander a velvet texture and a warm, gentle sweetness. It asks nothing of you and simply offers an embrace. This is Deeply Sweet, for this tender moment.',
    'Cosmopolitan':'This Cosmopolitan carries the soft pink glow and tart sweetness of cranberry. It feels like a quiet confession saved beneath the routines of everyday life. Let Lend Me Your Ears to Say I Love You keep you company.',
    'Expresso Martini':'Fresh espresso meets the clean strength of vodka in this Expresso Martini. It travels between wakefulness and a soft buzz, giving a tired mind one more small charge. Let Unrequited Love Airways play on.',
    'Moscow Mule':'Ginger heat and lime brightness make this Moscow Mule both sharp and refreshing. Like young love fading into the air with bubbles, it leaves a warm, spicy finish. This is Only You Don’t Know, for you.',
    'Paloma':'Bright grapefruit, a little bitterness, and watery green freshness make this Paloma a deep breath in a glass. Follow its clear melody and let the night open up around you. Let Where Did U Go stay near.',
    'El Diablo':'This El Diablo is a dark berry potion with a cool, sparkling ginger-beer edge. It gives a little room to the quiet rebellion inside you. Let Passionate turn softly in the background.',
    'Rosita':'Earthy desert botanicals and peppery warmth are wrapped in a bittersweet chypre coat in this Rosita. Beneath its calm surface is a deep current that will not surrender. This is Undercurrent for your night.'
  };
  Object.entries(englishText).forEach(([drink,enText])=>{ if(radioDataDictionary[drink]) radioDataDictionary[drink].enText=enText; });
  let introAudio, detailAudio, bgmAudio, active = false, paused = false, loopMode = false;
  const stopAll = () => { [introAudio,detailAudio,bgmAudio].forEach(a=>{if(a){a.pause();a.currentTime=0}}); active=false; paused=false; };
  const currentAudio = () => !introAudio?.ended ? introAudio : detailAudio;
  const pausePlayback = () => { if(!active||paused)return;const current=currentAudio();if(!current)return;current.pause();bgmAudio?.pause();paused=true; };
  const resumePlayback = () => { if(!active||!paused)return;const current=currentAudio();if(!current)return;current.play().catch(()=>{});bgmAudio?.play().catch(()=>{});paused=false; };
  const toggleLoop = () => { loopMode=!loopMode; if(detailAudio) detailAudio.loop=loopMode; return loopMode; };
  const typeAppend = (text,done) => { const api=window.tapeRadio;if(!api)return;api.crt.classList.remove('waiting');let i=0;const timer=setInterval(()=>{api.terminal.textContent+=text[i++]||'';api.terminal.parentElement.scrollTop=api.terminal.parentElement.scrollHeight;if(i>=text.length){clearInterval(timer);done?.()}},28); };
  const fadeIn = audio => { audio.volume=0; audio.play().catch(()=>{}); const timer=setInterval(()=>{audio.volume=Math.min(.15,audio.volume+.01);if(audio.volume>=.15)clearInterval(timer)},90); };
  const startBroadcast = () => {
    const api=window.tapeRadio;if(!api?.state.result||!api.deck.classList.contains('has-tape')||active)return;
    const item=radioDataDictionary[api.state.result.drink]; if(!item)return;
    active=true; api.deckWrapper.classList.add('monitor-active'); api.terminal.textContent='';
    introAudio=new Audio(INTRO_PATH); detailAudio=new Audio(item.audioPath); detailAudio.loop=loopMode; introAudio.preload='auto'; detailAudio.preload='auto'; introAudio.load(); detailAudio.load();
    introAudio.addEventListener('ended',()=>{ typeAppend('\n\n— 專屬特調訊號 —\n'+item.text+'\n\n— ENGLISH TRANSLATION —\n'+item.enText); detailAudio.play().catch(()=>{}); if(item.bgmPath){bgmAudio=new Audio(item.bgmPath);bgmAudio.loop=true;fadeIn(bgmAudio)} });
    detailAudio.addEventListener('ended',()=>{active=false;bgmAudio?.pause()});
    const audioError = () => { active=false; api.terminal.textContent='音訊檔案無法讀取。請用「index.html」或「tape-radio-v3-interactive.html」開啟網站，並確認 audio 資料夾與頁面放在同一層。'; };
    introAudio.addEventListener('error',audioError,{once:true}); detailAudio.addEventListener('error',audioError,{once:true});
    typeAppend(INTRO_TEXT+'\n\n— ENGLISH TRANSLATION —\n'+INTRO_EN_TEXT); introAudio.play().catch(audioError);
  };
  window.tapeRadioAudio={radioDataDictionary,startBroadcast,stopAll,pausePlayback,resumePlayback,toggleLoop};
  const bindControls = () => { const reset=document.querySelector('#resetBtn'); reset?.addEventListener('click',stopAll); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindControls,{once:true}); else bindControls();
  // One physical cassette key can stay down at a time. PLAY resumes, PAUSE only pauses.
  document.addEventListener('click',event=>{ const key=event.target.closest?.('.piano-key'); if(!key)return; const api=window.tapeRadio; const action=key.dataset.action; const deck=key.closest('.cassette-deck-right'); deck?.querySelectorAll('.piano-key').forEach(button=>button.classList.remove('vc-control-pressed')); key.classList.add('vc-control-pressed'); if(action==='play'){if(paused)resumePlayback();else startBroadcast()} if(action==='pause')pausePlayback(); if(action==='loop'){key.classList.toggle('loop-active',toggleLoop())} if(action==='door'&&api?.deck){api.deck.classList.toggle(api.deck.classList.contains('has-tape')?'door-manual-open':'door-open')}; });
})();
