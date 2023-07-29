import { Category, Prisma, Route } from "@prisma/client"

import prisma from "@/lib/prisma"

import MdxEditorContainer from "./MdxEditorContainer"

async function getData() {
  const tags = await prisma.tag.findMany({
    include: {
      posts: true,
    },
  })
  const routes = await prisma.route.findMany({ include: { categories: true } })
  return { tags, routes }
}

export type CateogoryWithRoute = Category & { route: Route | null }
export type RouteWithCategories = Prisma.RouteGetPayload<{
  include: { categories: true }
}>

export default async function NewPostPage() {
  const { tags, routes } = await getData()
  return (
    <div className="h-full">
      <MdxEditorContainer tags={tags} routes={routes} />
    </div>
  )
}
