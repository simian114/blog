import { HOME_PATH } from "@/constants/path"
import { getInfoByCurrentPath } from "@/lib/server/post.server"
import { MdxContent } from "./mdx-content"

export default async function Home() {
  const { frontmatter, serialized } = await getInfoByCurrentPath(HOME_PATH)
  frontmatter
  return <main>{serialized && <MdxContent source={serialized} />}</main>
}
