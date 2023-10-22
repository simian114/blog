import { NextRequest } from "next/server"

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(
  _: NextRequest,
  { params }: { params: { url: string } }
) {
  const post = await prisma.post.findFirst({
    where: {
      url: params.url,
      deletedAt: null,
    },
    include: {
      route: {
        include: {
          components: true,
        },
      },
      category: true,
      tags: { include: { tag: true } },
    },
  })
  return new Response(JSON.stringify(post))
}
