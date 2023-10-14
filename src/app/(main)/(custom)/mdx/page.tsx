import fs from "fs/promises"
import path from "path"

import MDX from "@/components/mdx/MDX"

export default async function MdxStyle() {
  const post = (await fs.readFile(
    `${path.resolve()}/src/posts/mdx/index.mdx`
  )) as unknown as string

  return (
    <main>
      <MDX source={post || ""} />
    </main>
  )
}
