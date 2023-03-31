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
