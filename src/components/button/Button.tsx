import styles from "./button.module.scss"
import { ButtonProps } from "./common"

export default function Button(props: ButtonProps) {
  const { design, className, children, ...rest } = props

  const cn = `
  ${!!className ? className : ""} ${
    styles[`${design?.color ? `${design.color}-color` : "primary-color"}`]
  } ${styles[`${design?.size ? `${design.size}` : "medium"}`]} ${
    styles[`${design?.style ? `${design.style}` : "default"}`]
  } ${styles[`${design?.weight ? `${design.weight}-typo` : "regular-typo"}`]}
  `
  return (
    <button className={cn} {...rest}>
      <span className="shadow">{children}</span>
      <span className="front">{children}</span>
    </button>
  )
}
