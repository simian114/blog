import { Category, Component, Prisma, Route } from "@prisma/client"

import CategorySubURLSelector from "@/components/layout/index/default/common/CategorySubURLSelector"
import TagSubURLSelector from "@/components/layout/index/default/common/TagSubUrlSelector"

interface SubURLContainerProps {
  component: Component
  route: Route
  category?: Category
  subURL?: string
}

export default function SubURLContainer(props: SubURLContainerProps) {
  const { name, props: componentProps } = props.component
  const post = (componentProps as Prisma.JsonObject)?.post || "CARD"

  if (name === "CategorySelector") {
    return (
      <CategorySubURLSelector
        className="index-main__category-list"
        type={post as string}
        currentRoute={props.route}
        currentCategory={props.category}
      />
    )
  } else if (name === "TagSelector") {
    return (
      <TagSubURLSelector
        currentRoute={props.route}
        subURL={props.subURL || ""}
      />
    )
  }
  return <></>
}
