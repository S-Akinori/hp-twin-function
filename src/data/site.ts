export const navItems = [
  { label: "ストーリー", href: "/story" },
  { label: "特徴", href: "/features" },
  { label: "使い方", href: "/manual" },
  { label: "スペック", href: "/spec" },
  { label: "FAQ", href: "/faq" },
];

export const heroFeatures = [
  { label: "スマホを充電", icon: "/assets/icons/10_phone.png" },
  { label: "Wi-Fiルーター内蔵", icon: "/assets/icons/08_wifi.png" },
  { label: "乾電池3本対応", icon: "/assets/icons/18_three_batteries.png" },
  { label: "海外でも使える", icon: "/assets/icons/11_travel_airplane.png" },
];

export const storyUses = [
  { title: "外出", text: "スマホの充電も、ネットもこれ一台。", icon: "/assets/icons/11_travel_airplane.png" },
  { title: "出張", text: "荷物はコンパクトに、どこでも快適につながる。", icon: "/assets/icons/14_cart.png" },
  { title: "防災", text: "電源がなくても、安心はつくれる。", icon: "/assets/icons/12_home_safety.png" },
];

export const featureCards = [
  {
    no: "01",
    title: "乾電池3本で復活",
    text: "充電を忘れても、コンビニなどで乾電池3本を入れるだけですぐに使える。",
    icon: "/assets/icons/18_three_batteries.png",
  },
  {
    no: "02",
    title: "Wi-Fi搭載",
    text: "買い切り型で、面倒な契約不要。すぐに使えて、どこでも快適通信。",
    icon: "/assets/icons/08_wifi.png",
  },
  {
    no: "03",
    title: "ケーブル不要で直接充電",
    text: "コネクター一体型で、スマホに直接充電。持ち運びもスマート。",
    icon: "/assets/icons/09_lightning.png",
  },
];

export const ctaFeatures = [
  {
    title: "乾電池3本で動く",
    text: "電源確保も不要。",
    icon: "/assets/icons/07_battery.png",
  },
  {
    title: "Wi-Fi搭載",
    text: "すぐに使える。",
    icon: "/assets/icons/08_wifi.png",
  },
  {
    title: "ケーブル不要",
    text: "直接接続で充電。",
    icon: "/assets/icons/16_usb_c.png",
  },
];

export const manualSteps = [
  {
    no: "1",
    title: "乾電池3本を入れる",
    text: "本体背面のカバーを開けて、単3形乾電池を3本セットします。",
    note: "単3形乾電池 x 3本 (充電池も使用可)",
    icon: "/assets/icons/18_three_batteries.png",
    image: "/assets/visuals/02_product_device_with_three_batteries.png",
  },
  {
    no: "2",
    title: "スマホに直接接続",
    text: "本体のコネクタをスマホに直接差し込みます。",
    note: "機種に合わせて接続",
    icon: "/assets/icons/16_usb_c.png",
    image: "/assets/visuals/04_product_charging_having.png",
  },
  {
    no: "3",
    title: "Wi-Fiをオンにする",
    text: "側面のWi-Fiボタンを長押しするとランプが点灯します。",
    note: "最大8台まで接続可能",
    icon: "/assets/icons/08_wifi.png",
    image: "/assets/visuals/product_wifi.png",
  },
];

export const specs = [
  { name: "対応電池", value: "単3形乾電池 x 3本" },
  { name: "同時接続台数", value: "最大8台" },
  { name: "サイズ", value: "約 80 x 60 x 25 mm" },
  { name: "重量", value: "約120g" },
];

export const specDetails = [
  { name: "製品名", value: "Twin Function" },
  { name: "対応電池", value: "単3形乾電池 x 3本" },
  { name: "対応充電池", value: "単3形充電池にも対応" },
  { name: "接続端子", value: "スマートフォンへ直接接続" },
  { name: "Wi-Fi機能", value: "データ通信対応SIMカード利用時にWi-Fi接続可能" },
  { name: "同時接続台数", value: "最大8台" },
  { name: "サイズ", value: "約 80 x 60 x 25 mm" },
  { name: "重量", value: "約120g" },
  { name: "想定シーン", value: "外出、出張、防災、旅行、停電時の備え" },
];

export const faqItems = [
  {
    question: "乾電池は何本必要ですか？",
    answer: "単3形乾電池を3本使用します。日常使いだけでなく、非常時にも入手しやすい電池で使える構成です。",
  },
  {
    question: "充電池は使えますか？",
    answer: "単3形充電池にも対応しています。使用前に電池の残量や状態を確認してください。",
  },
  {
    question: "ケーブルは必要ですか？",
    answer: "本体のコネクタをスマートフォンへ直接接続する設計です。対応端末であればケーブルなしで充電できます。",
  },
  {
    question: "Wi-Fiを使うには何が必要ですか？",
    answer: "データ通信対応のSIMカードが必要です。SIMカードのサイズ、通信契約、通信エリアを事前に確認してください。",
  },
  {
    question: "何台まで接続できますか？",
    answer: "最大8台までの同時接続を想定しています。通信状況や利用環境により体感速度は変わります。",
  },
  {
    question: "防災用として保管できますか？",
    answer: "保管時は乾電池を本体から取り外してください。液漏れや故障を避けるため、定期的な動作確認をおすすめします。",
  },
];

export const purchaseFeatures = [
  { label: "単3乾電池3本対応", icon: "/assets/icons/07_battery.png" },
  { label: "Wi-Fi搭載", icon: "/assets/icons/08_wifi.png" },
  { label: "最大8台接続", icon: "/assets/icons/10_phone.png" },
];

export const assets = {
  product : "/assets/visuals/00_product.png",
  productSingle: "/assets/visuals/01_product_device_single.png",
  productWithBatteries: "/assets/visuals/02_product_device_with_three_batteries.png",
  productCharging: "/assets/visuals/04_product_charging_having.png",
  productBackground: "/assets/backgrounds/product_background.png",
  lightupBackground: "/assets/backgrounds/bg-light-up.png",
  circuitGrid: "/assets/backgrounds/04_circuit_grid.png",
  metallicCloseup: "/assets/backgrounds/05_metallic_closeup.png",
  cartIcon: "/assets/icons/14_cart.png",
  batteryIcon: "/assets/icons/07_battery.png",
  manualIcon: "/assets/icons/13_manual_book.png",
};
