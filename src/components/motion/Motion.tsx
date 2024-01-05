"use client"

import { motion, MotionProps } from "framer-motion"

type MotionWrapperProps<C extends React.ElementType> = {
  as: C
  preventAnimationInCSR?: boolean
} & React.ComponentPropsWithoutRef<C> &
  MotionProps

export default function Motion<C extends React.ElementType>(
  props: MotionWrapperProps<C>
) {
  const { as, initial, preventAnimationInCSR, ...rest } = props
  const Component = motion[(as || "div") as HTMLElements]

  return (
    <>
      <Component
        {...rest}
        initial={
          preventAnimationInCSR && typeof window === "undefined" ? initial : {}
        }
      />
    </>
  )
}
