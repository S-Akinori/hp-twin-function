import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO設定",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEOタイトル",
      type: "string",
      description: "未入力の場合は記事タイトルを使用します。",
      validation: (rule) => rule.max(60).warning("検索結果では60文字程度までが目安です。"),
    }),
    defineField({
      name: "description",
      title: "メタディスクリプション",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("検索結果では160文字程度までが目安です。"),
    }),
    defineField({
      name: "image",
      title: "OGP画像",
      type: "image",
      description: "未入力の場合はメイン画像を使用します。推奨サイズ: 1200×630px",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "検索エンジンに表示しない",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
