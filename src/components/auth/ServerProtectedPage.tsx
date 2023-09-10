import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function ServerProtectedPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }
  return null
}
