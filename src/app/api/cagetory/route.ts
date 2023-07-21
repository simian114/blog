// NOTE: List

import prisma from "@/lib/prisma"

export async function GET() {
  const allCategories = await prisma.category.findMany()
  return new Response(JSON.stringify(allCategories))
}
