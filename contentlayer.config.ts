import {
  defineDocumentType,
  defineNestedType,
  FieldDefs,
  makeSource,
} from "contentlayer/source-files"
import readingTime from "reading-time"

const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    content: { type: "json", required: true },
    colorType: { type: "json", required: true },
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
  },
}))

export default makeSource({
  contentDirPath: "src/posts",
  documentTypes: [Post],
  mdx: {},
})
