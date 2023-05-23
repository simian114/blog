import Link, { LinkProps } from "next/link"
import { ComponentPropsWithoutRef } from "react"
import { ButtonDesignProps, getRDSButtonTypographyClassName } from "./Button"

interface ButtonLinkProps
  extends LinkProps,
    Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> {
  design?: ButtonDesignProps
}

function getRDSButtonLinkClassName(
  design: Required<Omit<ButtonDesignProps, "typography">>
) {
  const prefix = "rds-btn-link"
  const fluid = design.fluid ? `${prefix}--fluid` : ""
  const icon = design.icon.asset
    ? `${prefix}--icon-${design.icon.position}`
    : ""
  return `${prefix} ${prefix}--${design.type} ${prefix}--${design.size} ${prefix}--color-${design.color} ${fluid} ${icon}`
}

function ButtonLink(props: ButtonLinkProps) {
  const { design, className, ...rest } = props
  const type = design?.type || "primary"
  const size = design?.size || "medium"
  const color = design?.color || "primary"
  const fluid = design?.fluid || false
  const icon = design?.icon || { position: "left", asset: null }
  const typographyCN = getRDSButtonTypographyClassName(design?.typography)
  const cn = getRDSButtonLinkClassName({
    type,
    size,
    color,
    fluid,
    icon,
  })
  return icon ? (
    <Link
      {...rest}
      className={`${cn} ${typographyCN} ${className ? className : ""}`}
    >
      <>
        {icon.position === "left" && <>{icon.asset}</>}
        {rest.children}
        {icon.position === "right" && <>{icon.asset}</>}
      </>
    </Link>
  ) : (
    <Link {...rest} />
  )
}

export default ButtonLink
