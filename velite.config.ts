import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(300),
    slug: s.slug("posts"),
    category: s.enum(["ABAP", "AI", "Economy", "ART", "BOOK", "Coffee", "TRAVEL"]),
    tags: s.array(s.string()).default([]),
    author: s.string().default("박스로고 입은 개발자"),
    publishedAt: s.isodate(),
    updatedAt: s.isodate().optional(),
    featured: s.boolean().default(false),
    cover: s.string().optional(),
    body: s.mdx(),
    toc: s.toc(),
  }),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
});
