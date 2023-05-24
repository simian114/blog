import { IconButtonDesignProps } from "@/components/button/IconButton"

export const ICON_BUTTON_PREFIX = "rds-icon-btn"

function getRDSIconButtonClassName(design?: IconButtonDesignProps) {
  const size = `${ICON_BUTTON_PREFIX}--${design?.size || "medium"}`

  return `${ICON_BUTTON_PREFIX} ${size}`
}

export default getRDSIconButtonClassName
