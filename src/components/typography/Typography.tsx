import Link from "next/link"
import { ElementType, forwardRef, Ref } from "react"

import getRDSColorClassName from "@/helpers/rds/base/getRDSColorClassName"
import { getRDSTypographyClassName } from "@/helpers/rds/base/getRDSTypographyClassName"
import { RDSColorScale, RDSColorType } from "@/types/rds.t"

import { PolymorphicComponentProp } from "../polymorphic/Polymorphic"

export type TypographyVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "subtitle3"
  | "body1"
  | "body2"
  | "caption1"
  | "caption2"

export type TypographyWeight = "bold" | "medium" | "regular"

export interface Color {
  colorType: RDSColorType
  colorLevel: RDSColorScale
}

// NOTE: 수정되어야함
export interface RDSTypographyLegacyProps {
  weight?: TypographyWeight
  variants?: TypographyVariants
}

interface TypographyBasicProps
  extends RDSTypographyLegacyProps,
    Partial<Color> {}

type TypographyProps<C extends ElementType> = PolymorphicComponentProp<
  C,
  TypographyBasicProps
>

const Typography = <C extends ElementType>(
  {
    as,
    variants = "body1",
    colorLevel = 11,
    colorType = "GRAY",
    weight,
    className,
    ...rest
  }: TypographyProps<C>,
  ref: Ref<HTMLElement>
) => {
  const cn = `${getRDSTypographyClassName({
    variants,
    weight,
  })} ${
    colorType
      ? getRDSColorClassName({ color: colorType, scale: colorLevel })
      : ""
  } ${className ? className : ""}`

  // const { as, ...rest } = props
  const Component = as === "a" ? Link : as || "span"

  return <Component {...(rest as any)} className={cn} ref={ref} />
}

export default forwardRef(Typography) as typeof Typography
