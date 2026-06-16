import { assets } from "./site";

export const manualToc = [
  { label: "基本的な使い方", href: "#basic" },
  { label: "SIMカード設定", href: "#sim" },
  { label: "Wi-Fi接続", href: "#wifi" },
  { label: "ご使用上の注意", href: "#safety" },
  { label: "トラブル対応", href: "#trouble" },
];

export const basicSteps = [
  {
    label: "Step 1",
    no: "1",
    title: "乾電池をセット",
    text: "本体の電池カバーを開け、単3乾電池を3本セットします。電池の向きを確認し、無理に押し込まないでください。",
    icon: "/assets/icons/18_three_batteries.png",
  },
  {
    label: "Step 2",
    no: "2",
    title: "SIMカードをセット",
    text: "データ通信対応SIMカードを本体のSIMスロットへ差し込みます。切り欠きの向きを確認して装着してください。",
    icon: "/assets/icons/08_wifi.png",
  },
  {
    label: "Step 3",
    no: "3",
    title: "スマホに接続",
    text: "USB-Cまたは対応端子をスマートフォンに直接差し込みます。ケーブルを持ち歩かずに充電を開始できます。",
    icon: "/assets/icons/16_usb_c.png",
  },
  {
    label: "Step 4",
    no: "4",
    title: "Wi-Fiに接続",
    text: "スマートフォンのWi-Fi設定から、Twin Functionのネットワーク名を選択します。",
    icon: "/assets/icons/08_wifi.png",
  },
  {
    label: "Step 5",
    no: "5",
    title: "充電と通信を確認",
    text: "LED表示を確認し、充電とWi-Fi接続が正常に動作しているか確認します。",
    icon: "/assets/icons/17_status_leds.png",
  },
];

export const simSteps = [
  {
    label: "SIM 1",
    no: "1",
    title: "SIMカードスロットを開く",
    text: "本体側面または背面のSIMカードスロットカバーを開きます。",
  },
  {
    label: "SIM 2",
    no: "2",
    title: "SIMカードの向きを確認",
    text: "SIMカードの切り欠き部分を見て、スロットの形状に合う向きにします。",
  },
  {
    label: "SIM 3",
    no: "3",
    title: "SIMカードを差し込む",
    text: "SIMカードをゆっくり差し込み、奥まで入ったことを確認します。",
  },
  {
    label: "SIM 4",
    no: "4",
    title: "カバーを閉じる",
    text: "SIMカードスロットのカバーを閉じ、しっかり固定されているか確認します。",
  },
];

export const simWarnings = [
  "SIMカードはデータ通信対応のものをご使用ください。",
  "SIMカードの抜き差しは、本体の電源を切った状態で行ってください。",
  "カードの向きが合わない場合は、無理に押し込まないでください。",
  "SIMカードのサイズが本体に対応しているか事前に確認してください。",
];

export const wifiSteps = [
  {
    no: "1",
    title: "Wi-Fi設定を開く",
    text: "スマートフォンの設定アプリから、Wi-Fiまたは無線LAN設定を開きます。",
  },
  {
    no: "2",
    title: "ネットワークを選択",
    text: "利用可能なネットワーク一覧から、Twin FunctionまたはTFで始まるネットワーク名を選択します。",
  },
  {
    no: "3",
    title: "パスワードを入力",
    text: "パスワードを求められた場合は、本体ラベルまたは付属資料に記載のパスワードを入力します。",
  },
  {
    no: "4",
    title: "接続を確認",
    text: "スマートフォン上部にWi-Fiアイコンが表示され、通信できることを確認します。",
  },
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
