import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2025-02-19'})
const slug = 'disaster-preparedness-mobile-battery'
const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{_id,title}`, {slug})
if (existing) throw new Error(`Article already exists: ${existing._id} ${existing.title}`)

const upload = (file, label) => client.assets.upload('image', createReadStream(resolve(file)), {filename: label})
const hero = await upload('../public/images/articles/disaster-preparedness-mobile-battery-hero.png', 'disaster-preparedness-mobile-battery-hero.png')
const types = await upload('../public/images/articles/disaster-mobile-battery-types.svg', 'disaster-mobile-battery-types.svg')
const flow = await upload('../public/images/articles/disaster-mobile-battery-check-flow.svg', 'disaster-mobile-battery-check-flow.svg')

let n = 0
const key = (prefix = 'dmb') => `${prefix}${String(++n).padStart(4, '0')}`
const block = (text, style = 'normal', options = {}) => ({_key:key(),_type:'block',style,markDefs:[],children:[{_key:key(),_type:'span',text,marks:[]}],...options})
const bullet = (text) => block(text, 'normal', {listItem:'bullet',level:1})
const number = (text) => block(text, 'normal', {listItem:'number',level:1})
const linkBlock = (before, label, href, after = '') => { const mark=key('link'); return {_key:key(),_type:'block',style:'normal',markDefs:[{_key:mark,_type:'link',href,newWindow:true}],children:[{_key:key(),_type:'span',text:before,marks:[]},{_key:key(),_type:'span',text:label,marks:[mark]},{_key:key(),_type:'span',text:after,marks:[]}]}}
const image = (asset, alt, caption) => ({_key:key('img'),_type:'image',asset:{_type:'reference',_ref:asset._id},alt,caption})

const body = [
  block('防災グッズとしてモバイルバッテリーを選ぶなら、1台だけに頼るより「避難時に持ち歩く小型」「自宅備蓄の大容量」「電池切れ後を支える乾電池式やソーラー」の役割を分けると安心です。スマホは安否確認、災害情報、地図、決済、ライトなどに使うため、停電時の電源確保は重要な備えになります。'),
  block('結論からいうと、1人なら日常兼用の5,000〜10,000mAh、家族や数日分を見込むなら10,000〜20,000mAhが選びやすい目安です。長期停電への保険として乾電池式、屋外で日照を確保できる場合はソーラーパネルも追加しましょう。この記事では、4タイプのメリット・デメリット、必要容量の考え方、おすすめ製品例、保管方法まで解説します。'),

  block('防災用モバイルバッテリーのおすすめ結論', 'h2'),
  image(types, '防災用モバイルバッテリーの小型・大容量・乾電池式・ソーラー式を比較した図', 'それぞれ得意な役割が異なるため、主力と補助を組み合わせるのがおすすめです。'),
  bullet('毎日持ち歩く：5,000〜10,000mAhの軽量モデル'),
  bullet('自宅の備蓄：10,000〜20,000mAhの大容量モデル'),
  bullet('長期停電の予備：単3形乾電池で使える乾電池式'),
  bullet('屋外で電力を補う：折りたたみ式ソーラーパネル'),
  block('防災では容量の大きさだけでなく、停電が起きた瞬間に充電されていること、対応ケーブルがあること、正常に動くことが重要です。重すぎる大容量モデルを非常持ち出し袋に入れたままにするより、小型を日常的に使い、別に大容量を備蓄するほうが管理しやすくなります。'),

  block('必要な容量は何mAh？人数と使い方で決める', 'h2'),
  block('モバイルバッテリーは、表示容量のすべてをスマホへ移せるわけではありません。電圧変換やケーブルで損失が出るため、実際に端末へ届けられる量は表示より少なくなります。防災では満充電回数を厳密に数えるより、通信・情報収集を優先し、画面の明るさや動画視聴を抑えて電池を延ばす運用もセットで考えましょう。'),
  block('1人・短時間の避難：5,000〜10,000mAh', 'h3'),
  block('5,000mAh前後は軽く、非常持ち出し袋や普段のバッグに入れやすい容量です。近年のスマホでは満充電1回に届かないことがありますが、残量を継ぎ足して帰宅や避難所到着までつなぐ用途に向きます。安心感とのバランスを重視するなら10,000mAhが基準になります。'),
  block('家族・複数日を想定：10,000〜20,000mAh', 'h3'),
  block('スマホを複数台使う家庭や、停電が長引く地域では20,000mAhも候補です。ただし容量が増えるほど重く、本体の充電にも時間がかかります。非常持ち出し用と自宅備蓄用を分け、全員分を1台に集中させないほうが故障や持ち出し忘れのリスクを減らせます。'),
  block('ノートPCや家電も使いたい：ポータブル電源を検討', 'h3'),
  block('モバイルバッテリーは主にスマホや小型USB機器向けです。ノートPC、電気毛布、扇風機などを長時間使いたい場合は、必要な出力Wと容量Whを満たすポータブル電源を検討してください。モバイルバッテリーのmAhとポータブル電源のWhは単純比較できません。'),

  block('4タイプのメリット・デメリット', 'h2'),
  block('小型・軽量タイプ', 'h3'),
  bullet('メリット：軽く、日常でも使うため残量や故障に気づきやすい'),
  bullet('デメリット：スマホを満充電できる回数が少ない'),
  block('通勤・通学用を防災にも兼用したい人向けです。USB-C入出力、20W前後の急速充電、100〜200g程度を目安にすると携帯性を保ちやすくなります。'),
  block('大容量タイプ', 'h3'),
  bullet('メリット：スマホを複数回、または家族の端末も充電しやすい'),
  bullet('デメリット：重く、本体を満充電するまで時間がかかる'),
  block('自宅備蓄の主力に向きます。残量表示が数字で確認できるモデル、USB-CとUSB-Aを備えるモデルなら、新旧のケーブルへ対応しやすいでしょう。'),
  block('乾電池式タイプ', 'h3'),
  bullet('メリット：コンセントが使えなくても、予備の乾電池へ交換して使える'),
  bullet('デメリット：充電速度や充電回数はリチウムイオン式より控えめ'),
  block('乾電池式は主力ではなく「充電済みバッテリーを使い切った後の保険」です。PanasonicのBH-BZ40Kは単3形乾電池4本でスマートフォンを約0.5〜0.7回充電でき、LEDライトも備えます。端末に合うUSBケーブルは別途必要です。'),
  linkBlock('製品情報：', 'Panasonic「乾電池式モバイルバッテリー」', 'https://panasonic.jp/battery/mobile-battery.html'),
  block('ソーラー式タイプ', 'h3'),
  bullet('メリット：晴天時にコンセントなしで電力を補える'),
  bullet('デメリット：天候、季節、角度、パネル面積に大きく左右される'),
  block('モバイルバッテリー本体に付いた小さなソーラーパネルは、充電が非常にゆっくりな場合があります。ソーラーを本格的に使うなら、面積のある折りたたみパネルを選び、平常時にスマホやバッテリーを充電できるか試しましょう。ソーラーは主力電源ではなく補助と考えるのが安全です。'),
  linkBlock('参考：', 'Anker PowerCore Solar 10000（公式仕様とソーラー充電の注意）', 'https://www.ankerjapan.com/products/a1640'),

  block('失敗しない選び方7項目', 'h2'),
  image(flow, '防災用モバイルバッテリーを容量・人数・長期停電から選ぶフローチャート', '携帯用と備蓄用を分け、長期停電には乾電池式やソーラーを追加します。'),
  number('PSEマーク：国内で販売される対象製品は表示を確認する'),
  number('容量：1人なら5,000〜10,000mAh、家族用は10,000〜20,000mAhを目安にする'),
  number('重量：非常持ち出し袋の総重量と合わせて無理なく運べるか確認する'),
  number('端子：スマホとケーブルがUSB-CかLightningか確認する'),
  number('出力：スマホの急速充電規格に合うUSB-C PD対応を選ぶ'),
  number('残量表示：数字または4段階以上で残量を確認しやすいものを選ぶ'),
  number('保証・回収：国内窓口、保証期間、リコール情報、使用後の回収方法を確認する'),
  block('経済産業省は、モバイルバッテリー購入時にPSEマークとリコール対象でないことを確認し、強い衝撃、高温、直射日光を避けるよう案内しています。PSEは重要な確認項目ですが、それだけで事故が起きないことを保証するものではありません。信頼できる販売元、保証、保護機能まで確認してください。'),
  linkBlock('安全情報：', '経済産業省「リチウムイオン蓄電池搭載製品の事故に気をつけましょう」', 'https://www.meti.go.jp/product_safety/consumer/lithium_ion_battery.html'),

  block('タイプ別のおすすめ製品例', 'h2'),
  block('日常兼用：5,000mAhのUSB-C一体型', 'h3'),
  block('小型モデルは、ケーブルを忘れにくいUSB-C端子一体型やケーブル内蔵型が便利です。ただし厚いスマホケースでは挿しにくい場合があるため、実際のケースとの相性を確認してください。毎日使う人は月1回の防災点検も自然に行えます。'),
  block('自宅備蓄：Anker Power Bank（10000mAh, 30W）', 'h3'),
  block('10,000mAh、最大30W、USB-C×2とUSB-A×1を備えたコンパクトモデルです。スマホの急速充電と複数端子の使い分けを重視する人に向きます。購入時はメーカー公式ページで現行仕様、リコール情報、在庫を必ず確認してください。'),
  linkBlock('製品情報：', 'Anker「Anker Power Bank（10000mAh, 30W）」', 'https://www.ankerjapan.com/products/A1256'),
  block('長期停電の予備：Panasonic BH-BZ40K', 'h3'),
  block('単3形乾電池4本を使い、スマホ充電とLEDライトの2役を担う乾電池式です。普段から単3形電池をローリングストックしている家庭に向きます。乾電池の残量によっては使用できない場合があるため、未使用の予備電池と対応USBケーブルを一緒に保管しましょう。'),
  block('ソーラー補助：面積のある折りたたみパネル', 'h3'),
  block('ソーラーは定格Wだけでなく、USB出力、耐候性、収納サイズ、接続先バッテリーとの相性で選びます。災害当日に初めて使うのではなく、晴天時に設置角度を変え、何時間でどの程度充電できるか試してください。窓越しや曇天では出力が大きく落ちることがあります。'),

  block('防災用品としての保管・点検方法', 'h2'),
  bullet('購入直後にスマホへ充電できるか、全ポートとケーブルを確認する'),
  bullet('毎月または防災点検日に残量を確認し、必要に応じて充電する'),
  bullet('高温多湿、直射日光、車内を避け、メーカー指定の環境で保管する'),
  bullet('端子保護のため金属類と分け、強い圧力がかからない場所に置く'),
  bullet('膨らみ、変形、異臭、変色、異常発熱があれば使用を中止する'),
  bullet('対応ケーブル、USB充電器、乾電池を同じポーチにまとめる'),
  block('モバイルバッテリーは「買って袋へ入れたら終わり」ではありません。自然放電や経年劣化があり、何年も放置すると必要なときに使えない可能性があります。食品のローリングストックと同じように、日常で使いながら状態を更新する方法が現実的です。'),

  block('災害時に電池を長持ちさせるコツ', 'h2'),
  bullet('スマホを低電力モードにし、画面の明るさを下げる'),
  bullet('圏外が続く場所では機内モードを使い、必要なときだけ通信する'),
  bullet('動画視聴やゲームを控え、災害情報はテキスト中心で確認する'),
  bullet('家族で充電の優先順位と使用時間を決める'),
  bullet('充電中は布やバッグで覆わず、異常な発熱がないか見る'),

  block('よくある質問', 'h2'),
  block('Q. 防災用は10,000mAhと20,000mAhのどちらがいい？', 'h3'),
  block('1人で携帯性を重視するなら10,000mAh、家族や複数日の停電を想定するなら20,000mAhが候補です。重さが負担になる場合は10,000mAhを2台に分ける方法もあります。'),
  block('Q. 充電したまま保管しても大丈夫？', 'h3'),
  block('長期保管時の推奨残量や点検間隔は製品ごとに異なります。取扱説明書を優先し、満充電のまま高温環境へ放置することや、長期間まったく点検しないことは避けてください。'),
  block('Q. ソーラー付きなら停電が何日続いても安心？', 'h3'),
  block('安心とは言い切れません。小型パネルは発電量が少なく、雨天や曇天では十分に充電できない場合があります。充電済みのモバイルバッテリー、乾電池式、節電運用と組み合わせてください。'),
  block('Q. 古いモバイルバッテリーは一般ごみに捨てられる？', 'h3'),
  block('一般ごみへ混ぜると収集・処理工程で火災につながるおそれがあります。自治体のごみ分別案内、メーカーや販売店の回収、JBRC協力店など、製品状態に合う方法を確認してください。膨張・破損品は回収ボックスへ入れず、自治体へ相談しましょう。'),
  linkBlock('廃棄の確認：', '経済産業省「小型二次電池のリサイクル」', 'https://www.meti.go.jp/policy/it_policy/kaden/index03.html'),

  block('まとめ：日常用・備蓄用・予備方式の3段構えがおすすめ', 'h2'),
  block('防災グッズとして使うモバイルバッテリーは、日常兼用の5,000〜10,000mAh、自宅備蓄の10,000〜20,000mAh、長期停電に備える乾電池式またはソーラーパネルを組み合わせると安心です。小型は持ち歩き、大容量は家族分の電力確保、乾電池・ソーラーは充電済みバッテリーを使い切った後の補助という役割があります。'),
  block('選ぶときは容量だけでなく、PSEマーク、USB-C端子、出力、重量、残量表示、保証、リコール情報を確認してください。そして毎月の点検で残量・ケーブル・膨張の有無を確かめ、災害時にすぐ使える状態を保ちましょう。'),
  block('※本記事は2026年8月1日時点の情報をもとに作成しています。製品仕様・販売状況・安全情報は変更される場合があるため、メーカーや公的機関の最新案内を優先してください。'),
]

const doc = await client.create({
  _type:'post',
  title:'防災グッズにおすすめのモバイルバッテリー｜容量・タイプ別の選び方',
  slug:{_type:'slug',current:slug},
  excerpt:'防災用モバイルバッテリーはどれがいい？5,000〜20,000mAh、乾電池式、ソーラー式のメリット・デメリットとおすすめの選び方を解説します。',
  publishedAt:'2026-08-01T00:00:00.000Z',
  mainImage:{_type:'image',asset:{_type:'reference',_ref:hero._id},alt:'防災グッズとして用意した小型・大容量・乾電池式・ソーラー式のモバイル電源'},
  body,
  seo:{_type:'seo',title:'防災用モバイルバッテリーおすすめ｜容量と選び方を解説',description:'防災グッズにおすすめのモバイルバッテリーを容量・タイプ別に比較。小型、大容量、乾電池式、ソーラー式のメリットと選び方を解説します。',image:{_type:'image',asset:{_type:'reference',_ref:hero._id}},noIndex:false},
})
console.log(JSON.stringify({documentId:doc._id,slug,assets:[hero._id,types._id,flow._id]},null,2))
