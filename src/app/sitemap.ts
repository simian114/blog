import { MetadataRoute } from "next"
import { allPulishedPost } from "@/lib/server"

export default function sitemap(): MetadataRoute.Sitemap {
  return allPulishedPost.map(post => ({
    url: `${process.env.URL}/${post._id.replace("index", "")}`.replace(
      ".mdx",
      ""
    ),
    lastModified: post.publishedAt,
  }))
}
