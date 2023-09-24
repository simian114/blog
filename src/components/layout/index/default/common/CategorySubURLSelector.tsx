import { SubUrlPost } from "@prisma/client"

import { AllIncludeCategory, AllIncludeRoute } from "@/types/bespoke-components"

import CategorySelector from "./categorySelector/CategorySelector"
import PostList from "./postList/PostList"

interface PostListWrapper {
  className: string
  type: SubUrlPost | string
  currentCategory?: AllIncludeCategory
  currentRoute: AllIncludeRoute
}

/**
 * @todo route 에 있는 layout 에 따라 렌더링 다르게 만들기
 *
 */
export default async function CategorySubURLSelector(props: PostListWrapper) {
  // NOTE: data 를 여기서 가져와서 뿌려주는게 더 좋을듯. 여기서 모든걸 다 가져오자
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
        route={props.currentRoute}
        category={props.currentCategory}
      />
    </section>
  )
}
