// NOTE: List

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const allCategories = await prisma.category.findMany({
    include: { route: true, posts: true },
  })
  return new Response(JSON.stringify(allCategories))
}
