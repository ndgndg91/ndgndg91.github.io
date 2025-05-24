#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 사이트 기본 정보
const SITE_URL = 'https://developer-playground.com';
const currentDate = new Date().toISOString().split('T')[0];

// 페이지 정보
const pages = [
  {
    url: '/',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '1.0'
  },
  // 블로그 페이지들
  {
    url: '/blog/software-engineer/list.html',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/blog/other/list.html',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  },
  // 개별 블로그 포스트들
  {
    url: '/blog/software-engineer/list/about-g1gc.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/blog/software-engineer/list/about-zgc.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/blog/software-engineer/list/about-kafka.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/blog/software-engineer/list/about-mongodb-sharding.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/blog/software-engineer/list/replay-attack.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  // 도구 페이지들
  {
    url: '/tools/encode-decode/base64.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/encode-decode/url.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/string/parser.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/string/xml-parser.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/string/uuid-generator.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/string/random-hex.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/string/string-diff-checker.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/string/byte-counter.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/string/html-escape-unescape.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/tools/time/timestamp.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/tools/image/format-converter.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/tools/token/jwt.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/tools/hash/sha1.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/tools/hash/sha2.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/tools/hash/sha3.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/tools/encrypt-decrypt/aes.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/tools/encrypt-decrypt/rsa.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  }
];

// XML 사이트맵 생성
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach(page => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// 사이트맵 파일 저장
function saveSitemap() {
  const sitemap = generateSitemap();
  const outputPath = join(__dirname, '../dist/sitemap.xml');
  
  try {
    writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`✅ 사이트맵이 생성되었습니다: ${outputPath}`);
    console.log(`📊 총 ${pages.length}개 페이지가 포함되었습니다.`);
  } catch (error) {
    console.error('❌ 사이트맵 생성 실패:', error);
    process.exit(1);
  }
}

// 스크립트 실행
saveSitemap();
