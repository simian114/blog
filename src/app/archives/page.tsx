import { ARCHIVES_PATH } from "@/constants/path"
import { getInfoByCurrentPath } from "@/lib/server/post.server"
import { MdxContent } from "../mdx-content"

export default async function archives() {
  const { serialized } = await getInfoByCurrentPath(ARCHIVES_PATH)
  return <main>{serialized && <MdxContent source={serialized} />}</main>
}
