import { ComponentPropsWithoutRef, ReactElement } from "react"
import Link, { LinkProps } from "next/link"

import { ICON_BUTTON_PREFIX, IconButtonDesignProps } from "./IconButton"

interface IconButtonProps
  extends LinkProps,
    Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> {
  design?: IconButtonDesignProps
}

function getRDSIconButtonClassName(design?: IconButtonDesignProps) {
  const size = `${ICON_BUTTON_PREFIX}--${design?.size || "medium"}`

  return `${ICON_BUTTON_PREFIX} ${size}`
}

// NOTE: icon 자체는 children 으로 넘기기
function IconButtonLink(props: IconButtonProps): ReactElement {
  const { design, className, ...rest } = props
  const cn = getRDSIconButtonClassName(design)

  return <Link {...rest} className={`${cn} ${className ? className : ""}`} />
}

export default IconButtonLink
