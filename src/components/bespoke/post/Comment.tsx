import { Suspense } from "react"

import CommentsClient from "@/components/comment/Comments"

/**
 *
 */
export default function Comment() {
  return (
    <Suspense>
      <CommentsClient />
    </Suspense>
  )
}
