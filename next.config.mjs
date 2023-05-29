/** @type {import('next').NextConfig} */

import { withContentlayer } from "next-contentlayer"
import createMDX from "@next/mdx"
import * as path from "path"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

const __dirname = path.resolve()

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@api": path.resolve(__dirname, "src/app/api"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@posts": path.resolve(__dirname, "src/posts"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@types": path.resolve(__dirname, "src/types"),
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withContentlayer(withMDX(nextConfig))
