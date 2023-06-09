import { MdxContent } from "@/app/mdx-content"
import { allSnippetPosts } from "@/constants/post"
import { getPostBySlugs } from "@/helpers/slug"

export const dynamicParams = false

export async function generateStaticParams() {
  const snippetPosts = allSnippetPosts
  return snippetPosts.map(post => ({
    slug: post.slug.replace("/snippet", "").slice(1).split("/"),
  }))
}

export default async function ArchiveDetail({
  params,
}: {
  params: { slug: string[] }
}) {
  const { slug } = params
  const post = await getPostBySlugs("/snippet", slug)

  return (
    <main>
      <MdxContent post={post} />
    </main>
  )
}
