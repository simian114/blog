import getLayoutComponentList from "@/helpers/layout/getLayoutComponentList"

export const dynamic = "force-dynamic"

export async function GET() {
  const files = await getLayoutComponentList()
  return new Response(JSON.stringify(files))
}
