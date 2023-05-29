"use server"
import { revalidateTag } from "next/cache"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createGuestBook(data: FormData) {
  "use server"

  await prisma.guestbooks.create({
    data: {
      content: data.get("comment")?.toString() || "content should not be empty",
      nickname: data.get("nickname")?.toString() || "anonymous",
      ip: "",
    },
  })
  revalidateTag("guestbook")
}
