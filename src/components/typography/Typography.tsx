import { ElementType } from "react"
import { Polymorphic, PolymorphicProps } from "../polymorphic/Polymorphic"

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

type TypographyProps<C extends ElementType> = {
  variants?: TypographyVariants
} & PolymorphicProps<C>

function getRDSClassName(variants: TypographyVariants) {
  return `rds-typography-${variants}`
}

const Typography = <C extends ElementType>(props: TypographyProps<C>) => {
  const { variants = "body1", className, ...rest } = props

  const cn = `${getRDSClassName(variants)} ${className}`

  return <Polymorphic {...rest} className={cn} />
}

export default Typography
