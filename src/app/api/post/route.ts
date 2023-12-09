import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  // const routeId = request.nextUrl.searchParams.get("routeId")
  // const categoryId = request.nextUrl.searchParams.get("categoryId")

  // NOTE: deletedAt 이 동작하지 않음. 왜?
  const posts = await prisma.post.findMany({
    where: { deletedAt: null },
    include: {
      route: true,
      category: true,
      tags: { include: { tag: true } },
    },
  })
  return new Response(JSON.stringify(posts))
}
