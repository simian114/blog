"use client"
import { experimental_useFormStatus as useFormState } from "react-dom"

import Button from "@/components/button/Button"
import { useDevice } from "@/store/deviceWidthProvider"

export function SubmitButton() {
  const { isMobile } = useDevice()
  const { pending } = useFormState()

  return (
    <Button
      type="submit"
      design={{ size: "large" }}
      baseDesign={{ fluid: isMobile }}
      disabled={pending}
      style={{ justifyContent: "center" }}
    >
      {pending ? "로딩" : "전송"}
    </Button>
  )
}
