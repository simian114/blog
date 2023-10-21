"use client"

import { motion, MotionProps } from "framer-motion"

type MotionWrapperProps<C extends React.ElementType> = {
  as: C
} & React.ComponentPropsWithoutRef<C> &
  MotionProps

export default function Motion<C extends React.ElementType>(
  props: MotionWrapperProps<C>
) {
  const { as, ...rest } = props
  const Component = motion[(as || "div") as HTMLElements]

  return <Component {...rest} />
}
