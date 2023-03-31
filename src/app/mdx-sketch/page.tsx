import { MDX_SKETCH_PATH } from "@/constants/path"
import { getInfoByCurrentPath } from "@/lib/server/post.server"
import { MdxContent } from "../mdx-content"

export default async function MdxStyle() {
  const { serialized } = await getInfoByCurrentPath(MDX_SKETCH_PATH)
  return <main>{serialized && <MdxContent source={serialized} />}</main>
}
