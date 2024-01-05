import { Component, Prisma, SubUrlPost } from "@prisma/client"

import CategoryBookSelector from "@/components/layout/index/default/common/categoryBookSelector/CategoryBookSelector"
import CategorySelector from "@/components/layout/index/default/common/categorySelector/CategorySelector"
import PostList from "@/components/layout/index/default/common/postList/PostList"
import { AllIncludeCategory, AllIncludeRoute } from "@/types/bespoke-components"

interface SubURLContainerProps {
  component: Component
  route: AllIncludeRoute
  category?: AllIncludeCategory
  subURL?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryComponentMapper: Record<string, (props: any) => JSX.Element> = {
  CategorySelector: CategorySelector,
  CategoryBookSelector: CategoryBookSelector,
}

export default function SubURLContainer(props: SubURLContainerProps) {
  const { name, props: componentProps } = props.component
  const post = (componentProps as Prisma.JsonObject)?.post || "CARD"

  const CategoryComponent = CategoryComponentMapper[name]

  if (!CategoryComponent) {
    return null
  }

  return (
    <section className={`index-main__category-list`}>
      <CategoryComponent route={props.route} category={props.category} />
      <PostList
        type={post as SubUrlPost}
        route={props.route}
        category={props.category}
      />
    </section>
  )
}
