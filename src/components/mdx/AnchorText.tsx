import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import styles from "./styles.module.scss"

export type AnchorTextProps<C extends ElementType> = {
  as?: C
  children: ReactNode
  href: string
} & ComponentPropsWithoutRef<C>

// anchor text
/**
 *
 * @param prop
 * @returns
 */

export default function AnchorText<C extends ElementType = "span">(
  props: AnchorTextProps<C>
) {
  const { as = "span", children, href, className, ...rest } = props
  const Component = as
  const cn = `${className} ${styles.anchor}`
  return (
    <Component {...rest} id={href} className={cn}>
      <a href={`#${href}`}>{children}</a>
    </Component>
  )
}
