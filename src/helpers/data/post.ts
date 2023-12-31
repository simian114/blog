import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

export async function fetchPostList<T extends Prisma.PostFindManyArgs>(
  params?: T
): Promise<Array<Prisma.PostGetPayload<T>>> {
  try {
    const posts = await prisma.post.findMany(params)
    // NOTE: any 사용하지 않고 위 타입쓰면 빌드는 되는데 렉 엄청심해짐
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return []
  }
}

export async function fetchPostBy<T extends Prisma.PostFindFirstOrThrowArgs>(
  params: T
): Promise<Prisma.PostGetPayload<T> | null> {
  try {
    const post = await prisma.post.findFirstOrThrow(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return post as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return null
  }
}

// NOTE: 아래처럼 하면 에러 메모리 폭발해서 에러 발생. 왜 에러가 발생할까? 노드에서 이렇게 메모리 뻑이 나는건 순환참조밖에 없을듯..
// export async function fetchPostList<T extends Prisma.PostFindManyArgs>(
//   params?: T
// ) {
//   noStore()
//   try {
//     const posts = await prisma.post.findMany(params)
//     return posts as Array<Prisma.PostGetPayload<T>>
//   } catch (error) {
//     // TODO: logging 시스템 구축
//     return []
//   }
// }
// export async function fetchPostByURL(url: string) {
//   url
//   noStore()
// }
// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
// export async function updatePost(params: Prisma.PostUpdateArgs) {
//   const updatedPost = await prisma.post.update(params)
//   // NOTE: 리스트 쪽 재생성
//   // NOTE: 본인 또한 재생성해야함
//   revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
//   // NOTE: route: route url
//   // NOTE: subURL: category url
//   // NOTE: post: post url
//   revalidatePath(`/(main)/(bespoke-detail)/[route]/[subURL]/[post]`)
//   return updatedPost
// }
