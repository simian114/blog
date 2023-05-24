import Link from "next/link"

import { ButtonLinkProps } from "./common"

import styles from "./button.module.scss"

export default function ButtonLink(props: ButtonLinkProps) {
  const { href, design, className, children, ...rest } = props

  const cn = `
  ${!!className ? className : ""} ${
    styles[`${design?.color ? `${design.color}-color` : "primary-color"}`]
  } ${styles[`${design?.size ? `${design.size}` : "medium"}`]} ${
    styles[`${design?.style ? `${design.style}` : "default"}`]
  }  ${styles[`${design?.weight ? `${design.weight}-typo` : "regular-typo"}`]}
  `
  return (
    <Link href={href} className={cn} {...rest}>
      <span className={styles.shadow} />
      <span className={styles.front}>{children}</span>
    </Link>
  )
}
