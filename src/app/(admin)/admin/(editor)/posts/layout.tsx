import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { ReactNode } from "react"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DocsSidebarNav } from "@/components/admin/SidebarNav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { adminConfig } from "@/config/admin"

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className=" border-b">
      <div className="flex-1">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex border-solid rounded">
          <div className="flex items-center overflow-auto justify-between space-y-2 border">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
