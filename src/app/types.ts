import { ReactNode } from "react"
import { Post } from "contentlayer/generated"

export interface Route {
  id: string
  href: string
  children: ReactNode
  categories?: string[]
}

export interface CateogoryPost {
  category: string
  posts: Post[]
}
