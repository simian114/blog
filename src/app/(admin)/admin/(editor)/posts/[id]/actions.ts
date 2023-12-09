"use server"

import { Prisma } from "@prisma/client"

export interface EditPostProps {
  id: number
  data: Prisma.PostUpdateInput
}

export async function editPost() {
  // const updated = await prisma.post.update({
  //   where: {
  //     id: props.id,
  //   },
  //   data: props.data,
  // })
}
