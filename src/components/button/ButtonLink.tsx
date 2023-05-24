import { ComponentPropsWithoutRef } from "react"
import { forwardRef, ReactElement, Ref } from "react"
import Link, { LinkProps } from "next/link"

import getRDSBaseClassName from "@/helpers/rds/base/getRDSBaseClassName"
import getRDSButtonLinkClassName from "@/helpers/rds/button/getRDSButtonLinkClassName"
import { RDSBaseProps } from "@/types/rds.t"

import { ButtonDesignProps } from "./Button"

interface ButtonLinkProps
  extends LinkProps,
    Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> {
  design?: ButtonDesignProps
  baseDesign?: RDSBaseProps
}

function ButtonLink(
  props: ButtonLinkProps,
  ref: Ref<HTMLAnchorElement>
): ReactElement {
  const { design, baseDesign, className, ...rest } = props
  const type = design?.type || "primary"
  const size = design?.size || "medium"
  const color = design?.color || "primary"
  const icon = design?.icon || { position: "left", asset: null }

  const rdsButtonClassName = getRDSButtonLinkClassName({
    type,
    size,
    color,
    icon,
  })

  const rdsBaseClassName = getRDSBaseClassName(baseDesign)

  return icon ? (
    <Link
      {...rest}
      ref={ref}
      className={`${
        className ? className : ""
      } ${rdsButtonClassName} ${rdsBaseClassName}`}
    >
      <>
        {icon.position === "left" && <>{icon.asset}</>}
        {rest.children}
        {icon.position === "right" && <>{icon.asset}</>}
      </>
    </Link>
  ) : (
    <Link
      ref={ref}
      className={`${
        className ? className : ""
      } ${rdsButtonClassName}  ${rdsBaseClassName}`}
      {...rest}
    />
  )
}

export default forwardRef<HTMLAnchorElement, ButtonLinkProps>(ButtonLink)
