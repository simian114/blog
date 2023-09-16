import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const routes = await prisma.route.findMany({
    include: {
      categories: true,
      components: true,
      posts: true,
    },
    orderBy: { priority: "asc" },
    where: { deletedAt: null, open: true, NOT: { url: "" } },
  })
  return new Response(JSON.stringify(routes))
}
