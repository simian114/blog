import { getRDSTypographyClassName } from "@/helpers/rds/base/getRDSTypographyClassName"
import { ElementType, forwardRef, Ref } from "react"

import Polymorphic, {
  PolymorphicComponentProp,
} from "../polymorphic/Polymorphic"

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

export type ColorType =
  | "gray"
  | "primary"
  | "secondary"
  | "tertiary"
  | "red"
  | "pink"
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "brown"
  | "cyan"
  | "yellow"
  | "crimson"

export type ColorLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Color {
  colorType: ColorType
  colorLevel: ColorLevel
}

export interface RDSTypographyProps {
  weight?: TypographyWeight
  variants?: TypographyVariants
}

interface TypographyBasicProps extends RDSTypographyProps, Partial<Color> {}

type TypographyProps<C extends ElementType> = PolymorphicComponentProp<
  C,
  TypographyBasicProps
>

function getRDSColorClass(props: Color): string {
  return `rds-color-${props.colorType}-${props.colorLevel}`
}

const Typography = <C extends ElementType>(
  props: TypographyProps<C>,
  ref: Ref<HTMLElement>
) => {
  const {
    variants = "body1",
    colorLevel = 11,
    colorType = "gray",
    weight,
    className,
    ...rest
  } = props

  const cn = `${getRDSTypographyClassName({
    variants,
    weight,
  })} ${colorType ? getRDSColorClass({ colorType, colorLevel }) : ""} ${
    className ? className : ""
  }`

  return <Polymorphic {...rest} className={cn} ref={ref} />
}

export default forwardRef(Typography) as typeof Typography
