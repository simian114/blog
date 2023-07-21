import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return []
  // return allPublishedPost.map(post => ({
  //   url: `${process.env.URL}${post.url.replace("index", "")}`,
  //   lastModified: post.publishedAt,
  // }))
}
