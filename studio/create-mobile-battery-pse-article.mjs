import {getCliClient} from 'sanity/cli'
import {readFile} from 'node:fs/promises'

const client=getCliClient({apiVersion:'2025-01-01'})
const slug='mobile-battery-pse'
const existing=await client.fetch(`*[_type=="post"&&slug.current==$slug][0]{_id,title}`,{slug})
if(existing) throw new Error(`既存記事があります: ${existing._id} ${existing.title}`)

const upload=async(path,filename)=>client.assets.upload('image',await readFile(new URL(path,import.meta.url)),{filename})
const [hero,check,safety]=await Promise.all([
  upload('../public/images/articles/mobile-battery-pse-hero.png','mobile-battery-pse-hero.png'),
  upload('../public/images/articles/mobile-battery-pse-check-guide.svg','mobile-battery-pse-check-guide.svg'),
  upload('../public/images/articles/mobile-battery-pse-safety-flow.svg','mobile-battery-pse-safety-flow.svg'),
])

let n=0; const key=()=>`pse-${++n}`
const block=(text,style='normal')=>({_type:'block',_key:key(),style,markDefs:[],children:[{_type:'span',_key:key(),text,marks:[]}]})
const list=(text,listItem='bullet')=>({...block(text),listItem,level:1})
const image=(asset,alt,caption)=>({_type:'image',_key:key(),asset:{_type:'reference',_ref:asset._id},alt,caption})
const linkBlock=(prefix,label,href)=>{const markKey=key();return {_type:'block',_key:key(),style:'normal',markDefs:[{_type:'link',_key:markKey,href,newWindow:true}],children:[{_type:'span',_key:key(),text:prefix,marks:[]},{_type:'span',_key:key(),text:label,marks:[markKey]}]}}

