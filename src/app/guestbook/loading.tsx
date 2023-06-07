import Skeleton from "@/components/skeleton/Skeleton"
import Typography from "@/components/typography/Typography"

import CommentInputs from "./_commentInputs"

export default function Loading() {
  return (
    <>
      <Typography variants="h1" as="h1" colorLevel={12}>
        방명록
      </Typography>
      <div className="guestbook-page__form-container ">
        <form className="guestbook-page__form guest-form">
          <CommentInputs />
        </form>
      </div>
      <SkeletonContainer />
    </>
  )
}

function SkeletonContainer() {
  return (
    <div className="guestbook-page__skeleton-container">
      <Skeleton
        design={{
          type: "text",
          variant: "body1",
        }}
      />
      <Skeleton
        design={{
          type: "text",
          variant: "body1",
        }}
      />
      <Skeleton
        design={{
          type: "text",
          variant: "body1",
        }}
      />
      <Skeleton
        design={{
          type: "text",
          variant: "body1",
        }}
      />
      <Skeleton
        design={{
          type: "text",
          variant: "body1",
        }}
      />
      <Skeleton
        design={{
          type: "text",
          variant: "body1",
        }}
      />
      <Skeleton
        design={{
          type: "text",
          variant: "body1",
        }}
      />
    </div>
  )
}
