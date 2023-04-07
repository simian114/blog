/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, PostFrontmatter } from "@/app/types"
import { lstat, readdir } from "fs/promises"
import { extname, join, parse, resolve } from "path"
import { readPost } from "./post.server"

export function isFile(path: string) {
  return !!extname(path)
}

export async function isDirectory(path: string) {
  try {
    return (await lstat(path)).isDirectory()
  } catch (e) {
    return false
  }
}

export function flatten(xs: Array<any>) {
  return xs.reduce((acc, x) => {
    acc = acc.concat(x)
    if (x.children) {
      acc = acc.concat(flatten(x.children))
      x.children = []
    }
    return acc
  }, [])
}

export interface FileTree extends Partial<Post<PostFrontmatter>> {
  base: string
  path: string
  children?: Array<FileTree>
}

export async function getFilesTree(dir: string): Promise<Array<FileTree>> {
  return await Promise.all(
    (
      await readdir(dir, { withFileTypes: true })
    )
      .filter(child => !child.name.startsWith(".")) // skip hidden
      .map(async child => {
        const base = parse(child.name).base
        const path = resolve(dir, child.name)
        return child.isDirectory()
          ? { base, path, children: await getFilesTree(join(dir, child.name)) }
          : { base, path }
      })
  )
}

export async function getAllPostsAsTree(dir: string): Promise<Array<FileTree>> {
  return await Promise.all(
    (
      await readdir(dir, { withFileTypes: true })
    )
      .filter(child => !child.name.startsWith(".")) // skip hidden
      .map(async child => {
        const base = parse(child.name).base
        const path = resolve(dir, child.name)

        if (child.isDirectory()) {
          return {
            base,
            path,
            children: await getFilesTree(join(dir, child.name)),
          }
        }
        if (base.endsWith(".mdx")) {
          const { frontmatter, serialized } = await readPost(path)
          return { base, path, frontmatter, serialized }
        }
        return { base, path }
      })
  )
}
