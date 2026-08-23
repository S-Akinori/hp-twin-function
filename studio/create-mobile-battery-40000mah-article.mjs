import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2025-02-19'})
const slug = 'mobile-battery-40000mah'
const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{_id,title}`, {slug})
if (existing) throw new Error(`Article already exists: ${existing._id} ${existing.title}`)

const upload = (file, label) => client.assets.upload('image', createReadStream(resolve(file)), {filename: label})
const hero = await upload('../public/images/articles/mobile-battery-40000mah-hero.png', 'mobile-battery-40000mah-hero.png')
const charges = await upload('../public/images/articles/mobile-battery-40000mah-charge-guide.svg', 'mobile-battery-40000mah-charge-guide.svg')
const flight = await upload('../public/images/articles/mobile-battery-40000mah-flight-rule.svg', 'mobile-battery-40000mah-flight-rule.svg')

let n = 0
const key = (prefix = 'mb4') => `${prefix}${String(++n).padStart(4, '0')}`
const block = (text, style = 'normal', options = {}) => ({_key:key(),_type:'block',style,markDefs:[],children:[{_key:key(),_type:'span',text,marks:[]}],...options})
const bullet = (text) => block(text, 'normal', {listItem:'bullet',level:1})
const number = (text) => block(text, 'normal', {listItem:'number',level:1})
const linkBlock = (before, label, href, after = '') => { const mark=key('link'); return {_key:key(),_type:'block',style:'normal',markDefs:[{_key:mark,_type:'link',href,newWindow:true}],children:[{_key:key(),_type:'span',text:before,marks:[]},{_key:key(),_type:'span',text:label,marks:[mark]},{_key:key(),_type:'span',text:after,marks:[]}]}}
const image = (asset, alt, caption) => ({_key:key('img'),_type:'image',asset:{_type:'reference',_ref:asset._id},alt,caption})

const body = [
  block('40,000mAhのモバイルバッテリーは、スマートフォンを何度も充電でき、出張・旅行・災害対策でも頼れる大容量モデルです。一方で、一般的な10,000mAh製品より大きく重く、飛行機ではWh（ワット時）による制限もあります。容量だけで選ぶと「重くて持ち歩かない」「PCへ十分な速さで給電できない」と後悔しかねません。'),
  block('結論からいうと、40,000mAhはスマホ約6〜8回、タブレット約3〜4回、USB-CノートPC約1.5〜2回が目安です。複数台を充電する人や長時間電源を確保できない人には便利ですが、毎日の持ち歩きにはオーバースペックになりやすい容量です。充電回数、重さ、PC対応、飛行機のルールを順に確認しましょう。'),

  block('40,000mAhのモバイルバッテリーはどれくらい使える？', 'h2'),
  block('40,000mAhは「40Ah」を意味します。ただし、製品に表示されるmAhは内蔵セルの公称電圧（一般に3.6〜3.7V）を基準にした値です。USB出力では電圧変換やケーブルの抵抗によるロスがあるため、40,000mAhを接続先へそのまま使い切れるわけではありません。'),
  block('実用上は、変換ロスを見込んで表示容量の約70〜80%を目安にします。充電回数は「40,000mAh×0.7〜0.8÷端末のバッテリー容量」で概算できます。端末を使いながら充電する場合やワイヤレス充電では、さらに回数が減ることがあります。'),
  image(charges, '40,000mAhモバイルバッテリーでスマートフォン、タブレット、ノートPCを充電できる回数の目安', '変換ロスを考慮した概算。端末や使用状況により実際の回数は前後します。'),

  block('スマホは約6〜8回充電できる', 'h3'),
  block('バッテリー容量4,000〜5,000mAhのスマートフォンなら、空の状態から約6〜8回が目安です。2台を交互に使う旅行、家族分の充電、停電時の通信手段確保などでは安心感があります。ただし毎晩コンセントを使える日常用途なら、10,000〜20,000mAhでも足りる人が多いでしょう。'),
  block('タブレットは約3〜4回充電できる', 'h3'),
  block('8,000〜10,000mAhクラスのタブレットでは約3〜4回が目安です。動画視聴やオンライン会議をしながら給電すると消費が増えるため、回数は少なくなります。高速充電を使うには、端末が求めるUSB-C PD規格とW数に対応した製品・ケーブルが必要です。'),
  block('ノートPCは約1.5〜2回が目安', 'h3'),
  block('40,000mAhを3.7Vで換算すると約148Whです。実際に取り出せる電力量を7〜8割とすると約104〜118Wh。50〜70Wh程度のノートPCなら約1.5〜2回が目安になります。PC側の容量だけでなく、モバイルバッテリーのUSB-C出力が45W、65W、100Wなど必要な電力を満たすか確認してください。'),

  block('ノートPCの充電はできる？容量より「USB-C出力」を確認', 'h2'),
  block('40,000mAhでも、USB-Cポートの出力が20W程度なら多くのノートPCを十分な速度で充電できません。容量は「どれくらい長く使えるか」、出力Wは「どれくらい速く給電できるか」を示す別の指標です。'),
  bullet('軽量ノートPC：45W以上をひとつの目安にする'),
  bullet('一般的なUSB-CノートPC：65W以上をひとつの目安にする'),
  bullet('高性能ノートPC：100W以上や独自ACアダプターが必要な場合がある'),
  bullet('ケーブル：希望するW数に対応したeMarker搭載USB-Cケーブルなどを選ぶ'),
  block('「合計100W」と書かれた製品でも、複数ポートを同時に使うと各ポートの出力配分が下がることがあります。製品ページの同時出力表を確認し、PCを接続するポート単体で必要W数が出るかを見てください。'),

  block('40,000mAhは大きい？重さと持ち運びやすさ', 'h2'),
  block('40,000mAhモデルはセル数が多く、製品によっては約700g〜1kgを超えます。500mlペットボトル1〜2本に近い重量を毎日バッグへ入れる感覚です。厚みも出やすく、ポケットよりリュックやキャリーケース向きです。'),
  block('購入前は重量の数字だけでなく、縦・横・厚みを紙に描く、同程度の重さの物をバッグへ入れて歩くなどして確かめると失敗を減らせます。容量の大きさに比例して本体を満充電する時間も延びるため、入力65W以上など高速な本体充電に対応するかも重要です。'),
  block('毎日持ち歩くなら10,000〜20,000mAh、2〜3日電源がない場面や複数台・PCへの給電なら40,000mAh、という分け方が現実的です。'),

  block('40,000mAhは飛行機に持ち込める？', 'h2'),
  block('多くの40,000mAh製品は、公称電圧3.7Vなら「40Ah×3.7V＝148Wh」です。160Wh以下に収まりますが、表示電圧によってWhは変わります。必ず本体に記載されたWhを確認してください。容量表示が読めない製品は、保安検査で持ち込みを断られる可能性があります。'),
  image(flight, '40,000mAhモバイルバッテリーのWh換算と飛行機への持ち込みルール', '40,000mAh・3.7Vなら約148Wh。預け入れは禁止で、機内持ち込みのみです。'),
  block('2026年4月24日から、日本国内線および日本を発着する便では、モバイルバッテリーは1人2個まで（160Wh以下に限る）となり、機内でモバイルバッテリーを充電すること、モバイルバッテリーから他の電子機器へ給電することも禁止されました。預け入れ手荷物には入れず、端子を保護して手荷物として持ち込みます。'),
  linkBlock('最新ルール：', '国土交通省「モバイルバッテリーの機内持込みの新たなルールについて」', 'https://www.mlit.go.jp/report/press/kouku10_hh_000310.html'),
  block('航空会社や渡航先によって、事前承認、個数、保管方法など追加条件が設定される場合があります。海外では100Whを超える製品の扱いが異なる可能性もあるため、予約した航空会社へ製品のWh表示を伝えて事前確認してください。'),

  block('40,000mAhが向いている人・向いていない人', 'h2'),
  block('向いている人', 'h3'),
  bullet('コンセントを使えない場所で2〜3日過ごす'),
  bullet('家族やチームで複数のスマホ・タブレットを充電する'),
  bullet('USB-CノートPCへ長時間給電したい'),
  bullet('災害時に通信・照明用の電源を多めに確保したい'),
  bullet('重量より稼働時間を優先する出張・撮影・屋外作業が多い'),
  block('向いていない人', 'h3'),
  bullet('通勤中のスマホ充電が主目的'),
  bullet('毎日充電でき、端末も1台だけ'),
  bullet('小さなバッグやポケットへ入れて持ち歩きたい'),
  bullet('飛行機を頻繁に利用し、各社の確認を手間に感じる'),
  block('大容量は安心感がありますが、持ち歩かなければ役に立ちません。迷う場合は、普段用の10,000〜20,000mAhと、旅行・防災用の大容量モデルを分ける方法もあります。'),

  block('失敗しない選び方7項目', 'h2'),
  number('本体にWhが明記され、40,000mAhならおおむね148Wh前後か確認する'),
  number('PCを充電するならUSB-C PDの単ポート最大出力を確認する'),
  number('複数台をつなぐなら同時出力時の電力配分を確認する'),
  number('本体重量・寸法を実際のバッグと照らし合わせる'),
  number('本体への入力W数と満充電までの時間を確認する'),
  number('PSE表示、過充電・過熱・短絡保護、国内サポートを確認する'),
  number('航空機で使うなら航空会社の最新ルールを確認する'),
  block('国内で販売されるモバイルバッテリーは、電気用品安全法に基づくPSE表示も確認しましょう。極端に安い無名製品では、容量表記や保護回路の信頼性を判断しづらい場合があります。価格だけでなく、保証期間、問い合わせ窓口、回収方法まで含めて比較してください。'),

  block('安全に使うための注意点', 'h2'),
  bullet('炎天下の車内、直射日光、高温多湿の場所へ放置しない'),
  bullet('落下、強い圧迫、水ぬれを避ける'),
  bullet('布団やバッグの中など、熱がこもる状態で充電しない'),
  bullet('膨らみ、異臭、変色、異常発熱があれば使用を中止する'),
  bullet('定格を超える充電器・ケーブルを自己判断で使用しない'),
  block('大容量モデルは蓄えるエネルギーも大きいため、取扱説明書に従うことが重要です。不要になった製品を一般ごみに混ぜず、メーカーや自治体、協力店の回収案内を確認してください。'),

  block('よくある質問', 'h2'),
  block('Q. 40,000mAhはスマホを10回充電できますか？', 'h3'),
  block('小容量のスマホなら近づく可能性はありますが、4,000〜5,000mAhの一般的なスマホでは変換ロスを含めて約6〜8回が現実的な目安です。表示容量だけを単純に割った回数より少なくなります。'),
  block('Q. 40,000mAhならどのノートPCでも充電できますか？', 'h3'),
  block('できません。PCがUSB-C PD充電に対応し、モバイルバッテリーの単ポート出力がPCの必要W数を満たす必要があります。独自端子や高出力ACアダプターが必要なPCもあります。'),
  block('Q. 40,000mAhと20,000mAh、どちらがおすすめ？', 'h3'),
  block('携帯性なら20,000mAh、複数台・数日間・PC給電なら40,000mAhが候補です。日帰り中心なら20,000mAhで十分なケースが多く、40,000mAhは電源のない時間が長い人向けです。'),
  block('Q. 40,000mAhを飛行機へ必ず持ち込めますか？', 'h3'),
  block('必ずではありません。公称電圧3.7Vなら約148Whですが、本体のWh表示、航空会社、路線、渡航先の規定によって判断されます。預け入れは禁止です。必ず搭乗予定の航空会社へ最新情報を確認してください。'),

  block('まとめ：40,000mAhは「長時間・複数台・PC向け」', 'h2'),
  block('40,000mAhのモバイルバッテリーは、スマホ約6〜8回、タブレット約3〜4回、ノートPC約1.5〜2回を充電できる大容量クラスです。出張、旅行、災害対策、屋外作業で長時間の電源が必要な人に向きます。'),
  block('一方、重量は約700g〜1kg以上になりやすく、毎日のスマホ充電だけなら10,000〜20,000mAhのほうが使いやすいでしょう。購入前は容量だけでなく、USB-Cの単ポート出力、重量、入力速度、PSE表示、そして本体に記載されたWhを確認してください。'),
  block('※本記事は2026年7月28日時点の情報をもとに作成しています。航空・製品のルールや仕様は変更される場合があるため、国土交通省、航空会社、メーカーの最新案内を優先してください。'),
]

const doc = await client.create({_type:'post',title:'40000mAhモバイルバッテリーは何回充電できる？重さ・PC対応・飛行機持ち込みを解説',slug:{_type:'slug',current:slug},excerpt:'40,000mAhモバイルバッテリーの充電回数、ノートPC対応、重さ、飛行機への持ち込み条件を解説。向いている人と失敗しない選び方も紹介します。',publishedAt:'2026-07-28T00:00:00.000Z',mainImage:{_type:'image',asset:{_type:'reference',_ref:hero._id},alt:'スマートフォンとノートPCへ同時給電する40,000mAhクラスの大容量モバイルバッテリー'},body,seo:{_type:'seo',title:'40000mAhモバイルバッテリーは何回充電できる？飛行機は？',description:'40,000mAhモバイルバッテリーの充電回数、重さ、PC対応、飛行機持ち込みを解説。向いている人と失敗しない選び方がわかります。',image:{_type:'image',asset:{_type:'reference',_ref:hero._id}},noIndex:false}})
console.log(JSON.stringify({documentId:doc._id,slug,assets:[hero._id,charges._id,flight._id]},null,2))
