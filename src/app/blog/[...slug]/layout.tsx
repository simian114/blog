import DetailDefaultLayout from "@/components/layout/detail/default/_default"
import { ReactNode } from "react"

export default async function BlogDetail({
  params,
  children,
}: {
  params: { slug: string[] }
  children: ReactNode
}) {
  const { slug } = params

  return <DetailDefaultLayout slug={slug}>{children}</DetailDefaultLayout>
}
