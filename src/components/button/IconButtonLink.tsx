import Link, { LinkProps } from "next/link"
import { ComponentPropsWithoutRef, ReactElement } from "react"
import { forwardRef, Ref } from "react"

import getRDSBaseClassName from "@/helpers/rds/base/getRDSBaseClassName"
import getRDSIconButtonClassName from "@/helpers/rds/button/getRDSIconButtonClassName"
import { RDSBaseProps } from "@/types/rds.t"

import { IconButtonDesignProps } from "./IconButton"

interface IconButtonProps
  extends LinkProps,
    Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> {
  design?: IconButtonDesignProps
  baseDesign?: RDSBaseProps
}

// NOTE: icon 자체는 children 으로 넘기기
function IconButtonLink(
  props: IconButtonProps,
  ref: Ref<HTMLAnchorElement>
): ReactElement {
  const { design, baseDesign, className, ...rest } = props
  const cn = getRDSIconButtonClassName(design)
  const rdsBaseClassName = getRDSBaseClassName(baseDesign)

  return (
    <Link
      {...rest}
      ref={ref}
      className={`${className ? className : ""} ${cn} ${rdsBaseClassName}`}
    />
  )
}

export default forwardRef<HTMLAnchorElement, IconButtonProps>(IconButtonLink)
