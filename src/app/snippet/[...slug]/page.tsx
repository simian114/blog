import { MdxContent } from "@/app/mdx-content"
import { SNIPPET_PATH } from "@/constants/path"
import { findAllPostSlugs, getPostBySlugs } from "@/helpers/slug"

export async function generateStaticParams() {
  const slugs = await findAllPostSlugs(SNIPPET_PATH)
  return slugs.map(slug => ({ slug }))
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
