import {mkdir, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import sharp from 'sharp'

const out=resolve('../public/images/articles/disaster-essentials-sections')
await mkdir(out,{recursive:true})
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const colors=['#e2543d','#e98a3b','#d7ad3f','#74856a']
const icon=(kind,x,y,color)=>{
  const common=`fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"`
  const paths={
    water:`<path ${common} d="M${x} ${y-35}c-30 38-42 55-42 80a42 42 0 0 0 84 0c0-25-12-42-42-80z"/>`,
    light:`<path ${common} d="M${x-38} ${y-8}a38 38 0 1 1 76 0c0 18-10 28-20 40v18h-36V32c-10-12-20-22-20-40zM${x-18} ${y+58}h36"/>`,
    radio:`<rect ${common} x="${x-48}" y="${y-35}" width="96" height="75" rx="10"/><path ${common} d="M${x-28} ${y-35}l50-30M${x-26} ${y}h18m30-6a13 13 0 1 0 0 26 13 13 0 0 0 0-26z"/>`,
    medicine:`<rect ${common} x="${x-47}" y="${y-38}" width="94" height="78" rx="14"/><path ${common} d="M${x} ${y-20}v42m-21-21h42"/>`,
    toilet:`<path ${common} d="M${x-42} ${y-42}h84v30c0 38-16 58-42 58s-42-20-42-58zM${x-25} ${y+46}v18h50V46"/>`,
    glove:`<path ${common} d="M${x-35} ${y+50}V5m0 8v-42m18 37v-52m18 48v-52m18 55v-40m0 42 22 15c14 10 8 31-7 43L16 55c-25 18-51 10-51-5"/>`,
    family:`<circle ${common} cx="${x-25}" cy="${y-30}" r="23"/><circle ${common} cx="${x+30}" cy="${y-18}" r="18"/><path ${common} d="M${x-65} ${y+52}c4-42 21-60 40-60S12 10 16 52m0 0c4-30 17-44 31-44s28 14 31 44"/>`,
    bag:`<rect ${common} x="${x-45}" y="${y-38}" width="90" height="88" rx="20"/><path ${common} d="M${x-22} ${y-38}v-12a22 22 0 0 1 44 0v12M${x-25} ${y+10}h50"/>`,
    battery:`<rect ${common} x="${x-48}" y="${y-30}" width="92" height="60" rx="12"/><path ${common} d="M${x+44} ${y-10}h12v20H44M${x-25} ${y}h18m-9-9v18m28-9h18"/>`,
    check:`<circle ${common} cx="${x}" cy="${y}" r="50"/><path ${common} d="M${x-26} ${y}l18 19 36-42"/>`,
    question:`<circle ${common} cx="${x}" cy="${y}" r="50"/><path ${common} d="M${x-18} ${y-16}c4-25 43-26 43 1 0 22-24 21-24 40m0 19h1"/>`,
    home:`<path ${common} d="M${x-52} ${y-4}l52-45 52 45v58h-104zM${x-15} ${y+54}V17h30v37"/>`
  };return paths[kind]||paths.check
}
const render=({file,title,subtitle,cards,footer})=>{
  const cardW=cards.length===4?248:cards.length===3?334:cards.length===2?510:1030
  const gap=18,start=70
  const cardsSvg=cards.map((c,i)=>{const x=start+i*(cardW+gap);return `<g transform="translate(${x} 188)"><rect width="${cardW}" height="332" rx="26" fill="#fff" stroke="#ded9cf"/><circle cx="${cardW/2}" cy="88" r="62" fill="${colors[i%4]}18"/>${icon(c.icon,cardW/2,88,colors[i%4])}<text x="${cardW/2}" y="190" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#20252b">${esc(c.head)}</text>${c.lines.map((l,j)=>`<text x="${cardW/2}" y="${235+j*34}" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#5d646b">${esc(l)}</text>`).join('')}</g>`}).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#f7f4ee"/><rect x="0" y="0" width="18" height="675" fill="#e2543d"/><text x="70" y="82" font-family="sans-serif" font-size="43" font-weight="700" fill="#20252b">${esc(title)}</text><text x="72" y="127" font-family="sans-serif" font-size="21" fill="#667079">${esc(subtitle)}</text>${cardsSvg}<rect x="70" y="560" width="1060" height="64" rx="16" fill="#20252b"/><text x="600" y="601" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="700" fill="#fff">${esc(footer)}</text></svg>`
}

const diagrams=[
  {file:'01-essentials.svg',title:'本当に必要な防災グッズ10選',subtitle:'最初にそろえるのは、命と避難に直結するもの',cards:[{icon:'water',head:'生命維持',lines:['水・非常食','常備薬・救急用品']},{icon:'light',head:'安全確保',lines:['ライト・雨具','手袋・ホイッスル']},{icon:'radio',head:'情報・連絡',lines:['ラジオ・スマホ','充電器・連絡先']},{icon:'toilet',head:'衛生',lines:['携帯トイレ','マスク・生理用品']}],footer:'「全員共通の必需品」＋「自分専用の必需品」で完成'},
  {file:'02-life-information.svg',title:'最優先は 水・薬・明かり・情報',subtitle:'停電・断水・通信障害が重なっても行動できる構成へ',cards:[{icon:'water',head:'水と食料',lines:['移動中の脱水を防ぐ','加熱不要の食品を選ぶ']},{icon:'medicine',head:'薬と医療情報',lines:['処方薬を最優先','情報は紙でも携帯']},{icon:'light',head:'明かり',lines:['両手が空くライト','予備電池をセット']},{icon:'radio',head:'情報',lines:['ラジオを併用','連絡先を紙に控える']}],footer:'スマホ1台に情報と電源を集中させない'},
  {file:'03-evacuation.svg',title:'避難を続けるための4点セット',subtitle:'移動中のけが・雨・断水・停電を具体的に想定',cards:[{icon:'toilet',head:'携帯トイレ',lines:['便袋＋凝固剤','防臭袋も用意']},{icon:'glove',head:'手袋・雨具',lines:['破片から手を守る','両手が空くポンチョ']},{icon:'question',head:'ホイッスル',lines:['閉じ込め時に合図','軽くて用途が明確']},{icon:'bag',head:'現金・身分証',lines:['硬貨も少額用意','コピーは防水袋へ']}],footer:'「軽い・代用しにくい・すぐ使える」を優先'},
  {file:'04-personal-needs.svg',title:'家族構成で追加する専用品',subtitle:'一般的なセットに入っていない「代替できない物」を確認',cards:[{icon:'family',head:'乳幼児',lines:['ミルク・離乳食','おむつ・母子手帳']},{icon:'medicine',head:'高齢者・持病',lines:['処方薬・補聴器','介護用品・医療情報']},{icon:'bag',head:'女性',lines:['生理用品・防臭袋','下着・防犯ブザー']},{icon:'home',head:'ペット',lines:['フード・薬・キャリー','飼い主情報・写真']}],footer:'家族ごとに1枚の「専用品リスト」を作る'},
  {file:'05-cut-items.svg',title:'持ち出し袋から減らしやすい物',subtitle:'不要ではなく「自宅備蓄へ移す」と考える',cards:[{icon:'bag',head:'重すぎる',lines:['大量の水・缶詰','大型の鍋や寝具']},{icon:'check',head:'役割が重なる',lines:['複数のライト','似た多機能ツール']},{icon:'question',head:'使い方が不明',lines:['未開封の特殊用品','平時に使えない物']},{icon:'home',head:'長期生活向け',lines:['大量の衣類・食料','自宅備蓄へ分離']}],footer:'家族固有の薬・乳幼児用品は減らさない'},
  {file:'06-three-questions.svg',title:'迷ったときの3つの質問',subtitle:'入れる・外すを感覚ではなく順番で判断',cards:[{icon:'medicine',head:'命に関わる？',lines:['ないと健康へ影響','YESなら残す']},{icon:'question',head:'代用できる？',lines:['他の物で兼用可能？','YESなら減らせる']},{icon:'bag',head:'運べる？',lines:['背負って歩ける？','NOなら分散・減量']}],footer:'命に影響し、代用できない物からバッグへ'},
  {file:'07-go-bag-vs-stock.svg',title:'持ち出し袋と自宅備蓄を分ける',subtitle:'目的が違うため、同じバッグへ全部入れない',cards:[{icon:'bag',head:'持ち出し袋',lines:['避難直後の最小限','すぐ背負える重さ','玄関・寝室に置く']},{icon:'home',head:'自宅備蓄',lines:['最低3日分を目安','水・食料・生活用品','場所を分散して収納']}],footer:'持って逃げる物 ≠ 自宅で生活するための物'},
  {file:'08-power-backup.svg',title:'災害時のスマホ電源は二重化',subtitle:'充電式を主力、乾電池式を長期停電への予備に',cards:[{icon:'battery',head:'充電式',lines:['普段から満充電','大容量で主力に']},{icon:'battery',head:'乾電池式',lines:['電池交換で再使用','最低限の連絡用']},{icon:'radio',head:'規格を統一',lines:['ライト・ラジオも単3','予備電池を共用']}],footer:'本体・ケーブル・予備電池を防水ポーチへ'},
  {file:'09-five-checks.svg',title:'半年ごとに行う5つの点検',subtitle:'「持っている」から「今すぐ使える」状態へ',cards:[{icon:'check',head:'期限',lines:['水・食品・薬','乾電池を交換']},{icon:'light',head:'動作',lines:['ライト・ラジオ','充電器を試す']},{icon:'toilet',head:'使い方',lines:['携帯トイレを練習','家族で手順共有']},{icon:'bag',head:'重さ・更新',lines:['避難路を歩く','季節・成長に対応']}],footer:'防災の日・誕生日・衣替えを点検日にする'},
  {file:'10-faq.svg',title:'防災グッズのよくある疑問',subtitle:'迷いやすい4項目を結論から確認',cards:[{icon:'question',head:'何日分？',lines:['持ち出しは最小限','備蓄は最低3日分']},{icon:'question',head:'市販セットだけ？',lines:['専用品を追加','必ず開封・点検']},{icon:'question',head:'寝袋やコンロ？',lines:['自宅備蓄向け','必需品の後に判断']},{icon:'question',head:'何kgまで？',lines:['一律の正解なし','実際に歩いて判断']}],footer:'地域の被害想定と家族構成で最終調整'},
  {file:'11-summary.svg',title:'本当に必要な防災グッズの完成形',subtitle:'命・避難・個別事情の3層で考える',cards:[{icon:'water',head:'命',lines:['水・食料・薬','明かり・情報']},{icon:'glove',head:'避難',lines:['トイレ・衛生','雨具・手袋・現金']},{icon:'family',head:'個別事情',lines:['乳幼児・介護','アレルギー・ペット']}],footer:'背負って歩く → 道具を試す → 半年ごとに更新'}
]

for(const d of diagrams){
  const svg=render(d)
  await writeFile(resolve(out,d.file),svg,'utf8')
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(resolve(out,d.file.replace('.svg','.png')))
}
console.log(JSON.stringify({count:diagrams.length,out,files:diagrams.flatMap(d=>[d.file,d.file.replace('.svg','.png')])},null,2))
