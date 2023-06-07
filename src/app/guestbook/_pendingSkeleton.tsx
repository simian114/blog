"use client"
import { experimental_useFormStatus as useFormState } from "react-dom"

import Skeleton from "@/components/skeleton/Skeleton"

export default function PendingSkeleton() {
  const { pending } = useFormState()

  if (!pending) {
    return <></>
  }

  return (
    <div style={{ marginTop: "16px" }}>
      <Skeleton design={{ type: "text", variant: "body1" }} />
    </div>
  )
}
