import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { Suspense } from "react"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

import DetailDefaultLayout from "@/components/layout/detail/default/_default"
import PostList from "@/components/layout/index/default/common/PostList"
import { MdxComponents } from "@/components/mdx/mdxComponents"
import prisma from "@/lib/prisma"

//
//  include: {
//    route: true
//    posts: {
//      include: {
//        category: true
//        info: true
//        tags: {
//          include: {
//            tag: true
//          }
//        }
//      }
//    }
//  }
async function getData(slug: string[]) {
  const routes = await prisma.route.findMany({
    where: { open: true },
    include: {
      categories: {
        include: {
          route: true,
          posts: {
            include: {
              category: true,
              info: true,
              tags: { include: { tag: true } },
            },
          },
        },
      },
    },
  })
  const post =
    slug.length === 3
      ? await prisma.post.findFirst({
          where: { info: { url: `/${slug.join("/")}` } },
        })
      : null
  return { routes, post }
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { info: true },
  })
  return posts.map(post => ({ slug: post.info?.slug || [] }))
}

export default async function BasePage({
  params,
}: {
  params: { slug: string[] }
}) {
  const { routes, post } = await getData(params.slug)

  if (params.slug.length === 1 || params.slug.length === 2) {
    const route = routes.find(route => route.title === params.slug[0])
    const category = params.slug?.[1] || ""
    const categoryWithPosts = route?.categories.find(
      category => category.title === params.slug?.[1] || ""
    )
    if (!route) {
      return notFound()
    }
    return (
      <main className="index-main">
        <Suspense fallback={<></>}>
          <PostList
            className="index-main__category-list"
            categories={route.categories}
            // TODO: Route layout type
            type={route.layoutType}
            currentCategory={category}
            categoryWithPosts={categoryWithPosts as any}
          />
        </Suspense>
      </main>
    )
  } else if (params.slug.length === 3) {
    if (!post) {
      return notFound()
    }
    const { content } = await compileMDX({
      source: post.content || "",
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
          format: "mdx",
        },
      },
      components: MdxComponents,
    })
    //
    return (
      <DetailDefaultLayout post={post as any}>{content}</DetailDefaultLayout>
    )
  } else {
    return notFound()
  }
}