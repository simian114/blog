import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/helpers/auth/auth"

export default async function ServerProtectedPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }
  return null
}
