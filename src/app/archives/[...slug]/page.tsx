import { ARCHIVES_PATH } from "@/constants/path"
import { findAllPostSlugs } from "@/helpers/slug"

export async function generateStaticParams() {
  const slugs = await findAllPostSlugs(ARCHIVES_PATH)
  return slugs.map(slug => ({ slug }))
}

export default async function ArchiveDetail({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  slug

  return <div>archives</div>
}
