import { Category, Prisma, Route } from "@prisma/client"

export interface RouteWithCategories<T extends keyof Category> extends Route {
  categories: Pick<Category, T>[]
}

// export interface PostWithTags<T extends keyof TagsOnPosts> extends Post {
//   tags?: (Pick<TagsOnPosts, T> | null)[]
// }

export type PostWithTags = Prisma.PostGetPayload<{
  include: {
    tags: true
  }
}>

// NOTE: example
// const a: Route = {
//   id: 0,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   title: "hello",
//   description: "world",
//   open: true,
// }

// const b: RouteWithCategories<"id" | "title"> = {
//   id: 0,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   title: "hello",
//   description: "world",
//   open: true,
//   categories: [
//     {
//       id: 0,
//       title: "hello",
//     },
//   ],
// }
