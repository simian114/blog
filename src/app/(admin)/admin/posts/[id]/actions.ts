"use server"

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
}
