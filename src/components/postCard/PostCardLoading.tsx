"use client"

import Skeleton from "@/components/skeleton/Skeleton"

export default function PostCardLoading() {
  return (
    <Skeleton className="post-card" design={{ type: "primary" }}>
      <div style={{ height: "30px" }}></div>
    </Skeleton>
  )
}
