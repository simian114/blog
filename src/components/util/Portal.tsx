"use client"
import { ReactNode } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: ReactNode
  selector?: string
}

export default function Portal(props: PortalProps) {
  if (typeof document === "undefined") {
    return
  }
  const target = props.selector
    ? document.querySelector(props.selector)
    : document.body

  return createPortal(props.children, target || document.body)
}
