/**
 * 티스토리 → MDX 마이그레이션 스크립트
 *
 * 사용법: npx tsx scripts/migrate-tistory.ts
 *
 * 사전 요건:
 * 1. 티스토리 관리 > 데이터 > 블로그 백업에서 XML/HTML 내보내기
 * 2. 내보낸 파일을 scripts/tistory-backup/ 디렉토리에 저장
 *
 * 기능:
 * - HTML → Markdown 변환
 * - frontmatter 자동 생성
 * - 이미지 다운로드 → public/images/posts/ 저장
 * - 카테고리 매핑 (ABAP BOX → ABAP 등)
 */

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";

// ─── 카테고리 매핑 ───
const CATEGORY_MAP: Record<string, string> = {
  "ABAP BOX": "ABAP",
  "Economy BOX": "Economy",
  "AI BOX": "AI",
  "ART BOX": "ART",
  "BOOK BOX": "BOOK",
  "Coffee BOX": "Coffee",
  "TRAVEL BOX": "TRAVEL",
};

// ─── 설정 ───
const BACKUP_DIR = path.resolve(__dirname, "tistory-backup");
const OUTPUT_DIR = path.resolve(__dirname, "../src/content/posts");
const IMAGE_DIR = path.resolve(__dirname, "../public/images/posts");

