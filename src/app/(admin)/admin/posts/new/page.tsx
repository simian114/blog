import { Category, Route } from "@prisma/client"

import prisma from "@/lib/prisma"

import MdxEditorContainer from "./MdxEditorContainer"

async function getData() {
  const categories = await prisma.category.findMany({
    include: {
      route: true,
    },
  })
  const tags = await prisma.tag.findMany({
    include: {
      posts: true,
    },
  })
  return { categories, tags }
}

export type CateogoryWithRoute = Category & { route: Route | null }

export default async function NewPostPage() {
  const { categories, tags } = await getData()
  return (
    <div className="h-full">
      <MdxEditorContainer categories={categories} tags={tags} />
    </div>
  )
}