const body=[
  block('モバイルバッテリーを選ぶとき、「PSEマークがあれば絶対に安全」と思っていませんか。PSEは国内で販売するうえで重要な安全表示ですが、事故が起きないことを国が保証する認証マークではありません。この記事では、PSEマークの意味、正しい見方、表示のない製品を買わないための確認ポイント、安全な使い方までわかりやすく解説します。'),
  block('結論：モバイルバッテリーは丸形PSEマークを確認して選ぶ','h2'),
  block('日本国内で販売される規制対象のモバイルバッテリーには、丸形のPSEマークが必要です。2019年2月1日以降、PSE表示のないモバイルバッテリーは流通在庫を含めて販売できません。店頭でもネット通販でも、購入前に本体や商品画像の表示を確認しましょう。'),
  block('ただし、PSEマークは「国が個々の商品を審査して認定した証」ではありません。製造・輸入事業者が法令上の義務を履行し、技術基準への適合を確認した製品に表示するものです。PSEの有無に加えて、届出事業者名、販売元、保証、リコール情報も確認することが大切です。'),
  image(check,'モバイルバッテリーの丸形PSEマークと表示4項目の確認図','購入前に、丸形PSEマーク・届出事業者名・定格電圧・定格容量を確認します。'),
  block('PSEマークとは？電気用品安全法に基づく表示','h2'),
  block('PSEは「Product Safety Electrical Appliance & Materials」の略称として知られ、電気用品安全法の対象製品に付される表示です。同法は、電気用品による火災・感電などの危険や障害を防ぐため、製造・輸入・販売を規制しています。'),
  block('モバイルバッテリーは、内部にリチウムイオン蓄電池を持つ携帯用の蓄電装置です。事故の増加を背景に、2018年2月1日から電気用品安全法の規制対象として扱われ、1年間の経過措置を経て2019年2月1日から無表示品の販売が禁止されました。'),
  linkBlock('根拠：','経済産業省「モバイルバッテリーに関するFAQ」','https://www.meti.go.jp/policy/consumer/seian/denan/mlb_faq.html'),
  block('丸形とひし形の違い','h3'),
  block('PSEマークには丸形とひし形があります。モバイルバッテリーは「特定電気用品以外の電気用品」に分類されるため、確認するのは丸形です。ひし形は、直流電源装置（ACアダプター）など、より厳しい第三者適合性検査が求められる「特定電気用品」に使われます。製品によっては、本体と付属ACアダプターに異なる形のPSEマークが表示されることがあります。'),
  block('PSEマークは認証取得ではない','h3'),
  block('「PSE認証済み」「PSE取得」という表現を見かけますが、PSEは国が製品ごとに許可証を発行する制度ではありません。製造・輸入事業者が届出、技術基準への適合確認、検査記録の作成・保存などの義務を果たしたうえで、自ら表示します。そのため、マークだけでなく表示内容と事業者の信頼性をセットで見る必要があります。'),
  block('モバイルバッテリーのPSE表示はどこを見る？','h2'),
  block('原則として、PSEマークはモバイルバッテリー本体の外側に表示されます。裏面、底面、側面のラベルやレーザー刻印を探してください。本体が小さく表示が困難な場合に限り、パッケージへの表示が認められることがあります。ネット通販では、商品ページに本体裏面の鮮明な写真があるか確認しましょう。'),
  block('確認すべき4項目','h3'),
  list('丸形のPSEマークがある'),
  list('製造または輸入を行う届出事業者名がある'),
  list('定格電圧（V）が表示されている'),
  list('定格容量（mAhまたはAh）が表示されている'),
  block('マークだけが単独で印刷され、事業者名や定格表示が確認できない商品は避けるのが無難です。画像が不鮮明なら、購入前に販売者へ本体表示の写真を問い合わせてください。'),
  block('PSEマークがないモバイルバッテリーは違法？','h2'),
  block('規制対象のモバイルバッテリーをPSE表示なしで日本国内に販売・販売目的で陳列することは認められていません。一方、購入・所持・使用する消費者自身が直ちに処罰されるという意味ではありません。法律上の販売規制と、利用者の安全判断は分けて考えましょう。'),
  block('手元の製品にPSE表示が見当たらない場合は、まず取扱説明書やメーカー公式情報を確認してください。規制前に購入した古い製品、表示が摩耗した製品、出所が不明な製品は、劣化の可能性も含めて使用継続を慎重に判断します。膨張・異常発熱・異臭・液漏れがあれば、充電や分解をせず使用を中止してください。'),
  block('海外通販・フリマで買うときの注意点','h2'),
  block('海外通販サイトやフリマアプリでは、日本向けの表示や販売者情報を確認しにくい商品があります。「PSE対応」と商品名に書かれていても、それだけでは本体の適切な表示を確認したことになりません。価格だけで判断せず、次の点を見てください。'),
  list('本体表示を読める商品画像が掲載されている'),
  list('国内の販売者・輸入事業者名と連絡先が明確である'),
  list('保証期間、返品条件、事故時の窓口が示されている'),
  list('型番、容量、入出力仕様が説明と本体表示で一致している'),
  list('不自然に安い、容量表記が極端、説明が曖昧な商品を避ける'),
  block('中古品も販売時にはPSE表示の確認対象です。個人間取引では保管状態や落下歴、電池の劣化を判断しにくいため、少しでも膨張や変形がある製品は購入・使用しないでください。'),
  image(safety,'PSE表示だけに頼らないモバイルバッテリーの安全確認フロー','表示・販売者・リコール・製品状態の4段階で確認します。'),
  block('PSEマークがあっても安全性を保証しきれない理由','h2'),
  block('PSE表示は大切な最低条件ですが、使用中の事故を完全に防ぐものではありません。落下や圧迫、高温環境、非対応充電器の使用、経年劣化、製造上の不具合などによって、発熱・発煙・発火につながる可能性があります。購入後も使い方と製品状態を確認しましょう。'),
  block('安全に使うための7つのポイント','h3'),
  list('直射日光が当たる車内や暖房器具の近くなど、高温になる場所に放置しない','number'),
  list('落下、強い衝撃、圧迫、水ぬれを避ける','number'),
  list('布団やバッグの中など、熱がこもる場所で充電しない','number'),
  list('製品が指定する充電器・ケーブルを使い、端子に異物を入れない','number'),
  list('就寝中や外出中の長時間充電を避け、異常に気づける場所で充電する','number'),
  list('膨張、変形、異臭、異音、液漏れ、異常発熱があれば使用を中止する','number'),
  list('メーカー名と型番でリコール情報を定期的に確認する','number'),
  linkBlock('安全情報：','経済産業省「リチウムイオン蓄電池搭載製品の事故に気をつけましょう！」','https://www.meti.go.jp/product_safety/consumer/lithium_ion_battery.html'),
  block('PSEマークに関するよくある質問','h2'),
  block('Q. PSEマークがあれば絶対に発火しない？','h3'),
  block('いいえ。PSEは法令上の技術基準への適合確認を示す重要な表示ですが、誤使用、衝撃、高温、劣化、不具合による事故まで保証するものではありません。表示の確認と正しい使い方の両方が必要です。'),
  block('Q. PSEマークはシールでもよい？','h3'),
  block('表示方法は印刷や刻印に限られず、容易に消えないなど法令上の表示要件を満たす必要があります。シールだから直ちに違法とは判断できませんが、表示が不自然、はがれやすい、事業者名がない場合は販売者へ確認しましょう。'),
  block('Q. パッケージにしかPSEマークがないのは違法？','h3'),
  block('原則は本体の外側への表示です。ただし、本体が小さく表示が困難な場合はパッケージ表示が認められる場合があります。単に商品ページにPSEと書かれているだけでは、本体またはパッケージの法定表示を確認したことにはなりません。'),
  block('Q. 乾電池式のモバイルバッテリーにもPSEマークは必要？','h3'),
  block('製品の構造や電池の種類によって電気用品安全法上の扱いが異なります。一般的なリチウムイオン蓄電池内蔵型と同じだと決めつけず、製造・販売事業者の表示と取扱説明書を確認してください。乾電池式は内蔵充電池を長期間満充電で保管する必要がなく、防災用の選択肢になりますが、対応電池・出力・使用方法を守ることが重要です。'),
  block('まとめ：PSE表示と販売者情報をセットで確認する','h2'),
  block('モバイルバッテリーを購入するときは、丸形PSEマーク、届出事業者名、定格電圧、定格容量の4点を確認しましょう。2019年2月1日以降、規制対象のモバイルバッテリーはPSE表示なしで販売できません。'),
  block('ただし、PSEマークは事故ゼロを保証するものではありません。信頼できる販売者を選び、リコール情報を確認し、高温・衝撃・水ぬれを避けて使うことが大切です。表示が不明確な製品や、膨張・異常発熱などの兆候がある製品は使用を控え、自治体やメーカーの案内に従って適切に処分してください。'),
  block('※本記事は2026年8月1日時点の経済産業省の公開情報をもとに作成しています。法令や運用は変更される場合があるため、最新情報は公式サイトで確認してください。'),
]

const doc=await client.create({_type:'post',title:'モバイルバッテリーのPSEマークとは？意味・見方・ない製品の注意点を解説',slug:{_type:'slug',current:slug},excerpt:'モバイルバッテリーのPSEマークの意味を解説。丸形・ひし形の違い、表示場所、PSEなし製品の扱い、海外通販やフリマでの注意点、安全な使い方まで紹介します。',publishedAt:'2026-08-01T00:00:00.000Z',mainImage:{_type:'image',asset:{_type:'reference',_ref:hero._id},alt:'モバイルバッテリー本体のPSE表示を確認している様子'},body,seo:{_type:'seo',title:'モバイルバッテリーのPSEマークとは？意味と見方を解説',description:'モバイルバッテリーのPSEマークの意味、丸形とひし形の違い、表示場所、PSEなし製品の注意点、安全な選び方・使い方を解説します。',image:{_type:'image',asset:{_type:'reference',_ref:hero._id}},noIndex:false}})
console.log(JSON.stringify({documentId:doc._id,slug,assets:[hero._id,check._id,safety._id]},null,2))
