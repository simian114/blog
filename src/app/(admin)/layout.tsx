/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react"

import { TailwindIndicator } from "@/components/admin/TailwindIndicator"
import AdminFooter from "@/components/layout/admin/Footer"
import AdminHeader from "@/components/layout/admin/Header"
import { AdminProviders } from "@/components/providers/AdminProviders"

import "@styles/globals.scss"
import "@styles/admin.scss"
import "highlight.js/styles/a11y-dark.css"

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased dark-theme dark">
        <div className="relative flex min-h-screen flex-col w-full">
          <AdminProviders>
            <AdminHeader />
            <div className="flex-1">{children}</div>
            <AdminFooter />
          </AdminProviders>
          <TailwindIndicator />
        </div>
      </body>
    </html>
  )
}
