"use server"

interface SignInProps {
  username: string
  password: string
}

export async function signin(data: SignInProps) {
  "use server"
  console.log("in actions")
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`
    // {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // }
  )
  console.log("------ res ---------")
  console.log(res)
  console.log("---------------")
}
