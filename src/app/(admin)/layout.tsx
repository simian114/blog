/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react"

import { TailwindIndicator } from "@/components/admin/tailwind-indicator"
import AdminFooter from "@/components/layout/admin/footer"
import AdminHeader from "@/components/layout/admin/header"

import "@styles/admin.scss"
import "highlight.js/styles/a11y-dark.css"

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased dark">
        <div className="relative flex min-h-screen flex-col w-full">
          <AdminHeader />
          <div className="flex-1">{children}</div>
          <AdminFooter />
          <TailwindIndicator />
        </div>
      </body>
    </html>
  )
}
