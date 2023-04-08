import { ComponentPropsWithoutRef, ElementType } from "react"
import styles from "./styles.module.scss"

export type AnchorTextProps<C extends ElementType> = {
  as?: C
  children: string
} & ComponentPropsWithoutRef<C>

export default function AnchorText<C extends ElementType = "span">(
  props: AnchorTextProps<C>
) {
  const { as = "span", children, className, ...rest } = props
  const Component = as
  const cn = `${className} ${styles.anchor}`
  return (
    <Component {...rest} id={children as string} className={cn}>
      <a href={`#${children}`}>{children}</a>
    </Component>
  )
}
