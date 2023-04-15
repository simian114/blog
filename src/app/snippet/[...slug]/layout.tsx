import DetailLayout from "@/components/layout/detailLayout"
import { ReactNode } from "react"

export default async function BlogDetail({
  params,
  children,
}: {
  params: { slug: string[] }
  children: ReactNode
}) {
  const { slug } = params

  return <DetailLayout slug={slug}>{children}</DetailLayout>
}
