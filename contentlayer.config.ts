import {
  defineDocumentType,
  FieldDefs,
  makeSource,
} from "contentlayer/source-files"

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
    description: "the date ",
    required: false,
  },
  tags: {
    type: "list",
    of: { type: "string" },
    required: false,
  },
  isPublished: {
    type: "boolean",
    default: false,
    required: false,
  },
  thumbnaiil: {
    type: "image",
    required: false,
  },
}
export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields,
  computedFields: {
    // url: {
    //   type: "string",
    //   resolve: post => `/blog/${post._raw.flattenedPath}`,
    //   // resolve: post => `/blog/${post._raw.flattenedPath}`,
    // },
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
