import getRDSBaseClassName from "@/helpers/rds/base/getRDSBaseClassName"
import getRDSIconButtonClassName from "@/helpers/rds/button/getRDSIconButtonClassName"
import { RDSBaseProps } from "@/types/rds.t"
import { ComponentPropsWithoutRef, forwardRef } from "react"

export type IconButtonSizeType = "small" | "medium" | "large"

export interface IconButtonDesignProps {
  size: IconButtonSizeType
}

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  design?: IconButtonDesignProps
  baseDesign?: RDSBaseProps
}

// NOTE: icon 자체는 children 으로 넘기기
function IconButton(
  props: IconButtonProps,
  ref: React.Ref<HTMLButtonElement>
): React.ReactElement {
  const { design, baseDesign, className, ...rest } = props
  const cn = getRDSIconButtonClassName(design)
  const rdsBaseClassName = getRDSBaseClassName(baseDesign)

  return (
    <button
      {...rest}
      ref={ref}
      className={` ${className ? className : ""} ${cn} ${rdsBaseClassName}`}
    />
  )
}

export default forwardRef<HTMLButtonElement, IconButtonProps>(IconButton)
