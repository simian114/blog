"use client"

import { signOut } from "next-auth/react"

import Button from "../magicButton/Button"

export default function SignoutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>
}
