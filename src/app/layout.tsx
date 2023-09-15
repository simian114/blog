import { ReactNode } from "react"

export const revalidate = 60 // revalidate this page every 60 seconds

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
