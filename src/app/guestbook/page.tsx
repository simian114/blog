import { Suspense } from "react"

import Skeleton from "@/components/skeleton/Skeleton"
import Typography from "@/components/typography/Typography"

import CommentList from "./commentList"
import Form from "./form"

async function GuestBook() {
  return (
    <>
      <Typography variants="h1" as="h1" colorLevel={12}>
        방명록
      </Typography>
      <div className="guestbook-page__form-container ">
        <Form />
      </div>
      <Suspense fallback={<SkeletonContainer />}>
        {/* @ts-expect-error Async Server Component */}
        <CommentList />
      </Suspense>
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
    </div>
  )
}

export default GuestBook
