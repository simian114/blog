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
  const target =
    typeof children === "string" ? children.replaceAll(" ", "-") : ""
  return (
    <Component {...rest} id={target} className={cn}>
      <a href={`#${target}`}>{children}</a>
    </Component>
  )
}
