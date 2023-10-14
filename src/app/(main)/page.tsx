import fs from "fs/promises"
import path from "path"

import MDX from "@/components/mdx/MDX"

export default async function Home() {
  const post = (await fs.readFile(
    `${path.resolve()}/src/posts/index.mdx`
  )) as unknown as string

  return (
    <main>
      <MDX source={(post as unknown as string) || ""} />
    </main>
  )
}
