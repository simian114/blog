import { ButtonDesignProps } from "@/components/button/Button"

//
function getRDSButtonClassName(design: Required<ButtonDesignProps>) {
  const prefix = "rds-btn"
  const icon = design.icon.asset
    ? `${prefix}--icon-${design.icon.position}`
    : ""

  return `${prefix} ${prefix}--${design.type} ${prefix}--${design.size} ${prefix}--color-${design.color} ${icon}`
}

export default getRDSButtonClassName
