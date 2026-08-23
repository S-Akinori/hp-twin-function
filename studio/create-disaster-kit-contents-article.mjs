import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'

const client=getCliClient({apiVersion:'2025-02-19'})
const slug='disaster-kit-contents'
const existing=await client.fetch(`*[_type=="post"&&slug.current==$slug][0]{_id,title}`,{slug})
if(existing) throw new Error(`Article already exists: ${existing._id} ${existing.title}`)
const upload=(file,name)=>client.assets.upload('image',createReadStream(resolve(file)),{filename:name})
const hero=await upload('../public/images/articles/disaster-kit-contents-hero.png','disaster-kit-contents-hero.png')
const priority=await upload('../public/images/articles/disaster-kit-priority-guide.svg','disaster-kit-priority-guide.svg')
const bag=await upload('../public/images/articles/disaster-bag-size-guide.svg','disaster-bag-size-guide.svg')
let n=0; const key=(p='dk')=>`${p}${String(++n).padStart(4,'0')}`
const block=(text,style='normal',extra={})=>({_key:key(),_type:'block',style,markDefs:[],children:[{_key:key(),_type:'span',text,marks:[]}],...extra})
const bullet=t=>block(t,'normal',{listItem:'bullet',level:1}); const number=t=>block(t,'normal',{listItem:'number',level:1})
const image=(asset,alt,caption)=>({_key:key('img'),_type:'image',asset:{_type:'reference',_ref:asset._id},alt,caption})
const link=(before,label,href,after='')=>{const m=key('lnk');return {_key:key(),_type:'block',style:'normal',markDefs:[{_key:m,_type:'link',href,newWindow:true}],children:[{_key:key(),_type:'span',text:before,marks:[]},{_key:key(),_type:'span',text:label,marks:[m]},{_key:key(),_type:'span',text:after,marks:[]}]}}

