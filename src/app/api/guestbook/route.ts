import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const books = await prisma.guestbooks.findMany({
    orderBy: { createdAt: "desc" },
  })

  return new Response(JSON.stringify(books))
}
