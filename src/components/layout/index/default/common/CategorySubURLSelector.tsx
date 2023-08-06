import { Category, Route, SubUrlPost } from "@prisma/client"

import CategorySelector from "./categorySelector/CategorySelector"
import PostList from "./postList/PostList"

interface PostListWrapper {
  className: string
  type: SubUrlPost
  currentCategory?: Category
  currentRoute: Route
}

/**
 * @todo route 에 있는 layout 에 따라 렌더링 다르게 만들기
 *
 */
export default async function CategorySubURLSelector(props: PostListWrapper) {
  return (
    <section className={`${props.className} post-list`}>
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
