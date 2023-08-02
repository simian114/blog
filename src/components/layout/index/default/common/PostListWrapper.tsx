import { Category, Route, RouteLayoutType } from "@prisma/client"

import AnchorText from "@/components/mdx/AnchorText"
import { getRDSTypographyClassName } from "@/helpers/rds/base/getRDSTypographyClassName"

import CategorySelector from "./categorySelector/CategorySelector"
import PostList from "./postList/PostList"

interface PostListWrapper {
  className: string
  type: RouteLayoutType
  currentCategory?: Category
  currentRoute: Route
}

/**
 * @todo route 에 있는 layout 에 따라 렌더링 다르게 만들기
 *
 */
export default async function PostListWrapper(props: PostListWrapper) {
  return (
    <section className={`${props.className} post-list`}>
      <AnchorText
        className={getRDSTypographyClassName({
          weight: "bold",
          variants: "h2",
        })}
        as="h2"
      >
        {props.currentRoute.title}
      </AnchorText>
      {/* NOTE: layout - category */}
      <CategorySelector
        currentRoute={props.currentRoute}
        currentCategory={props.currentCategory}
      />
      {/* NOTE: layout - PostList */}
      <PostList
        type={props.type}
        description={props.currentCategory?.description || ""}
        categoryId={props.currentCategory?.id}
        routeId={props.currentRoute.id}
      />
      {/* NOTE: layout -  */}
    </section>
  )
}
