import { NextRequest } from "next/server"

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const routeId = request.nextUrl.searchParams.get("routeId")
  const categoryId = request.nextUrl.searchParams.get("categoryId")

  const posts = await prisma.post.findMany({
    where:
      typeof categoryId === "string"
        ? { category: { id: Number(categoryId) } }
        : typeof routeId === "string"
        ? { routeId: Number(routeId) }
        : undefined,

    include: {
      route: true,
      category: true,
      tags: { include: { tag: true } },
    },
  })
  return new Response(JSON.stringify(posts))
}
