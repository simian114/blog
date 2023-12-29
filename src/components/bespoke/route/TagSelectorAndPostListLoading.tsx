import PostCardListLoading from "@/components/layout/index/default/common/postList/PostCardListLoading"
import Skeleton from "@/components/skeleton/Skeleton"

export default function TagSelectorAndPostListLoading() {
  return (
    <>
      <ul className="tag-selector-list">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <Skeleton
              className={"tag"}
              baseDesign={{
                shape: "primary",
                bg: { color: "GRAY" },
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Skeleton>
          </li>
        ))}
      </ul>
      <PostCardListLoading />
      {/* NOTE: post list loading */}
    </>
  )
}
