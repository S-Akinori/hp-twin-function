import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2025-02-19'})
const slug = 'mobile-battery-5000mah'
const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{_id,title}`, {slug})
if (existing) throw new Error(`Article already exists: ${existing._id} ${existing.title}`)

const upload = (file, label) => client.assets.upload('image', createReadStream(resolve(file)), {filename: label})
const hero = await upload('../public/images/articles/mobile-battery-5000mah-hero.png', 'mobile-battery-5000mah-hero.png')
const charges = await upload('../public/images/articles/mobile-battery-5000mah-charge-guide.svg', 'mobile-battery-5000mah-charge-guide.svg')
const choice = await upload('../public/images/articles/mobile-battery-5000mah-choice-guide.svg', 'mobile-battery-5000mah-choice-guide.svg')

let n = 0
const key = (prefix = 'mb5') => `${prefix}${String(++n).padStart(4, '0')}`
const block = (text, style = 'normal', options = {}) => ({_key:key(),_type:'block',style,markDefs:[],children:[{_key:key(),_type:'span',text,marks:[]}],...options})
const bullet = (text) => block(text, 'normal', {listItem:'bullet',level:1})
const number = (text) => block(text, 'normal', {listItem:'number',level:1})
const linkBlock = (before, label, href, after = '') => { const mark=key('link'); return {_key:key(),_type:'block',style:'normal',markDefs:[{_key:mark,_type:'link',href,newWindow:true}],children:[{_key:key(),_type:'span',text:before,marks:[]},{_key:key(),_type:'span',text:label,marks:[mark]},{_key:key(),_type:'span',text:after,marks:[]}]}}
const image = (asset, alt, caption) => ({_key:key('img'),_type:'image',asset:{_type:'reference',_ref:asset._id},alt,caption})

const body = [
  block('5000mAhのモバイルバッテリーは、軽さと携帯性を優先したい人にちょうどよい小容量モデルです。通勤・通学や短時間の外出で「夕方までスマホの電池をもたせたい」という場面に向きます。一方、表示容量をそのままスマホへ移せるわけではないため、機種によっては満充電1回に届きません。'),
  block('結論からいうと、5000mAhでスマホを充電できる回数は約0.7〜1回が目安です。毎日の継ぎ足し充電には便利ですが、旅行、動画視聴、ゲーム、複数台の充電には10000mAh以上のほうが安心です。実際の充電回数、向いている人、失敗しない選び方、おすすめタイプを順に解説します。'),

  block('5000mAhのモバイルバッテリーは何回充電できる？', 'h2'),
  block('一般的なスマートフォンなら約0.7〜1回です。モバイルバッテリー内部では、内蔵セルの電圧をUSB出力へ変換するときやケーブルを通るときに電力ロスが生じます。そのため、5000mAhのうち実際に端末へ届けられる容量は、おおむね3500〜4000mAh程度と考えるのが現実的です。'),
  block('目安は「5000mAh×0.7〜0.8÷スマホのバッテリー容量」で概算できます。スマホを操作しながら充電する場合、低温・高温環境、ワイヤレス充電では効率が下がり、充電できる割合がさらに少なくなることがあります。'),
  image(charges, '5000mAhモバイルバッテリーでスマートフォンを充電できる回数の目安', '変換ロスを考慮した概算。端末や使用状況により実際の回数は前後します。'),

  block('3000mAhのスマホ：ほぼ1回', 'h3'),
  block('小型スマホや少し前の機種など、電池容量が3000mAh前後なら、空の状態からほぼ1回充電できる可能性があります。ただし、充電中にスマホを使うと満充電前にモバイルバッテリーが空になることもあります。'),
  block('4000mAhのスマホ：約0.9回', 'h3'),
  block('4000mAh前後のスマホでは、残量10〜20%から80〜100%近くまで回復させる使い方が現実的です。「朝に充電を忘れた」「夕方だけ電池を足したい」といった日常の予備電源として使いやすい容量です。'),
  block('5000mAhのスマホ：約0.7回', 'h3'),
  block('大容量スマホでは満充電1回未満になります。残量ゼロから100%を確実に目指すなら、10000mAh以上を選びましょう。メーカーが「約1回」と案内する製品でも、大型スマホは1回未満になるという注意書きがあるため、対応機種の記載まで確認することが大切です。'),

  block('5000mAhのメリット', 'h2'),
  bullet('約100〜150g前後の軽量モデルが多く、毎日持ち歩きやすい'),
  bullet('薄型、端子一体型、マグネット式などコンパクトな選択肢が多い'),
  bullet('スマホを使いながらでも邪魔になりにくい'),
  bullet('小容量なので本体への充電時間も比較的短い'),
  block('モバイルバッテリーは容量が大きいほど安心に見えますが、重くて家に置いたままでは意味がありません。5000mAhの最大の価値は、必要十分な電力をポケットや小さなバッグで携帯できることです。'),

  block('5000mAhのデメリット', 'h2'),
  bullet('近年の大容量スマホでは満充電1回に届かない場合がある'),
  bullet('動画・ゲーム・テザリングを長時間使うと足りなくなりやすい'),
  bullet('タブレットやノートPCの予備電源には容量不足'),
  bullet('ワイヤレス充電は有線よりロスが大きく、実用量が減りやすい'),
  block('「小型だから」という理由だけで選ばず、外出中に不足する電池量を確認しましょう。いつも帰宅時に30%ほど足りないなら5000mAhで十分ですが、スマホ1台をゼロから満充電したいなら10000mAhが無難です。'),

  block('5000mAhが向いている人・向いていない人', 'h2'),
  image(choice, '5000mAhと10000mAh以上のモバイルバッテリーを用途で選ぶ判断図', '外出中の継ぎ足し充電なら5000mAh、満充電1回以上なら10000mAh以上が目安です。'),
  block('5000mAhが向いている人', 'h3'),
  bullet('通勤・通学や日帰りの外出が中心'),
  bullet('帰宅までの数時間だけ電池を延ばしたい'),
  bullet('スマホ1台のみを充電する'),
  bullet('荷物の軽さと小ささを最優先したい'),
  bullet('毎晩コンセントで充電できる'),
  block('10000mAh以上が向いている人', 'h3'),
  bullet('スマホを1回以上満充電したい'),
  bullet('旅行・出張・イベントで長時間外出する'),
  bullet('動画、ゲーム、撮影、テザリングをよく使う'),
  bullet('スマホを2台以上、またはイヤホンなど複数機器を充電する'),

  block('失敗しない選び方6項目', 'h2'),
  number('重量と厚み：毎日持ち歩けるサイズか確認する'),
  number('有線出力：20W前後のUSB-C PD対応なら対応スマホを素早く充電しやすい'),
  number('端子：スマホがUSB-CかLightningかを確認する'),
  number('形状：ケーブル式、端子一体型、マグネット式から使い方に合わせる'),
  number('安全性：PSE表示、温度管理、過充電・短絡保護を確認する'),
  number('保証と回収：国内サポート、保証期間、使用後の回収方法を確認する'),
  block('端子一体型はケーブル不要で身軽ですが、スマホケースの厚みや端子周辺の形状によって挿さらないことがあります。マグネット式は操作しやすい一方、有線より充電効率が下がりやすく、対応機種・ケースの確認も必要です。迷ったら汎用性の高いUSB-Cケーブル式が使いやすいでしょう。'),

  block('5000mAhのおすすめタイプと製品例', 'h2'),
  block('おすすめは「何を減らしたいか」で選ぶと明確です。ケーブルを減らしたいなら端子一体型、薄さを優先するならマグネット式、機種変更後も使いたいならUSB-Cケーブル式が候補になります。'),
  block('ケーブル不要で選ぶ：Anker Nano Power Bank（22.5W, Built-In USB-C Connector）', 'h3'),
  block('USB-C端子を本体へ折りたたんで収納できる5000mAhモデルです。公式仕様では約102g、最大22.5W出力。USB-Cスマホへ直接挿して使えるため、通勤・通学でケーブルを持ち歩きたくない人に向きます。大型スマホでは満充電1回未満になる点と、ケース形状が端子と干渉しないかを確認してください。'),
  linkBlock('製品仕様：', 'Anker公式「Anker Nano Power Bank（22.5W, Built-In USB-C Connector）」', 'https://www.ankerjapan.com/products/a1653'),
  block('薄さと操作性で選ぶ：Anker Nano Power Bank（5000mAh, MagGo, Slim）', 'h3'),
  block('Qi2対応スマホへ最大15Wでワイヤレス充電できる薄型モデルです。公式仕様では厚さ約8.6mm、約110g、有線USB-Cは最大20W。ケーブルなしでスマホを操作しやすい一方、対応機種でも満充電1回未満になる場合があります。Qi2対応機種とマグネット式対応ケースかを確認しましょう。'),
  linkBlock('製品仕様：', 'Anker公式「Anker Nano Power Bank（5000mAh, MagGo, Slim）」', 'https://www.ankerjapan.com/products/a1665'),
  block('製品の価格、在庫、仕様は変更されることがあります。購入時は公式ページの最新情報を確認し、容量だけでなく重量・出力・端子・保証を比較してください。'),

  block('安全に使うための注意点', 'h2'),
  bullet('炎天下の車内や直射日光の当たる場所へ放置しない'),
  bullet('落下、強い圧迫、水ぬれを避ける'),
  bullet('布団やバッグの中など、熱がこもる状態で充電しない'),
  bullet('膨らみ、異臭、変色、異常発熱があれば使用を中止する'),
  bullet('不要になったら一般ごみに混ぜず、メーカーや自治体の案内に従う'),

  block('よくある質問', 'h2'),
  block('Q. 5000mAhでiPhoneを1回充電できますか？', 'h3'),
  block('機種によります。小型機種では約1回に近づくことがありますが、近年の大型iPhoneでは1回未満になる場合があります。製品メーカーの対応機種別の注意書きを確認してください。'),
  block('Q. 5000mAhと10000mAhはどちらがおすすめ？', 'h3'),
  block('軽さと携帯性なら5000mAh、満充電1回以上の安心感なら10000mAhがおすすめです。毎日の継ぎ足し充電は5000mAh、旅行や長時間利用は10000mAh以上と考えると選びやすくなります。'),
  block('Q. 5000mAhでタブレットやノートPCを充電できますか？', 'h3'),
  block('給電自体ができる場合はありますが、容量が小さく実用的ではありません。タブレットやノートPC用には、必要なUSB-C PD出力を満たす10000〜20000mAh以上のモデルを検討してください。'),

  block('まとめ：5000mAhは毎日の「あと少し」に最適', 'h2'),
  block('5000mAhのモバイルバッテリーでスマホを充電できる回数は、約0.7〜1回が目安です。満充電1回を保証する容量ではありませんが、軽くて持ち歩きやすく、通勤・通学中の継ぎ足し充電には十分役立ちます。'),
  block('選ぶときは、重量と厚み、USB-C出力、端子や充電方式、PSE表示、保証を確認してください。帰宅まで電池をつなぐ用途なら5000mAh、ゼロから満充電したい日や長時間外出が多いなら10000mAh以上を選ぶと失敗を減らせます。'),
  block('※本記事は2026年8月1日時点の情報をもとに作成しています。製品仕様・価格・在庫は変更される場合があるため、メーカーの最新案内を優先してください。'),
]

const doc = await client.create({_type:'post',title:'5000mAhモバイルバッテリーは何回充電できる？おすすめと選び方を解説',slug:{_type:'slug',current:slug},excerpt:'5000mAhモバイルバッテリーの充電回数は約0.7〜1回。向いている人、10000mAhとの違い、選び方、おすすめタイプを解説します。',publishedAt:'2026-08-01T00:00:00.000Z',mainImage:{_type:'image',asset:{_type:'reference',_ref:hero._id},alt:'5000mAhの小型モバイルバッテリーでスマートフォンを充電する様子'},body,seo:{_type:'seo',title:'5000mAhモバイルバッテリーは何回？おすすめと選び方',description:'5000mAhモバイルバッテリーはスマホを約0.7〜1回充電できます。向いている人、10000mAhとの違い、失敗しない選び方を解説。',image:{_type:'image',asset:{_type:'reference',_ref:hero._id}},noIndex:false}})
console.log(JSON.stringify({documentId:doc._id,slug,assets:[hero._id,charges._id,choice._id]},null,2))
