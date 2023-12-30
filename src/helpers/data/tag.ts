import { Prisma } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function fetchTagList<T extends Prisma.TagFindManyArgs>(
  params?: T
): Promise<Array<Prisma.TagGetPayload<T>>> {
  try {
    const tags = await prisma.tag.findMany(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tags as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return []
  }
}
