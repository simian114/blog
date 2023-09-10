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
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
            <DocsSidebarNav items={adminConfig.sidebarNav} />
          </ScrollArea>
        </aside>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex border-solid rounded">
          <div className="flex items-center overflow-auto justify-between space-y-2 border">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
