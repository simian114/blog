import { ComponentPropsWithoutRef, forwardRef, ReactNode, Ref } from "react"

import getRDSBaseClassName from "@/helpers/rds/base/getRDSBaseClassName"
import getRDSButtonClassName from "@/helpers/rds/button/getRDSButtonClassName"
import { RDSBaseProps } from "@/types/rds.t"

// NOTE: primary 는 색, secondary 는 border 컬러 circle 는 원형
type ButtonType = "primary" | "secondary" | "tertiary"
type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge"
type ButtonColor = "primary" | "secondary" | "tertiary" | "gray"

type IconPosition = "left" | "right"

export interface ButtonIconProps {
  position: IconPosition
  asset: ReactNode
}

export interface ButtonDesignProps {
  type?: ButtonType
  size?: ButtonSize
  color?: ButtonColor
  icon?: ButtonIconProps
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  design?: ButtonDesignProps
  baseDesign?: RDSBaseProps
}

function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { design, baseDesign, className, ...rest } = props
  const type = design?.type || "primary"
  const size = design?.size || "medium"
  const color = design?.color || "primary"
  const icon = design?.icon || { position: "left", asset: null }

  const rdsButtonClassName = getRDSButtonClassName({
    type,
    size,
    color,
    icon,
  })

  const rdsBaseClassName = getRDSBaseClassName(baseDesign)

  return icon ? (
    <button
      {...rest}
      ref={ref}
      className={`${
        className ? className : ""
      } ${rdsButtonClassName}  ${rdsBaseClassName}`}
    >
      <>
        {icon.position === "left" && <>{icon.asset}</>}
        {rest.children}
        {icon.position === "right" && <>{icon.asset}</>}
      </>
    </button>
  ) : (
    <button
      ref={ref}
      className={`${
        className ? className : ""
      } ${rdsButtonClassName}  ${rdsBaseClassName}`}
      {...rest}
    />
  )
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button)
