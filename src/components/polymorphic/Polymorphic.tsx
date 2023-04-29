import { ComponentPropsWithoutRef, ElementType } from "react"

export type PolymorphicProps<C extends ElementType> = {
  as?: C
} & ComponentPropsWithoutRef<C>

export const Polymorphic = <C extends ElementType>(
  props: PolymorphicProps<C>
) => {
  const { as, ...rest } = props
  const Component = as || "span"

  return <Component {...rest} />
}
