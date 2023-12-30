"use server"

interface SignInProps {
  username: string
  password: string
}

export async function signin(data: SignInProps) {
  "use server"
  data

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`)
  // TODO: log 시스템 설계 후 적용할것
  res
}
