import { NextRequest } from "next/server"

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

// NOTE: url => /api/tag/id/post
// get tag post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: "string" } }
) {
  // params.

  // const allCategories = await prisma.tagsOnPosts.findMany({
  //   where: { tags: {} },
  //
  //   include: { route: true, posts: true },
  // })

  // return new Response(JSON.stringify(allCategories))
  return new Response(JSON.stringify([]))
}
