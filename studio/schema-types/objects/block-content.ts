import { defineArrayMember, defineField, defineType } from "sanity";

const LinkIcon = () => "🔗";
const CtaIcon = () => "CTA";

export const blockContent = defineType({
  name: "blockContent",
  title: "本文",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "本文", value: "normal" },
        { title: "見出し2", value: "h2" },
        { title: "見出し3", value: "h3" },
        { title: "見出し4", value: "h4" },
        { title: "引用", value: "blockquote" },
      ],
      lists: [
        { title: "箇条書き", value: "bullet" },
        { title: "番号付き", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "太字", value: "strong" },
          { title: "斜体", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "リンク",
            type: "object",
            icon: LinkIcon,
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({
                name: "newWindow",
                title: "新しいタブで開く",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      name: "image",
      title: "画像",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "代替テキスト",
          type: "string",
          validation: (rule) => rule.required().warning("SEOとアクセシビリティのため入力してください。"),
        }),
        defineField({
          name: "caption",
          title: "キャプション",
          type: "string",
        }),
      ],
    }),
    defineArrayMember({
      name: "cta",
      title: "CTAボタン",
      type: "object",
      icon: CtaIcon,
      fields: [
        defineField({
          name: "label",
          title: "ボタンのテキスト",
          type: "string",
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: "url",
          title: "リンク先URL",
          type: "url",
          validation: (rule) =>
            rule.required().uri({
              allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"],
            }),
        }),
        defineField({
          name: "variant",
          title: "ボタンのスタイル",
          type: "string",
          initialValue: "primary",
          options: {
            layout: "radio",
            list: [
              { title: "メイン（黄色）", value: "primary" },
              { title: "サブ（枠線）", value: "secondary" },
            ],
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "newWindow",
          title: "新しいタブで開く",
          type: "boolean",
          initialValue: false,
        }),
      ],
      preview: {
        select: {
          title: "label",
          subtitle: "url",
          variant: "variant",
        },
        prepare({ title, subtitle, variant }) {
          return {
            title: title || "CTAボタン",
            subtitle: `${variant === "secondary" ? "サブ" : "メイン"} · ${subtitle || "リンク未設定"}`,
          };
        },
      },
    }),
  ],
});
