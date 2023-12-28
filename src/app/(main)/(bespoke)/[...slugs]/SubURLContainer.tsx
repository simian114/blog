import { Component, Prisma } from "@prisma/client"

import CategorySubURLSelector from "@/components/layout/index/default/common/CategorySubURLSelector"
import { AllIncludeCategory, AllIncludeRoute } from "@/types/bespoke-components"

interface SubURLContainerProps {
  component: Component
  route: AllIncludeRoute
  category?: AllIncludeCategory
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
  }
  return null
}
