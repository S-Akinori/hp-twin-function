import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2025-02-19'})
const slug = 'mobile-battery-ac-output'
const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{_id,title}`, {slug})
if (existing) throw new Error(`Article already exists: ${existing._id} ${existing.title}`)

const upload = (file, label) => client.assets.upload('image', createReadStream(resolve(file)), {filename: label})
const hero = await upload('../public/images/articles/mobile-battery-ac-output-hero.png', 'mobile-battery-ac-output-hero.png')
const flow = await upload('../public/images/articles/ac-output-decision-flow.svg', 'ac-output-decision-flow.svg')
const watts = await upload('../public/images/articles/ac-output-w-wh-guide.svg', 'ac-output-w-wh-guide.svg')

let n = 0
const key = (prefix = 'aco') => `${prefix}${String(++n).padStart(4, '0')}`
const block = (text, style = 'normal', options = {}) => ({_key:key(),_type:'block',style,markDefs:[],children:[{_key:key(),_type:'span',text,marks:[]}],...options})
const bullet = (text) => block(text, 'normal', {listItem:'bullet',level:1})
const number = (text) => block(text, 'normal', {listItem:'number',level:1})
const linkBlock = (before, label, href, after = '') => { const mark=key('link'); return {_key:key(),_type:'block',style:'normal',markDefs:[{_key:mark,_type:'link',href,newWindow:true}],children:[{_key:key(),_type:'span',text:before,marks:[]},{_key:key(),_type:'span',text:label,marks:[mark]},{_key:key(),_type:'span',text:after,marks:[]}]}}
const image = (asset, alt, caption) => ({_key:key('img'),_type:'image',asset:{_type:'reference',_ref:asset._id},alt,caption})

const body = [
  block('「AC出力付きのモバイルバッテリーなら、家のコンセントと同じように何でも使える？」と迷っていませんか。結論からいうと、スマートフォンやUSB-C対応ノートPCの充電だけならAC出力は不要なことが多く、USB-C PD対応モデルのほうが軽く、変換ロスも少ないのが一般的です。'),
  block('一方、電気毛布、小型テレビ、カメラ用充電器など、コンセントからしか給電できない機器を屋外や停電時に使うなら、AC出力付きのポータブル電源が役立ちます。この記事では、AC出力がある理由、必要な場面、W・Whの選び方、注意点、現行の代表モデルをわかりやすく解説します。'),

  block('モバイルバッテリーのAC出力とは？', 'h2'),
  block('AC出力とは、バッテリーに蓄えた直流（DC）の電気を、インバーターで家庭用コンセントに近い交流（AC）へ変換して取り出す機能です。一般的なモバイルバッテリーはUSB-AやUSB-Cから直流のまま給電しますが、AC出力付きモデルにはコンセント形状の差込口があり、ACアダプターや家電のプラグを直接挿せます。'),
  block('なお、一般に「モバイルバッテリー」と呼ばれる小型製品より、AC出力を備えた製品は「ポータブル電源」として販売されることが多いです。インバーター、冷却機構、大容量セルが必要なため、本体は大きく重くなります。'),

  block('USBが主流なのに、なぜAC出力があるの？', 'h2'),
  block('理由は、すべての機器がUSB給電に対応しているわけではないからです。家庭用コンセントを前提にした機器や専用ACアダプターを使う機器を、電源のない場所でも動かすためにAC出力が用意されています。'),
  bullet('停電時に照明、小型テレビ、ルーターなどを動かす'),
  bullet('キャンプや車中泊で電気毛布、扇風機、プロジェクターを使う'),
  bullet('撮影現場でカメラ・ドローン用の専用充電器を使う'),
  bullet('屋外作業で小型工具や測定器へ給電する'),
  block('ただし、ACへ変換すると電力の一部が熱などとして失われます。同じノートPCを充電する場合、USB-C PDで直接給電できるなら、ACアダプターを介すより効率がよいことが多いです。'),
  image(flow, 'モバイルバッテリーにAC出力が必要かを判断するフローチャート', 'コンセントが必要か、USB-Cで代替できるか、必要な出力を満たすかの順で判断します。'),

  block('結論：AC出力が必要な人・不要な人', 'h2'),
  block('AC出力が必要になりやすい人', 'h3'),
  bullet('停電時にコンセント式の機器を最低限動かしたい'),
  bullet('キャンプや車中泊で電気毛布・小型家電を使いたい'),
  bullet('USB-Cに対応しない専用充電器を屋外で使う'),
  bullet('複数人・複数機器の電源をまとめて確保したい'),
  block('AC出力が不要になりやすい人', 'h3'),
  bullet('充電するのはスマートフォン、タブレット、イヤホンが中心'),
  bullet('ノートPCがUSB-C PD充電に対応している'),
  bullet('毎日持ち歩くため、軽さと小ささを優先したい'),
  bullet('家電を使う予定がなく、災害時も通信手段の充電が目的'),
  block('スマホ中心なら、AC出力のために本体重量と価格を増やす必要はありません。まずは使いたい機器の入力端子を確認し、USB-C PDで代替できない場合にAC出力を検討するのが合理的です。'),

  block('AC出力付きモデルの選び方：WとWhを混同しない', 'h2'),
  block('製品選びでは、定格出力のW（ワット）と容量のWh（ワット時）を分けて考えます。Wは「どれほど大きな機器を動かせるか」、Whは「どれほど長く使えるか」の目安です。'),
  image(watts, 'AC出力のWと容量のWhの違い、使用時間の計算式', '使用時間の概算は「容量Wh×0.8÷機器の消費電力W」。0.8は変換ロスを見込んだ目安です。'),
  block('たとえば288Whの製品で60Wの電気毛布を使う場合、288×0.8÷60＝約3.8時間が目安です。実際は温度、バッテリーの劣化、機器の制御、変換効率によって前後します。'),
  block('1. 定格出力は機器の最大消費電力より上を選ぶ', 'h3'),
  block('使いたい機器のラベルや取扱説明書で消費電力を確認します。定格300Wの電源に消費電力500Wの機器は原則つなげません。冷蔵庫、ポンプ、モーター搭載機器は起動時に定格より大きな電力を使うことがあるため、瞬間最大出力だけでなくメーカーの対応機器も確認してください。'),
  block('2. 純正弦波を選ぶ', 'h3'),
  block('PC、オーディオ、モーターを含む幅広い機器で使うなら、家庭用電源に近い滑らかな波形の「純正弦波」が基本です。修正正弦波では、機器によって異音、発熱、誤作動が起きる可能性があります。'),
  block('3. 容量は「使うW数×時間」から逆算する', 'h3'),
  block('長時間使いたいほど大容量が必要ですが、そのぶん価格、重量、充電時間も増えます。防災用途なら、何を何時間使うかを先に決めて過不足を抑えましょう。'),

  block('AC出力で使いやすい機器・使いにくい機器', 'h2'),
  block('300W前後の小型モデルで候補になりやすい機器', 'h3'),
  bullet('ノートPCやカメラのACアダプター'),
  bullet('LED照明、Wi-Fiルーター、小型テレビ'),
  bullet('消費電力の低い電気毛布、扇風機'),
  bullet('小型プロジェクター、ゲーム機'),
  block('小型モデルでは避けたい機器', 'h3'),
  bullet('ドライヤー、電気ケトル、電子レンジ、IH調理器'),
  bullet('大型冷蔵庫、エアコン、電気ストーブ'),
  bullet('定格を超える電動工具や、起動電力が不明な機器'),
  block('ヒーターで熱を作る家電は消費電力が大きく、300Wクラスではほぼ使えません。高出力モデルでも短時間で容量を消費するため、「動くか」と「実用的な時間使えるか」を別々に確認してください。医療機器や生命維持に関わる機器は、一般的なポータブル電源へ安易に接続せず、機器メーカーの指示に従ってください。'),

  block('AC出力付きの代表的なポータブル電源3選', 'h2'),
  block('ここでは、持ち運びやすい約288Whクラスを中心に、2026年7月28日時点でメーカー公式情報を確認できる代表例を紹介します。価格・在庫・仕様は変更されるため、購入前に公式ページで再確認してください。'),
  block('Anker Solix C300 Portable Power Station', 'h3'),
  block('容量288Wh、AC定格300W、ACポート3口の小型モデルです。USB-Cは最大140W出力に対応し、コンセント式機器とUSB-C機器をまとめて使いたい人に向きます。重量は約4.1kgで、AC出力のない「C300 DC」とは別製品なので、型番を間違えないよう注意してください。'),
  linkBlock('仕様の確認：', 'Anker公式「Solix C300 Portable Power Station」', 'https://www.ankerjapan.com/pages/solix-a1722'),
  block('EcoFlow RIVER 3', 'h3'),
  block('容量230Wh、定格出力300Wのコンパクトモデルです。小型家電のバックアップや静音性を重視する人の候補になります。容量が288Wh級より少ないため、長時間運転よりも、短時間の停電対策や持ち運びやすさを優先する用途に向きます。'),
  linkBlock('仕様の確認：', 'EcoFlow公式「RIVER 3」', 'https://jp.ecoflow.com/products/river-3-portable-power-station'),
  block('Jackery ポータブル電源 300 New', 'h3'),
  block('2026年6月発売の販路限定モデルで、容量288Wh、定格出力300W、ACポート2口、重量約3.7kgです。UPS機能を備え、小型モデルでもACポート数と停電時の切り替えを重視する人の候補です。販売店が限られるため、在庫は取扱店で確認してください。'),
  linkBlock('仕様の確認：', 'Jackery公式「ポータブル電源 300 New」発表', 'https://www.jackery.jp/blogs/news/jackery-news20260604'),
  block('おすすめは用途で変わります。USB-Cも多用するならAnker、軽負荷と静音性ならEcoFlow、AC 2口とUPS機能を重視するならJackeryが比較の起点になります。最終的には、接続予定機器のW数、必要時間、端子数、重量、保証・回収体制で選んでください。'),

  block('購入前の7項目チェックリスト', 'h2'),
  number('使いたい機器はUSB-Cで代替できないか'),
  number('機器の最大消費電力・起動電力を定格出力が上回るか'),
  number('必要時間を満たすWh容量があるか'),
  number('AC波形は純正弦波か、周波数50Hz・60Hzに対応するか'),
  number('AC口数、USB-C出力、同時使用時の合計出力は十分か'),
  number('PSE表示、国内サポート、保証、回収方法を確認したか'),
  number('実際に持ち運べる重量・サイズか'),

  block('AC出力を安全に使う注意点', 'h2'),
  bullet('本体の吸排気口をふさがず、布団やバッグの中で使わない'),
  bullet('雨、水ぬれ、高温、直射日光、落下、強い圧迫を避ける'),
  bullet('たこ足配線で定格を超えないよう、合計消費電力を確認する'),
  bullet('膨らみ、異臭、異音、異常発熱があれば直ちに使用を中止する'),
  bullet('充電しながら給電する場合は、メーカーがパススルー利用を認めているか確認する'),
  block('AC出力は便利ですが、家庭の壁コンセントと同じ無制限の電源ではありません。出力上限と残容量を意識し、取扱説明書の禁止事項を優先してください。'),

  block('よくある質問', 'h2'),
  block('Q. AC出力付きモバイルバッテリーでドライヤーは使える？', 'h3'),
  block('300W前後の小型モデルでは使えません。一般的なドライヤーは1000Wを超えるものが多く、高出力モデルでもバッテリーを急速に消費します。機器の消費電力と電源の定格出力を必ず照合してください。'),
  block('Q. ノートPCにはAC出力が必要？', 'h3'),
  block('USB-C PD充電に対応するPCなら不要なことが多いです。PCが求めるW数に対応したUSB-Cポートとケーブルを使えば、ACアダプターを介さず充電できます。専用プラグしか使えないPCではAC出力が必要です。'),
  block('Q. 定格300Wなら300Wの機器を必ず使える？', 'h3'),
  block('必ずとは限りません。起動時に大きな電力を使う機器、波形に敏感な機器、同時接続による合計出力超過があります。余裕を持った定格出力を選び、メーカーの対応機器一覧も確認してください。'),
  block('Q. AC出力を使うとバッテリーが早く減る？', 'h3'),
  block('DCからACへの変換ロスがあるため、USBから直接給電する場合より減りやすくなることがあります。USB-Cで代替できる機器はUSB-Cを優先すると効率的です。'),

  block('まとめ：AC出力は「コンセントが必要な機器」に絞って選ぶ', 'h2'),
  block('AC出力付きモバイルバッテリー（ポータブル電源）は、停電、キャンプ、車中泊などでコンセント式機器を使えるのが最大のメリットです。ただし、スマホやUSB-C対応ノートPCの充電が中心なら、AC出力は一般的に不要です。'),
  block('購入前は、使いたい機器の最大消費電力に対して定格出力Wが足りるか、必要時間に対して容量Whが足りるかを確認しましょう。AC出力の有無だけでなく、純正弦波、端子、重量、保証、安全表示まで比べることで、自分に合う一台を選べます。'),
  block('※本記事は2026年7月28日時点のメーカー公式情報をもとに作成しています。仕様・価格・在庫は変更される場合があります。製品ごとの取扱説明書と最新の公式情報を優先してください。'),
]

const doc = await client.create({_type:'post',title:'AC出力付きモバイルバッテリーは必要？使える家電・選び方・おすすめ3選',slug:{_type:'slug',current:slug},excerpt:'AC出力付きモバイルバッテリーが必要な人・不要な人を解説。USB-Cとの違い、W・Whの選び方、使える家電、注意点、現行のおすすめポータブル電源3モデルまで紹介します。',publishedAt:'2026-07-28T00:00:00.000Z',mainImage:{_type:'image',asset:{_type:'reference',_ref:hero._id},alt:'ACコンセントとUSB-C端子を備え、ノートPCと照明へ給電する小型ポータブル電源'},body,seo:{_type:'seo',title:'AC出力付きモバイルバッテリーは必要？選び方とおすすめ',description:'AC出力付きモバイルバッテリーが必要な人を解説。USB-Cとの違い、W・Wh、使える家電、選び方、現行おすすめ3製品を比較します。',image:{_type:'image',asset:{_type:'reference',_ref:hero._id}},noIndex:false}})
console.log(JSON.stringify({documentId:doc._id,slug,assets:[hero._id,flow._id,watts._id]},null,2))
