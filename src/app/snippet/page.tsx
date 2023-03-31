import { SNIPPET_PATH } from "@/constants/path"
import { getInfoByCurrentPath } from "@/lib/server/post.server"
import { MdxContent } from "../mdx-content"

export default async function Snippet() {
  const { serialized } = await getInfoByCurrentPath(SNIPPET_PATH)
  return <main>{serialized && <MdxContent source={serialized} />}</main>
}
