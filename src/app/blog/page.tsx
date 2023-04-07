import { BLOG_PATH } from "@/constants/path"
import { getPostBySlugs } from "@/helpers/slug"
import { FileTree, flatten, getFilesTree } from "@/lib/server/files.server"
import { getInfoByCurrentPath } from "@/lib/server/post.server"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MdxContent } from "../mdx-content"

async function getBlogData() {
  const blogTrees = await getFilesTree(BLOG_PATH)
  const index = blogTrees.find(tree => tree.base === "index.mdx")
  const topics = blogTrees.filter(tree => !!tree.children)
  const serieses = []
  const allBlogPosts = (flatten(blogTrees) as FileTree[]).filter(
    tree => tree && tree.base !== "index.mdx" && !tree.children
  )

  for await (const topic of topics) {
    const { frontmatter } = await getInfoByCurrentPath(topic.path)
    serieses.push({ ...frontmatter, href: `/blog/${topic.base}` })
  }

  return {
    index,
    topics,
    allBlogPosts,
    serieses,
  }
}

export default async function Blog() {
  const blogPosts = await getBlogData()
  if (!blogPosts || !blogPosts.index) {
    notFound()
  }
  const post = await getPostBySlugs("/blog")

  return (
    <main>
      <div>
        {blogPosts.serieses.map(series => (
          <Link key={series.title} href={series.href}>
            <h3>{series.title}</h3>
          </Link>
        ))}
      </div>
      <div></div>
      {post.serialized && <MdxContent source={post.serialized} />}
    </main>
  )
}
