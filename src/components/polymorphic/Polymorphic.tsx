import { ElementType, forwardRef, Ref } from "react"

type AsProp<C extends React.ElementType> = {
  as?: C
  ref?: Ref<HTMLElement>
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

const Polymorphic = <C extends ElementType>(
  props: PolymorphicComponentProp<C>,
  ref?: Ref<HTMLElement>
) => {
  const { as, ...rest } = props
  const Component = as || "span"

  return <Component {...rest} ref={ref} />
}

Polymorphic.displayName = "Polymorphic"

export default forwardRef(Polymorphic) as typeof Polymorphic
// export default forwardRef<zz>(Polymorphic) as typeof Polymorphic
