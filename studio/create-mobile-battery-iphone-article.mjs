import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2025-02-19'})
const slug = 'iphone-mobile-battery'
const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{_id,title}`, {slug})
if (existing) throw new Error(`Article already exists: ${existing._id} ${existing.title}`)

const upload = (file, label) => client.assets.upload('image', createReadStream(resolve(file)), {filename: label})
const hero = await upload('../public/images/articles/mobile-battery-iphone-hero.png', 'mobile-battery-iphone-hero.png')
const connector = await upload('../public/images/articles/iphone-mobile-battery-connector-guide.svg', 'iphone-mobile-battery-connector-guide.svg')
const capacity = await upload('../public/images/articles/iphone-mobile-battery-capacity-guide.svg', 'iphone-mobile-battery-capacity-guide.svg')

let n = 0
const key = (prefix = 'iph') => `${prefix}${String(++n).padStart(4, '0')}`
const block = (text, style = 'normal', options = {}) => ({_key:key(),_type:'block',style,markDefs:[],children:[{_key:key(),_type:'span',text,marks:[]}],...options})
const bullet = (text) => block(text, 'normal', {listItem:'bullet',level:1})
const number = (text) => block(text, 'normal', {listItem:'number',level:1})
const linkBlock = (before, label, href, after = '') => { const mark=key('link'); return {_key:key(),_type:'block',style:'normal',markDefs:[{_key:mark,_type:'link',href,newWindow:true}],children:[{_key:key(),_type:'span',text:before,marks:[]},{_key:key(),_type:'span',text:label,marks:[mark]},{_key:key(),_type:'span',text:after,marks:[]}]}}
const image = (asset, alt, caption) => ({_key:key('img'),_type:'image',asset:{_type:'reference',_ref:asset._id},alt,caption})

const body = [
  block('iPhone用のモバイルバッテリーは、機種に合う端子、必要な容量、充電速度の3点を押さえれば迷いません。iPhone 15以降はUSB-C、iPhone 14以前はLightningが基本です。iPhone 12以降の対応モデルなら、背面に装着するMagSafe・Qi2対応タイプも候補になります。'),
  block('結論からいうと、毎日の予備電源には5,000mAh、1日外出するなら10,000mAh、旅行や複数台の充電には20,000mAhが目安です。迷ったら「10,000mAh・USB PD 20W以上・自分のiPhoneに合う端子」を基準にすると、容量と携帯性のバランスを取りやすいでしょう。'),

  block('iPhone用モバイルバッテリーの選び方【結論】', 'h2'),
  number('端子を確認する：iPhone 15以降はUSB-C、iPhone 14以前はLightning'),
  number('容量を決める：軽さなら5,000mAh、標準は10,000mAh、長時間なら20,000mAh'),
  number('出力を見る：急速充電を重視するならUSB PD対応・20W以上を目安にする'),
  number('充電方法を選ぶ：効率重視は有線、取り回し重視はMagSafe・Qi2'),
  number('安全性を確認する：PSE表示、保護機能、保証、回収方法をチェックする'),
  block('「iPhone対応」と書かれているだけで決めると、ケーブルが合わない、思ったより充電できない、充電が遅いといった失敗につながります。以下で順番に確認しましょう。'),

  block('まずiPhoneの端子を確認する', 'h2'),
  image(connector, 'iPhone 15以降はUSB-C、iPhone 14以前はLightning、対応機種はMagSafeも選べる', 'iPhoneの機種と使い方に合わせて、USB-C・Lightning・MagSafe／Qi2から選びます。'),
  block('iPhone 15以降はUSB-C', 'h3'),
  block('iPhone 15以降のモデルはUSB-Cコネクタを搭載しています。USB-C出力のモバイルバッテリーとUSB-Cケーブルを組み合わせれば充電でき、USB Power Delivery（USB PD）対応モデルなら高速充電も利用しやすくなります。ケーブル一体型や折りたたみ式USB-C端子の製品なら、持ち物を減らせます。'),
  linkBlock('端子の公式情報：', 'Apple「iPhoneのUSB-Cコネクタで充電および接続する」', 'https://support.apple.com/ja-jp/105099'),
  block('iPhone 14以前はLightning', 'h3'),
  block('iPhone 14以前の多くはLightningコネクタです。急速充電には、USB-C出力のモバイルバッテリーとUSB-C－Lightningケーブルを使います。モバイルバッテリー側にUSB-C端子しかない場合、USB-A－Lightningケーブルでは接続できないため注意してください。今後USB-C搭載iPhoneへ機種変更する予定なら、USB-Cポートも備えた製品を選ぶと長く使えます。'),
  linkBlock('充電速度の公式情報：', 'Apple「iPhoneの充電速度について」', 'https://support.apple.com/ja-jp/120619'),
  block('MagSafe・Qi2はケーブル不要で使いやすい', 'h3'),
  block('対応するiPhoneでは、磁力で背面に固定するMagSafe・Qi2対応モバイルバッテリーも便利です。充電しながら手に持ちやすく、ケーブルの抜き差しも不要です。一方で、ワイヤレス充電は有線より電力ロスや発熱が生じやすく、同じ容量でも実際に使える電力量が少なくなりがちです。ケースを付ける場合は、MagSafe・Qi2対応ケースかも確認してください。'),
  linkBlock('対応モデルと注意点：', 'Apple「iPhoneでMagSafe充電器を使う方法」', 'https://support.apple.com/ja-jp/105047'),

  block('容量は5,000mAh・10,000mAh・20,000mAhのどれ？', 'h2'),
  image(capacity, 'iPhone用モバイルバッテリーの5000mAh・10000mAh・20000mAh用途比較', '日常の継ぎ足し充電なら5,000mAh、迷ったら10,000mAh、長時間・複数台なら20,000mAhが目安です。'),
  block('モバイルバッテリーの表示容量を、そのままiPhoneへ移せるわけではありません。電圧変換、ケーブル、発熱などでロスが生じるためです。概算は「モバイルバッテリー容量×0.6〜0.8÷iPhoneのバッテリー容量」で考えられます。ワイヤレス充電やスマホを使いながらの充電では、さらに効率が下がる場合があります。'),
  block('5,000mAh：軽量で毎日の継ぎ足し充電向け', 'h3'),
  block('通勤・通学や短時間の外出で、帰宅まで電池をつなぎたい人に向きます。約100〜150gの小型モデルが多く、ポケットや小さなバッグへ入れやすいのが魅力です。ただし、大型iPhoneでは満充電1回に届かないことがあります。'),
  block('10,000mAh：迷ったときの標準容量', 'h3'),
  block('1日外出、動画視聴、撮影、地図アプリの利用が多い人におすすめです。近年のiPhoneをおおむね1回以上充電できる余裕を持ちやすく、サイズと容量のバランスに優れます。複数ポートがあれば、AirPodsなどの周辺機器も一緒に充電できます。'),
  block('20,000mAh：旅行・出張・複数台向け', 'h3'),
  block('連泊、家族との共用、災害への備えには安心感があります。一方、300〜500g前後になる製品もあり、毎日持ち歩くには重さが負担です。ノートPCにも使いたい場合は、容量だけでなく45W・65Wなど必要なUSB PD出力を確認してください。'),

  block('急速充電はUSB PD 20W以上が目安', 'h2'),
  block('短時間でiPhoneを充電したいなら、USB-C出力がUSB Power Deliveryに対応し、単ポートで20W以上出せるかを確認します。「合計30W」でも、複数台を同時につなぐと1台あたりの出力が下がる製品があります。商品ページの単ポート出力と、同時充電時の配分を見ましょう。'),
  bullet('有線を優先する人：充電速度と変換効率を重視したい'),
  bullet('MagSafe・Qi2を選ぶ人：ケーブルなしの取り回しを重視したい'),
  bullet('充電しながらiPhoneを使う人：薄さ、重さ、ケーブル位置、発熱しにくさを確認する'),
  block('容量を示すmAhと、充電速度を示すWは別の指標です。10,000mAhでも出力が小さければ充電は遅く、5,000mAhでも20W出力なら対応iPhoneを素早く充電できます。'),

  block('iPhone向けおすすめモバイルバッテリー3選', 'h2'),
  block('ここでは、端子・容量・充電方法の違いが明確な3タイプを紹介します。価格・在庫・仕様は変わるため、購入時はメーカー公式ページで最新情報を確認してください。'),
  block('iPhone 15以降・軽さ重視：Anker Nano Power Bank（22.5W, Built-In USB-C Connector）', 'h3'),
  block('折りたたみ式USB-C端子を備えた5,000mAhモデルです。公式仕様は約102g、最大22.5W出力。ケーブルなしでiPhone 15以降へ直接挿せるため、短時間の外出や通勤用に向きます。厚いケースや端子穴が狭いケースでは干渉する場合がある点を確認してください。'),
  linkBlock('製品仕様：', 'Anker公式「Anker Nano Power Bank（22.5W, Built-In USB-C Connector）」', 'https://www.ankerjapan.com/products/a1653'),
  block('LightningもUSB-Cも使う：Anker Zolo Power Bank（10000mAh, 30W, Built-In USB-C / ライトニングケーブル）', 'h3'),
  block('USB-CとLightningの一体型ケーブルを備えた10,000mAhモデルです。公式仕様は約220g、単ポート最大30W。iPhone 14以前とiPhone 15以降が混在する家庭や、機種変更前後でも1台を使い続けたい人に向きます。複数台同時充電時は合計出力が分配されます。'),
  linkBlock('製品仕様：', 'Anker公式「Anker Zolo Power Bank（10000mAh, 30W, Built-In USB-C / ライトニングケーブル）」', 'https://www.ankerjapan.com/products/a110ln13'),
  block('ケーブルなし・薄型重視：Anker Nano Power Bank（5000mAh, MagGo, Slim）', 'h3'),
  block('Qi2対応スマートフォンへ最大15Wでワイヤレス充電できる5,000mAhモデルです。底面のUSB-Cポートは最大20W入出力に対応します。背面へ装着したまま操作しやすい一方、ワイヤレスでは大型iPhoneを満充電1回にできない場合があります。対応モデルとケースを確認してください。'),
  linkBlock('製品仕様：', 'Anker公式「Anker Nano Power Bank（5000mAh, MagGo, Slim）」', 'https://www.ankerjapan.com/products/a1665'),

  block('買う前に確認したい7項目', 'h2'),
  bullet('自分のiPhoneがUSB-CかLightningか'),
  bullet('必要容量が5,000mAh・10,000mAh・20,000mAhのどれか'),
  bullet('USB PD対応と単ポート最大出力'),
  bullet('本体の重さ・厚み・ケーブルの有無'),
  bullet('MagSafe・Qi2対応モデルとケースか'),
  bullet('PSE表示、過充電・過電流・短絡・温度保護機能'),
  bullet('保証期間、国内サポート、使用後の回収方法'),
  block('モバイルバッテリーはリチウムイオン蓄電池を搭載します。経済産業省は、購入時にPSEマークを確認し、強い衝撃や高温を避け、異常があれば使用を中止するよう案内しています。極端に安い無名製品だけでなく、表示・保証・問い合わせ先まで確認しましょう。'),
  linkBlock('安全情報：', '経済産業省「リチウムイオン蓄電池搭載製品の事故に気をつけましょう！」', 'https://www.meti.go.jp/product_safety/consumer/lithium_ion_battery.html'),

  block('よくある質問', 'h2'),
  block('Q. iPhone用は何mAhがおすすめですか？', 'h3'),
  block('迷ったら10,000mAhがおすすめです。軽さを最優先し、夕方までの継ぎ足し充電だけなら5,000mAh、旅行・出張・複数台なら20,000mAhを検討してください。'),
  block('Q. iPhone 15以降はLightningケーブルを使えますか？', 'h3'),
  block('iPhone 15以降の本体端子はUSB-Cです。Lightningケーブルを本体へ直接挿すことはできません。USB-CケーブルまたはUSB-C端子一体型モバイルバッテリーを使います。'),
  block('Q. MagSafe対応ならどのiPhoneでも使えますか？', 'h3'),
  block('いいえ。MagSafeの磁力固定や高速ワイヤレス充電への対応は機種で異なります。ケースの厚みや磁石の有無でも吸着力・充電効率が変わるため、Appleと製品メーカー双方の対応表を確認してください。'),
  block('Q. モバイルバッテリーでiPhoneの電池は劣化しますか？', 'h3'),
  block('適合する製品を通常どおり使う限り、モバイルバッテリーだから直ちに劣化するわけではありません。ただし、高温状態は電池に負担をかけます。直射日光や炎天下の車内を避け、異常発熱時は充電を中止してください。'),

  block('まとめ：端子・10,000mAh・20W以上を基準に選ぶ', 'h2'),
  block('iPhone用モバイルバッテリーは、まず端子を確認します。iPhone 15以降はUSB-C、iPhone 14以前はLightningが基本です。次に、軽さなら5,000mAh、迷ったら10,000mAh、旅行や複数台なら20,000mAhを目安にします。急速充電を重視するならUSB PD対応・単ポート20W以上も確認しましょう。'),
  block('MagSafe・Qi2はケーブル不要で快適ですが、効率や発熱、対応機種・ケースの確認が必要です。容量だけでなく、端子、出力、重さ、PSE表示、保証まで比較すれば、今のiPhoneにも次の機種変更にも使いやすい1台を選べます。'),
  block('※本記事は2026年9月9日時点の情報をもとに作成しています。製品仕様・価格・在庫・対応機種は変更される場合があるため、Appleおよびメーカーの最新案内を優先してください。'),
]

const doc = await client.create({
  _type:'post',
  title:'iPhone対応モバイルバッテリーの選び方｜容量・端子・MagSafe・おすすめ3選',
  slug:{_type:'slug',current:slug},
  excerpt:'iPhone用モバイルバッテリーの選び方を、USB-C・Lightning・MagSafe、容量、急速充電、安全性から解説。用途別のおすすめ3製品も紹介します。',
  publishedAt:'2026-09-09T00:00:00.000Z',
  mainImage:{_type:'image',asset:{_type:'reference',_ref:hero._id},alt:'iPhone向けのUSB-C・Lightning・MagSafe対応モバイルバッテリーを比較するイメージ'},
  body,
  seo:{
    _type:'seo',
    title:'iPhone対応モバイルバッテリーの選び方｜おすすめ3選',
    description:'iPhone用モバイルバッテリーの選び方を解説。USB-C・Lightning・MagSafe、5000mAh・10000mAhの違いとおすすめ3製品がわかります。',
    image:{_type:'image',asset:{_type:'reference',_ref:hero._id}},
    noIndex:false,
  },
})

console.log(JSON.stringify({documentId:doc._id,slug,assets:[hero._id,connector._id,capacity._id]}, null, 2))