// ─── 유틸리티 ───
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[가-힣]+/g, (match) => {
      // 한글은 간단한 음역 대신 그대로 사용하되 유효한 slug로
      return match;
    })
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function htmlToMarkdown(html: string): string {
  let md = html;

  // <br> → 줄바꿈
  md = md.replace(/<br\s*\/?>/gi, "\n");

  // <p> → 줄바꿈
  md = md.replace(/<\/p>/gi, "\n\n");
  md = md.replace(/<p[^>]*>/gi, "");

  // 헤딩
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n");
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n");
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n");
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n");

  // 볼드/이탤릭
  md = md.replace(/<(strong|b)>(.*?)<\/(strong|b)>/gi, "**$2**");
  md = md.replace(/<(em|i)>(.*?)<\/(em|i)>/gi, "*$2*");

  // 링크
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // 이미지
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // 코드 블록
  md = md.replace(/<pre[^>]*><code[^>]*class="language-(\w+)"[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```$1\n$2\n```");
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```");
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "```\n$1\n```");

  // 인라인 코드
  md = md.replace(/<code>(.*?)<\/code>/gi, "`$1`");

  // 리스트
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<\/?[uo]l[^>]*>/gi, "\n");

  // blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    return content
      .trim()
      .split("\n")
      .map((line: string) => `> ${line.trim()}`)
      .join("\n");
  });

  // <hr>
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n");

  // 나머지 HTML 태그 제거
  md = md.replace(/<[^>]+>/g, "");

  // HTML 엔티티
  md = md.replace(/&amp;/g, "&");
  md = md.replace(/&lt;/g, "<");
  md = md.replace(/&gt;/g, ">");
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&nbsp;/g, " ");

  // 여러 줄바꿈 정리
  md = md.replace(/\n{3,}/g, "\n\n");

  return md.trim();
}

async function downloadImage(url: string, filename: string): Promise<string | null> {
  const outputPath = path.join(IMAGE_DIR, filename);

  if (fs.existsSync(outputPath)) {
    return `/images/posts/${filename}`;
  }

  return new Promise((resolve) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        if (res.headers.location) {
          downloadImage(res.headers.location, filename).then(resolve);
          return;
        }
      }

      if (res.statusCode !== 200) {
        console.warn(`  [경고] 이미지 다운로드 실패: ${url} (${res.statusCode})`);
        resolve(null);
        return;
      }

      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        fs.writeFileSync(outputPath, Buffer.concat(chunks));
        console.log(`  [이미지] ${filename}`);
        resolve(`/images/posts/${filename}`);
      });
      res.on("error", () => {
        console.warn(`  [경고] 이미지 다운로드 에러: ${url}`);
        resolve(null);
      });
    }).on("error", () => {
      console.warn(`  [경고] 이미지 접근 불가: ${url}`);
      resolve(null);
    });
  });
}

interface TistoryPost {
  title: string;
  content: string;
  category: string;
  date: string;
  tags: string[];
}

function parseTistoryBackup(filePath: string): TistoryPost[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const posts: TistoryPost[] = [];

  // 티스토리 백업 XML 파싱 (간단한 정규식 기반)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(content)) !== null) {
    const item = match[1];

    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ?? "";
    const body =
      item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1] ?? "";
    const category = item.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/)?.[1] ?? "";
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";
    const tagMatches = item.matchAll(/<tag><!\[CDATA\[(.*?)\]\]><\/tag>/g);
    const tags = Array.from(tagMatches, (m) => m[1]);

    if (title && body) {
      posts.push({
        title,
        content: body,
        category,
        date: pubDate ? new Date(pubDate).toISOString().split("T")[0] : "2026-01-01",
        tags,
      });
    }
  }

  return posts;
}

async function migratePost(post: TistoryPost, index: number): Promise<void> {
  const mappedCategory = CATEGORY_MAP[post.category] ?? "AI";
  const slug = slugify(post.title) || `post-${index}`;

  console.log(`[${index + 1}] ${post.title} → ${slug}`);

  // HTML → Markdown 변환
  let markdown = htmlToMarkdown(post.content);

  // 이미지 다운로드 및 경로 치환
  const imageRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
  let imgMatch;
  let imgIndex = 0;

  while ((imgMatch = imageRegex.exec(markdown)) !== null) {
    const [fullMatch, alt, url] = imgMatch;
    const ext = path.extname(new URL(url).pathname) || ".jpg";
    const filename = `${slug}-${imgIndex}${ext}`;
    const localPath = await downloadImage(url, filename);

    if (localPath) {
      markdown = markdown.replace(fullMatch, `![${alt}](${localPath})`);
    }
    imgIndex++;
  }

  // frontmatter 생성
  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.title.replace(/"/g, '\\"')}"
slug: ${slug}
category: ${mappedCategory}
tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]
author: "박스로고 입은 개발자"
publishedAt: "${post.date}"
featured: false
---`;

  const mdxContent = `${frontmatter}\n\n${markdown}\n`;

  const outputPath = path.join(OUTPUT_DIR, `${slug}.mdx`);
  fs.writeFileSync(outputPath, mdxContent, "utf-8");
}

async function main() {
  console.log("=== 티스토리 → MDX 마이그레이션 시작 ===\n");

  // 디렉토리 확인
  if (!fs.existsSync(BACKUP_DIR)) {
    console.error(`❌ 백업 디렉토리가 없습니다: ${BACKUP_DIR}`);
    console.log("\n다음 단계를 수행하세요:");
    console.log("1. 티스토리 관리 > 데이터 > 블로그 백업에서 XML 내보내기");
    console.log(`2. 내보낸 파일을 ${BACKUP_DIR}/ 디렉토리에 저장`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(IMAGE_DIR, { recursive: true });

  // 백업 파일 찾기
  const files = fs.readdirSync(BACKUP_DIR).filter((f) => f.endsWith(".xml"));

  if (files.length === 0) {
    console.error("❌ XML 백업 파일을 찾을 수 없습니다.");
    process.exit(1);
  }

  let totalPosts = 0;

  for (const file of files) {
    console.log(`\n파싱: ${file}`);
    const posts = parseTistoryBackup(path.join(BACKUP_DIR, file));
    console.log(`  ${posts.length}개 글 발견\n`);

    for (let i = 0; i < posts.length; i++) {
      await migratePost(posts[i], totalPosts + i);
    }

    totalPosts += posts.length;
  }

  console.log(`\n=== 마이그레이션 완료: ${totalPosts}개 글 변환 ===`);
  console.log(`\n출력 디렉토리: ${OUTPUT_DIR}`);
  console.log(`이미지 디렉토리: ${IMAGE_DIR}`);
  console.log("\n다음 단계:");
  console.log("1. 변환된 MDX 파일을 수동 검토");
  console.log("2. npm run build로 빌드 확인");
}

main().catch(console.error);
