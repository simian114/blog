import { MetadataRoute } from "next"

import { allPublishedPost } from "@/constants/post"

export default function sitemap(): MetadataRoute.Sitemap {
  return allPublishedPost.map(post => ({
    url: `${process.env.URL}${post.url.replace("index", "")}`,
    lastModified: post.publishedAt,
  }))
}
