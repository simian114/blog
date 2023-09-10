import { ReactNode } from "react"

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
  return <div className="flex">{children}</div>
}