const body=[
  block('2026年7月28日、熊本県天草・芦北地方を震源とするマグニチュード5.0、最大震度4の地震が発生しました。地震は予告なく起こります。避難が必要になってから防災グッズを集めるのでは間に合わないため、持ち出せる状態で用意しておくことが大切です。'),
  link('地震情報：','気象庁「2026年7月28日 熊本県天草・芦北地方の地震」','https://www.data.jma.go.jp/eew/data/nc/fc_hist/2026/07/20260728171856/index.html'),
  block('とはいえ、防災グッズの中身を増やしすぎるとバッグが重くなり、避難の妨げになります。結論は「命に直結する物を最優先にし、あると便利な物を余力に合わせて足す」ことです。この記事では、必須・便利・優先度が低い物に分けたチェックリスト、バッグの容量、家族構成別の追加品、乾電池式モバイルバッテリーまで解説します。'),

  block('防災グッズの中身一覧｜まずはこの必需品を準備','h2'),
  image(priority,'防災グッズの中身を必須・便利・後回しの3段階に分けた優先度図','すべてを詰め込まず、命と避難に直結する物から準備します。'),
  block('内閣府は、飲料水、非常食、軍手、常備薬、懐中電灯、携帯ラジオ、予備電池、洗面用具などをリュックに入れ、すぐ持ち出せるようにすることを案内しています。ただし必要な中身は、年齢、持病、季節、避難先によって変わります。以下を土台に自分用へ調整してください。'),
  link('参考：','内閣府「自然災害への備えは万全ですか？」','https://www.bousai.go.jp/kyoiku/hokenkyousai/check.html'),

  block('必ず入れるべき防災グッズ','h2'),
  block('1. 水・すぐ食べられる非常食','h3'),
  block('持ち出し袋には、移動中や避難直後をしのぐ飲料水と、加熱せず食べられる食品を入れます。500mlの水、栄養補助食品、ようかん、ビスケットなど、普段から食べ慣れた物が実用的です。自宅備蓄は別に、最低3日分、できれば1週間分を目安に用意します。すべての備蓄をバッグへ詰める必要はありません。'),
  block('2. 常備薬・救急用品・健康情報','h3'),
  block('処方薬、ばんそうこう、消毒用品、マスクをまとめます。持病がある人は薬の名前、服用量、かかりつけ医、緊急連絡先を書いたメモやお薬手帳のコピーも入れてください。眼鏡、補聴器用電池、アレルギー対応食など、代替しにくい物は最優先です。'),
  block('3. 明かり・情報収集・連絡手段','h3'),
  bullet('LEDライトまたはヘッドライトと予備電池'),bullet('携帯ラジオ'),bullet('スマートフォン、充電ケーブル、モバイルバッテリー'),bullet('家族の連絡先、避難先、集合場所を書いた紙'),
  block('停電や通信障害を想定し、スマホだけに頼らない構成にします。両手を空けられるヘッドライト、乾電池で動くラジオ、紙の連絡先があると行動しやすくなります。'),
  block('4. 衛生・トイレ用品','h3'),
  bullet('携帯トイレ'),bullet('トイレットペーパーまたはティッシュ'),bullet('ウェットティッシュ・消毒用品'),bullet('生理用品・紙おむつ・防臭袋'),
  block('断水時はトイレが使えないことがあります。携帯トイレは袋と凝固剤をセットで人数分用意し、平常時に一度使い方を確認しておきましょう。'),
  block('5. 安全確保・貴重品','h3'),
  bullet('軍手、底の厚い靴、雨具'),bullet('ホイッスル'),bullet('現金（硬貨を含む）'),bullet('身分証明書・保険証のコピー'),bullet('家と車の予備鍵'),
  block('災害時は電子決済やATMが使えない場合があります。貴重品の原本を長期間バッグへ入れっぱなしにせず、避難時に持ち出す物とコピーでよい物を分けて管理してください。'),

  block('あると便利な防災グッズ','h2'),
  bullet('アルミブランケット、使い捨てカイロ、冷却シートなど季節用品'),bullet('タオル、着替え、下着、靴下'),bullet('大判のポリ袋、食品用ラップ、ガムテープ'),bullet('耳栓、アイマスク、携帯クッション'),bullet('筆記具、油性ペン、メモ帳'),bullet('小型の多機能ナイフ（避難所の規則や携帯方法に注意）'),
  block('ポリ袋やラップは、防水、仕分け、保温、食器の汚れ防止などに使えます。避難所での睡眠やプライバシーが心配な人は、軽い耳栓やアイマスクも役立ちます。便利品は「使い道が複数ある」「軽い」「自分が使い方を知っている」の3条件で選びましょう。'),

  block('なくてもいい・優先度が低い物','h2'),
  block('防災用品に絶対的な不要品はありません。ただし、次の物はバッグの重さや避難先の環境を考えて後回しにできます。'),
  bullet('大きな鍋や重い調理器具'),bullet('人数分を超える大量の衣類や水'),bullet('役割が重複する多機能ツール'),bullet('使い方を試していない特殊な防災用品'),bullet('割れやすい容器や液漏れしやすい物'),
  block('水や食料の長期備蓄、カセットコンロ、生活用水などは自宅備蓄として重要ですが、避難時にすべて背負うと移動できません。「持ち出す物」と「自宅で使う備蓄」を分けることが、現実的な防災準備です。'),

  block('防災バッグは何リットル？容量と選び方','h2'),
  image(bag,'防災バッグ20〜25L・25〜35L・35L以上の容量目安を示した図','大人1人は25〜35Lが目安。容量よりも実際に背負って歩けることを優先します。'),
  block('一般的な目安は、大人1人なら25〜35L、小柄な人や短時間避難なら20〜25L、家族用品や冬物を多く持つ場合は35L以上です。ただし、体格や中身によって適正は変わります。大きいバッグほど詰めすぎやすいため、容量だけで決めないでください。'),
  number('両肩で背負えるリュック型を選ぶ'),number('胸ベルトや腰ベルトで揺れを抑えられるか確認する'),number('反射材、撥水性、丈夫なファスナーを確認する'),number('中身を入れた状態で背負い、階段や近所を歩いてみる'),
  block('一人で持ち上げられない重さでは、いざというとき運べません。家族で荷物を分散し、子どもや高齢者には軽い個人用品だけを持ってもらう方法もあります。'),

  block('家族構成・状況別に追加する物','h2'),
  block('赤ちゃん・子どもがいる家庭','h3'),
  bullet('液体ミルク、哺乳瓶、離乳食'),bullet('紙おむつ、おしりふき、防臭袋'),bullet('母子健康手帳のコピー'),bullet('小さなおもちゃや安心できる物'),
  block('高齢者・持病がある人','h3'),
  bullet('処方薬、お薬手帳、医療情報'),bullet('入れ歯用品、補聴器、予備電池'),bullet('杖、介護用品、やわらかい非常食'),
  block('ペットと避難する家庭','h3'),
  bullet('フード、水、食器、薬'),bullet('リード、ハーネス、キャリー'),bullet('トイレ用品、飼い主情報、写真'),
  block('ペット同行避難の受け入れ方は自治体や避難所で異なります。地域のルールと避難先を事前に確認してください。'),

  block('最後に入れたい乾電池式モバイルバッテリー','h2'),
  block('スマホは安否確認、地図、災害情報、ライトに使うため、電源は重要です。充電式モバイルバッテリーは主力として便利ですが、長期停電で使い切ると充電できません。そこで予備として役立つのが、交換可能な単3形乾電池を使う乾電池式モバイルバッテリーです。'),
  block('乾電池式は充電速度や充電量が控えめなため、主力ではなく「連絡に必要な最低限の電力をつなぐ保険」と考えます。ライトやラジオと乾電池の規格を単3形へそろえると、備蓄を共用しやすくなります。未使用の予備電池、端末に合うケーブルと一緒に防水ポーチへ入れ、定期点検してください。'),
  link('製品例：','Panasonic「乾電池式モバイルバッテリー」','https://panasonic.jp/battery/mobile-battery.html'),

  block('防災グッズを詰めた後の点検方法','h2'),
  number('中身を床へ並べ、家族ごとの必需品があるか確認する'),number('食品・水・薬・電池の期限を一覧にする'),number('スマホ充電、ライト、ラジオ、携帯トイレを実際に試す'),number('バッグを背負って避難場所まで歩く'),number('半年に1回、季節用品とサイズを見直す'),
  block('玄関など、すぐ持ち出せて倒れた家具にふさがれにくい場所へ置きます。チェックリストをバッグの外ポケットに入れ、家族全員が保管場所を知っている状態にしましょう。'),

  block('よくある質問','h2'),
  block('Q. 防災グッズは何日分必要？','h3'),block('持ち出し袋は避難直後をしのぐ最小限、自宅備蓄は最低3日分、できれば1週間分が目安です。地域の被害想定や家族構成に合わせて増減してください。'),
  block('Q. 防災セットを買えば十分？','h3'),block('市販セットは出発点にはなりますが、常備薬、眼鏡、生理用品、乳幼児用品など個人に必要な物は別途追加が必要です。購入後に必ず開封し、内容と使い方を確認してください。'),
  block('Q. 防災バッグは重いほど安心？','h3'),block('いいえ。持ち出せなければ意味がありません。命に直結する物を優先し、水や長期食料など自宅備蓄と分け、実際に背負って歩ける重さにします。'),

  block('まとめ｜防災グッズの中身は優先順位で決める','h2'),
  block('防災グッズの中身は、水・非常食・常備薬・ライト・ラジオ・予備電池・携帯トイレ・連絡手段を最優先にします。そのうえで衛生用品、季節用品、家族固有の物を追加し、重い調理器具や重複品は自宅備蓄へ回しましょう。大人1人のバッグは25〜35Lを一つの目安にし、容量より実際に背負って避難できることを優先してください。'),
  block('充電式モバイルバッテリーとケーブルに加え、長期停電への予備として乾電池式モバイルバッテリーを入れておくと、スマホの電源確保を多重化できます。準備したら終わりではなく、半年ごとの点検と避難経路の確認まで行って、使える備えにしましょう。'),
  block('※本記事は2026年8月3日時点の公的情報をもとに作成しています。災害時は自治体、気象庁、消防などの最新情報を優先してください。')
]

const doc=await client.create({_type:'post',title:'防災グッズの中身一覧｜必需品・便利な物・バッグ容量を解説',slug:{_type:'slug',current:slug},excerpt:'防災グッズの中身を必須・便利・優先度が低い物に分けて紹介。非常持ち出し袋の容量、家族構成別の追加品、乾電池式モバイルバッテリーまで解説します。',publishedAt:'2026-08-03T00:00:00.000Z',mainImage:{_type:'image',asset:{_type:'reference',_ref:hero._id},alt:'防災グッズの中身を並べた非常持ち出しリュック'},body,seo:{_type:'seo',title:'防災グッズの中身一覧｜必需品とバッグ容量を解説',description:'防災グッズの中身を必須・便利・優先度別に紹介。非常持ち出し袋の容量や選び方、家族別の追加品、乾電池式モバイルバッテリーも解説します。',image:{_type:'image',asset:{_type:'reference',_ref:hero._id}},noIndex:false}})
console.log(JSON.stringify({documentId:doc._id,slug,assets:[hero._id,priority._id,bag._id]},null,2))
