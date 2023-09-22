import { NextRequest } from "next/server"

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: "string" } }
) {
  request
  const allCategories = await prisma.category.findMany({
    where: { routeId: Number(params.id) },
    include: { route: true, posts: true },
  })

  return new Response(JSON.stringify(allCategories))
}
