import DetailDefaultLayout from "@/components/layout/detail/default/DetailDefaultLayout"

interface MainDetailProps {
  slug: string[]
}

export default async function MainDetail(props: MainDetailProps) {
  // NOTE: 여기서 Component 고르고 넘어가는걸로 하면 어떨까?
  // const components = post.route.
  return <DetailDefaultLayout slug={props.slug} />
}
