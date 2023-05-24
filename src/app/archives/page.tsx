import { getPostBySlugs } from "@/helpers/slug"

import { MdxContent } from "../mdx-content"

export default async function archives() {
  const post = await getPostBySlugs("/archives")

  return <main>{<MdxContent post={post} />}</main>
}
