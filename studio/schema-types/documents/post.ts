import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "ブログ記事",
  type: "document",
  groups: [
    { name: "content", title: "記事" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      group: "content",
      description: "記事URLに使用します。原則として英数字とハイフンで設定してください。",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "概要",
      type: "text",
      rows: 3,
      group: "content",
      description: "一覧・SNS・検索結果に使う短い説明です。",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "category",
      title: "カテゴリー",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "メイン画像",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "代替テキスト",
          type: "string",
          validation: (rule) => rule.required().warning("SEOとアクセシビリティのため入力してください。"),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "公開日時",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "blockContent",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO設定",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "公開日の新しい順",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        media,
        subtitle: publishedAt
          ? new Intl.DateTimeFormat("ja-JP").format(new Date(publishedAt))
          : "公開日未設定",
      };
    },
  },
});
