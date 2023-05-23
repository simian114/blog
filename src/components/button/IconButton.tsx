import { ComponentPropsWithoutRef, ReactElement } from "react"

export const ICON_BUTTON_PREFIX = "rds-icon-btn"

export type ICON_BUTTON_SIZE = "small" | "medium" | "large"

export interface IconButtonDesignProps {
  size: ICON_BUTTON_SIZE
}

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  design?: IconButtonDesignProps
}

function getRDSIconButtonClassName(design?: IconButtonDesignProps) {
  const size = `${ICON_BUTTON_PREFIX}--${design?.size || "medium"}`

  return `${ICON_BUTTON_PREFIX} ${size}`
}

// NOTE: icon 자체는 children 으로 넘기기
function IconButton(props: IconButtonProps): ReactElement {
  const { design, className, ...rest } = props
  const cn = getRDSIconButtonClassName(design)

  return <button {...rest} className={`${cn} ${className ? className : ""}`} />
}

export default IconButton
