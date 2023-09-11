import DetailDefaultLayout from "@/components/layout/detail/default/DetailDefaultLayout"
import prisma from "@/lib/prisma"

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { route: true, category: true, tags: { include: { tag: true } } },
  })
  return posts
    .filter(post => post.route?.url && post.category?.url && post.url)
    .map(post => ({
      route: post.route?.url || "",
      subURL: post.category?.url || "",
      post: post.url,
    }))
}

export default function DetailPage({
  params,
}: {
  params: { route: string; subURL: string; post: string }
}) {
  const detailDefaultLayoutParams = {
    route: params.route,
    post: params.post,
    category: params.subURL,
  }
  return <DetailDefaultLayout {...detailDefaultLayoutParams} />
}
