import { assets } from "./site";

export interface ManualStep {
  label: string;
  no: string;
  title: string;
  text: string;
  images: string[];
  intro?: string;
  notes?: string[];
  details?: { label: string; value: string }[];
}

export const manualToc = [
  { label: "動画マニュアル", href: "#manual-video" },
  { label: "Wi-Fiを使用する場合", href: "#wifi-use" },
  { label: "充電器として使う場合", href: "#charger-use" },
  { label: "ご使用上の注意", href: "#safety" },
  { label: "トラブル対応", href: "#trouble" },
];

export const wifiUsageSteps: ManualStep[] = [
  {
    label: "Step 1",
    no: "1",
    title: "裏面のスライドカバーを外し乾電池を入れる",
    text: "裏面のスライドカバーを外し、乾電池を3つ入れます。",
    notes: [
      "故障を防ぐため、乾電池は必ずマイナス（−）側から入れてください。",
      "アルカリ乾電池またはニッケル水素電池を使用してください。",
      "普段使いではニッケル水素電池の利用を推奨します。",
    ],
    images: ["/assets/manual/manual1.jpg"],
  },
  {
    label: "Step 2",
    no: "2",
    title: "SIMカードを差し込み、スイッチをWi-Fiへ動かす",
    text: "側面のカードスロットにSIMカードを差し込み、スイッチを「Wi-Fi」に動かします。",
    notes: ["IC（金属）面を下にして、カチッという音がするまで押し込んでください。"],
    images: ["/assets/manual/manual2.jpg", "/assets/manual/manual3.jpg"],
  },
  {
    label: "Step 3",
    no: "3",
    title: "ランプの点灯状態を確認する",
    text: "スイッチを入れると表面の真ん中のアイコンが赤色に点滅します。数秒すると真ん中と右のライトが白色に点灯し、これは正常に動作していることを示します。",
    images: ["/assets/manual/manual4.jpg"],
  },
  {
    label: "Step 4",
    no: "4",
    title: "Wi-Fi設定からTF_xxに接続する",
    text: "スマホやパソコンでWi-Fi設定を開き、「TF_xx」という名前のWi-Fiを選択しパスワードを入力します。",
    notes: ["Wi-Fi名とパスワードは端末横にあるシールを参照してください。"],
    images: ["/assets/manual/manual5.jpg"],
  },
  {
    label: "Step 5",
    no: "5",
    title: "管理画面にログインする",
    intro: "以降はSIMを入れて自動で接続できなかった時のAPN設定の方法です。",
    text: "スマホまたはPCでGoogle ChromeやSafariを開き、アドレスバーに「192.168.100.1」と入力して検索します。画像の管理画面が表示されたら、パスワードを入力してログインします。",
    notes: [
      "PCでの操作を推奨します。",
      "パスワードは製品側面のシールを参照してください。",
    ],
    images: ["/assets/manual/manual6.png"],
  },
  {
    label: "Step 6",
    no: "6",
    title: "ネットワーク設定を開く",
    text: "ログイン後、画面中央の「ネットワーク設定」をクリックします。",
    images: ["/assets/manual/manual7.png"],
  },
  {
    label: "Step 7",
    no: "7",
    title: "APN情報を入力して適用する",
    text: "APNをクリックし、モードを「手動」に変更します。プロファイル名やAPNなど、SIMで指定された値を入力し、「適用」をクリックして完了です。",
    notes: [
      "APN情報はSIMによって異なります。購入時に原則情報は同封されていますが、不明な場合は購入先にお問い合わせください。",
      "弊社より購入いただいたSIMのAPN情報は以下の通りです。",
    ],
    details: [
      { label: "プロファイル名", value: "お好きな名前を入力してください。" },
      { label: "APN", value: "m-air.jp" },
      { label: "その他の項目", value: "設定不要です。" },
    ],
    images: ["/assets/manual/manual8.png"],
  },
];

export const chargerUsageSteps: ManualStep[] = [
  {
    label: "Step 1",
    no: "1",
    title: "スイッチをUSBに入れる",
    text: "乾電池を入れた後、スイッチを「USB」に入れます。",
    notes: ["故障を防ぐため、乾電池は必ずマイナス（−）側から入れてください。"],
    images: ["/assets/manual/manual3.jpg"],
  },
  {
    label: "Step 2",
    no: "2",
    title: "端子を出して直接差し込む",
    text: "タイプCまたはLightning端子を指で引っ掛けるように出し、スマートフォンに直接差し込みます。",
    notes: [
      "使用していると本体が熱くなることもありますが異常ではありません。",
      "連続で使用すると電池が残っていても自動でOFFになることがあります。その際は数分待って再度使用してください。",
    ],
    images: ["/assets/manual/manual-charger-phone.png"],
  },
];

export const simWarnings = [
  "SIMカードはデータ通信対応のものをご使用ください。",
  "SIMカードの抜き差しは、本体の電源を切った状態で行ってください。",
  "カードの向きが合わない場合は、無理に押し込まないでください。",
  "SIMカードのサイズが本体に対応しているか事前に確認してください。",
];

export const wifiHints = [
  "ネットワーク名やパスワードは、本体ラベルまたは付属資料をご確認ください。",
  "接続できない場合は、スマートフォンのWi-Fiを一度オフにしてから再接続してください。",
  "複数端末で接続する場合は、接続台数や通信状況を確認してください。",
  "Wi-Fi接続中もスマートフォン充電は利用できます。",
];

export const safetyCards = [
  {
    title: "乾電池の取り扱い",
    text: "長期間使用しない場合は乾電池を取り外してください。液漏れや故障の原因になる場合があります。",
  },
  {
    title: "端子の清掃",
    text: "端子部分が汚れている場合は、乾いた柔らかい布で清掃してください。水や洗剤は使用しないでください。",
  },
  {
    title: "使用環境",
    text: "高温多湿の場所、直射日光の当たる場所、ほこりの多い場所での使用や保管は避けてください。",
  },
  {
    title: "充電中の取り扱い",
    text: "使用中に本体が熱を持つことがあります。異常に熱い、においがするなどの場合は使用を中止してください。",
  },
];

export const troubleshootingCards = [
  {
    title: "充電されない",
    text: "乾電池の向きと残量を確認してください。端子が汚れている場合は清掃し、新しい乾電池でもお試しください。",
  },
  {
    title: "Wi-Fiに接続できない",
    text: "ネットワーク名が表示されているか、パスワードが正しいか、SIMカードが正しく装着されているか確認してください。",
  },
  {
    title: "SIMカードが認識されない",
    text: "SIMカードの向き、サイズ、データ通信対応の有無を確認してください。抜き差しは電源を切ってから行ってください。",
  },
  {
    title: "インターネットに接続できない",
    text: "SIMカードの通信契約、通信エリア、データ通信設定を確認してください。",
  },
  {
    title: "動作が不安定",
    text: "乾電池の残量が少ない可能性があります。新しい単3乾電池3本に交換して再度お試しください。",
  },
];

export const manualAssets = {
  hero: assets.productWithBatteries,
  product: assets.product,
  divider: "/assets/ui/20_yellow_light_divider.png",
};
