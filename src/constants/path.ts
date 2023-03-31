import { cwd } from "process"

const POST_PATH_PREFIX = cwd() + "/src/posts"

const HOME_PATH = POST_PATH_PREFIX + ""
const BLOG_PATH = POST_PATH_PREFIX + "/blog"
const SNIPPET_PATH = POST_PATH_PREFIX + "/snippet"
const ARCHIVES_PATH = POST_PATH_PREFIX + "/archives"
const MDX_SKETCH_PATH = POST_PATH_PREFIX + "/mdx-sketch"

export {
  POST_PATH_PREFIX,
  HOME_PATH,
  BLOG_PATH,
  SNIPPET_PATH,
  ARCHIVES_PATH,
  MDX_SKETCH_PATH,
}
