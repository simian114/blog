import Script from "next/script"
import { ReactNode } from "react"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script src="/scripts/postCardHandler.js" />
      {children}
    </>
  )
}
