# Developer Playground - Blog Contribution Guide

This guide describes how to add a new technical blog post to the Developer Playground.

## 1. Create a Post File
- Create a new file in `src/content/blog/software-engineer/` (e.g., `my-new-post.ts`).
- Follow the structure of existing posts.
- Use the `BlogPost` type from `types/blog`.

## 2. SEO Registration
- Add the post metadata to `src/data/seoData.ts` under the `blogPosts` key.

## 3. Build Configuration
- Add the new route to `reactSnap.include` in `package.json` for static site generation.

## 4. Search Engine & RSS Registration
- **sitemap.xml**: Add the new URL entry in `public/sitemap.xml`.
- **rss.xml**: Add a new `<item>` tag in `public/rss.xml` at the top of the list.

## Image Management
- Place images in `public/images/`.
- Use `.webp` format for better performance.
- Use the `image` field in your `BlogPost` object to reference the main thumbnail.

## Best Practices
- **Content**: Ensure technical accuracy and provide code samples where applicable.
- **SEO**: Use descriptive titles and keywords.
- **Zero-Copy/Performance**: When writing about high-performance topics, ensure you cover memory implications.
