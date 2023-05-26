import { allPosts, Post } from "contentlayer/generated"

/**
 * sort & show only published
 */
export const allPublishedPost = allPosts
  .filter(post => post.isPublished)
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

export function getAllPostsBySlug(slug: string) {
  return allPublishedPost.filter(
    post =>
      post._raw.sourceFilePath.includes(slug) &&
      !post._raw.sourceFilePath.includes("/index.mdx")
  )
}

export const allBlogPosts = allPublishedPost.filter(
  post =>
    post._raw.sourceFilePath.includes("blog") &&
    !post._raw.sourceFilePath.includes("/index.mdx")
)

export const allSnippetPosts = allPublishedPost.filter(
  post =>
    post._raw.sourceFilePath.includes("snippet") &&
    !post._raw.sourceFilePath.includes("/index.mdx")
)

export const allDesignSystemPosts = allPublishedPost.filter(
  post =>
    post._raw.sourceFilePath.includes("design-system") &&
    !post._raw.sourceFilePath.includes("/index.mdx")
)

export const allRoutes = Array.from(
  new Set(
    allPublishedPost
      .filter(post => !post._raw.sourceFilePath.includes("index.mdx"))
      .map(post => post._id.split("/")?.[0])
  )
)

export type TreeNode = {
  title: string
  date: string
  urlPath: string
  children: TreeNode[]
}

export const getCategoriesByRoute = (route: string) => {
  return Array.from(
    new Set(
      allPublishedPost
        .filter(
          post =>
            post._raw.sourceFileDir.startsWith(`${route}/`) &&
            !post._raw.sourceFilePath.includes("/index.mdx") &&
            post._raw.sourceFileDir.split("/").length === 2
        )
        .map(post => post._raw.sourceFileDir.split("/")[1])
    )
  )
}

export const blogCategories = Array.from(
  new Set(
    allPublishedPost
      .filter(
        post =>
          post._raw.sourceFileDir.startsWith("blog/") &&
          !post._raw.sourceFilePath.includes("/index.mdx") &&
          post._raw.sourceFileDir.split("/").length === 2
      )
      .map(post => post._raw.sourceFileDir.split("/")[1])
  )
)

export const snippetCategories = Array.from(
  new Set(
    allPublishedPost
      .filter(
        post =>
          post._raw.sourceFileDir.startsWith("snippet/") &&
          !post._raw.sourceFilePath.includes("/index.mdx") &&
          post._raw.sourceFileDir.split("/").length === 2
      )
      .map(post => post._raw.sourceFileDir.split("/")[1])
  )
)

export const designSystemCategories = Array.from(
  new Set(
    allPublishedPost
      .filter(
        post =>
          post._raw.sourceFileDir.startsWith("design-system/") &&
          !post._raw.sourceFilePath.includes("/index.mdx") &&
          post._raw.sourceFileDir.split("/").length === 2
      )
      .map(post => post._raw.sourceFileDir.split("/")[1])
  )
)

function getAllBlogPostsByCategory(category: string) {
  return allBlogPosts.filter(post =>
    post._raw.sourceFileDir.startsWith(`blog/${category}`)
  )
}

function getAllSnippetPostsByCategory(category: string) {
  return allSnippetPosts.filter(post =>
    post._raw.sourceFileDir.startsWith(`snippet/${category}`)
  )
}

function getAllDesignSystemPostsByCategory(category: string) {
  return allSnippetPosts.filter(post =>
    post._raw.sourceFileDir.startsWith(`snippet/${category}`)
  )
}

export interface CateogoryPost {
  category: string
  posts: Post[]
}

export const blogPostsByCategory = blogCategories.reduce((prev, cur) => {
  return [...prev, { category: cur, posts: getAllBlogPostsByCategory(cur) }]
}, [] as CateogoryPost[])

export const snippetPostsByCategory = snippetCategories.reduce((prev, cur) => {
  return [...prev, { category: cur, posts: getAllSnippetPostsByCategory(cur) }]
}, [] as CateogoryPost[])

export const designSystemPostsByCategory = designSystemCategories.reduce(
  (prev, cur) => {
    return [
      ...prev,
      { category: cur, posts: getAllDesignSystemPostsByCategory(cur) },
    ]
  },
  [] as CateogoryPost[]
)
