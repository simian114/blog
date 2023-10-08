import HeaderClient from "./Header.client"

async function getData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/layout/header`
    )

    const routes = await res.json()
    return { routes }
  } catch (error) {
    return { routes: [] }
  }
}

export default async function Header() {
  const { routes } = await getData()
  return <HeaderClient routes={routes} />
}
