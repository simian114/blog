"use server"

import prisma from "@/lib/prisma"

export async function createGuestBook(data: FormData) {
  "use server"
  await prisma.guestbooks.create({
    data: {
      content: data.get("comment")?.toString() || "content should not be empty",
      nickname: data.get("nickname")?.toString() || "anonymous",
      ip: "",
    },
  })
}
