import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const routes = await prisma.route.findMany({
    include: { categories: true, posts: true, layouts: true },
  })
  return new Response(JSON.stringify(routes))
}
