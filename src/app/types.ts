import { ReactNode } from "react"

export interface PageProps {
  params?: {
    slug?: string[] | string
  }
  searchParams?: string[] | string
}

export interface Route {
  id: string
  href: string
  children: ReactNode
  categories?: string[]
}
