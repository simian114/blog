"use server"

import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

export interface EditPostProps {
  id: number
  data: Prisma.PostUpdateInput
}

export async function editPost(props: EditPostProps) {
  const updated = await prisma.post.update({
    where: {
      id: props.id,
    },
    data: props.data,
  })
  const info = await prisma.postInfo.findUnique({
    where: { postId: updated.id },
  })
  console.log("------------ updated -----------")
  console.log(updated)
  console.log("--------------------------------")

  if (!info) return

  revalidatePath(info.url)
}
