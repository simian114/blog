import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  // const allCategories = await prisma.tags.findMany({})
  const tags = await prisma.tag.findMany()
  return new Response(JSON.stringify(tags))
}
