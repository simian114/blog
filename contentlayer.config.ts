import {
  defineDocumentType,
  defineNestedType,
  FieldDefs,
  makeSource,
} from "contentlayer/source-files"
import langJavascript from "highlight.js/lib/languages/javascript"
import readingTime from "reading-time"
import rehypeHighlight from "rehype-highlight"

import langCSS from "highlight.js/lib/languages/css"

const languages = {
  javascript: langJavascript,
  css: langCSS,
}

const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    content: { type: "json", required: true },
    colorType: { type: "json", required: true },
  },
}))

const Heading = defineNestedType(() => ({
  name: "Heading",
  fields: {
    title: { type: "string", required: true },
    children: { type: "list", of: { type: "string" }, required: false },
  },
}))

const fields: FieldDefs = {
  title: {
    type: "string",
    description: "The title of the post",
    required: true,
  },
  description: {
    type: "string",
    description: "The description of the post",
    required: false,
  },
  date: {
    type: "date",
    description: "created at",
    required: true,
  },
  publishedAt: {
    type: "date",
    description: "publshed dated",
    required: true,
  },
  tags: {
    type: "list",
    of: Tag,
    required: false,
  },
  isPublished: {
    type: "boolean",
    description: "if false, content is not visible",
    default: false,
    required: false,
  },
  thumbnail: {
    type: "string",
    required: false,
  },
  headings: {
    type: "list",
    of: Heading,
    required: false,
  },
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields,
  computedFields: {
    url: {
      type: "string",
      resolve: post => `/${post._raw.flattenedPath}`,
    },
    readingTime: {
      type: "string",
      resolve: post => Math.ceil(readingTime(post.body.raw).minutes),
    },
    slug: {
      type: "string",
      resolve: post => `/${post._raw.flattenedPath}`,
    },
    category: {
      type: "string",
      resolve: post => {
        if (post._raw.sourceFilePath.includes("index.mdx")) {
          return ""
        }
        if (post._raw.sourceFileDir.split("/").length !== 2) {
          return ""
        }
        return post._raw.sourceFileDir.split("/")[1]
      },
    },
    headings: {
      type: "list",
      of: Heading,
      resolve: async doc => {
        // NOTE: h2, h3 만 heading 으로 가져옴
        // NOTE: flag 와 content 는 아래에서 변수로 사용가능해짐
        const headingRegex = /\n(?<header>#{2,3})\s+(?<title>.+)/g
        const headings = Array.from(doc.body.raw.matchAll(headingRegex)).map(
          ({ groups }) => {
            const header = groups?.header
            const title = groups?.title
            return {
              level: header?.length || -1,
              title,
            }
          }
        )
        return headings.reduce((prev, cur) => {
          if (cur.level === 2) {
            prev.push({ title: cur.title || "", children: [] })
            return prev
          } else {
            const lastIdx = prev.length - 1
            if (lastIdx === -1) {
              prev.push({ title: "", children: [] })
              prev[0].children?.push(cur.title || "")
              return prev
            }
            prev[lastIdx].children?.push(cur.title || "")
            return prev
          }
        }, [] as Array<{ title: string; children?: Array<string> }>)
      },
    },
  },
}))

export default makeSource({
  contentDirPath: "src/posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [() => rehypeHighlight({ languages, ignoreMissing: true })],
  },
})
