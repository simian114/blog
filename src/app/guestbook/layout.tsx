import { ReactNode } from "react"

async function GuestBookLayout({ children }: { children: ReactNode }) {
  return <main className="guestbook-page">{children}</main>
}

export default GuestBookLayout
