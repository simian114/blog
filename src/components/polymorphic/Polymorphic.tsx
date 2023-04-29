import { ElementType } from "react"

type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export const Polymorphic = <C extends ElementType>(
  props: PolymorphicComponentProp<C>
) => {
  const { as, ...rest } = props
  const Component = as || "span"

  return <Component {...rest} />
}
