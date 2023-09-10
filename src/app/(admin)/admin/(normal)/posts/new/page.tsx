import { Category, Prisma, Route } from "@prisma/client"

import MdxEditorContainer from "./MdxEditorContainer"

export type CateogoryWithRoute = Category & { route: Route | null }
export type RouteWithCategories = Prisma.RouteGetPayload<{
  include: { categories: true; components: true }
}>

export default async function NewPostPage() {
  return (
    <div className="h-full">
      <MdxEditorContainer />
    </div>
  )
}
