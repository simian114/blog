/* eslint-disable @typescript-eslint/no-explicit-any */
import { lstat } from "fs/promises"
import { extname } from "path"

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
