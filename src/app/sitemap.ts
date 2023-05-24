import { MetadataRoute } from "next"

import { allPulishedPost } from "@/lib/server"

export default function sitemap(): MetadataRoute.Sitemap {
  return allPulishedPost.map(post => ({
    url: `${process.env.URL}${post.url.replace("index", "")}`,
    lastModified: post.publishedAt,
  }))
}
