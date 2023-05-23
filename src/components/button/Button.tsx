import { ComponentPropsWithoutRef, ReactNode } from "react"
import { TypographyVariants, TypographyWeight } from "../typography/Typography"

// NOTE: primary 는 색, secondary 는 border 컬러 circle 는 원형
type BUTOTN_TYPE = "primary" | "secondary" | "tertiary"
type BUTTON_SIZE = "xsmall" | "small" | "medium" | "large" | "xlarge"
type BUTTON_COLOR = "primary" | "secondary" | "tertiary" | "gray"

type ICON_POSITION = "left" | "right"

export interface ButtonIconProps {
  position: ICON_POSITION
  asset: ReactNode
}

export interface ButtonDesignProps {
  type?: BUTOTN_TYPE
  size?: BUTTON_SIZE
  color?: BUTTON_COLOR
  fluid?: boolean
  icon?: ButtonIconProps
  typography?: {
    weight?: TypographyWeight
    variants?: TypographyVariants
  }
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  design?: ButtonDesignProps
}

function getRDSButtonClassName(
  design: Required<Omit<ButtonDesignProps, "typography">>
) {
  const prefix = "rds-btn"
  const fluid = design.fluid ? `${prefix}--fluid` : ""
  const icon = design.icon.asset
    ? `${prefix}--icon-${design.icon.position}`
    : ""

  return `${prefix} ${prefix}--${design.type} ${prefix}--${design.size} ${prefix}--color-${design.color} ${fluid} ${icon}`
}

// NOTE: shape 등의 클래스를 만들어주는 util 함수를 만들고 design 에서 그걸 받을 수 있게 만들자. typo 도 조금 더 고도화 해당 typography 에서 가져ㅕ올 수있게
export function getRDSButtonTypographyClassName(typography?: {
  weight?: TypographyWeight
  variants?: TypographyVariants
}) {
  //
  const weight = typography?.weight
    ? `rds-typography-${typography?.weight}`
    : ""
  const variants = typography?.variants
    ? `rds-typography-${typography?.variants}`
    : ""
  return `${weight} ${variants}`
}

function Button(props: ButtonProps) {
  const { design, className, ...rest } = props
  const type = design?.type || "primary"
  const size = design?.size || "medium"
  const color = design?.color || "primary"
  const fluid = design?.fluid || false
  const icon = design?.icon || { position: "left", asset: null }
  //
  const typographyCN = getRDSButtonTypographyClassName(design?.typography)

  const cn = getRDSButtonClassName({
    type,
    size,
    color,
    fluid,
    icon,
  })

  return icon ? (
    <button
      {...rest}
      className={`${cn} ${typographyCN} ${className ? className : ""}`}
    >
      <>
        {icon.position === "left" && <>{icon.asset}</>}
        {rest.children}
        {icon.position === "right" && <>{icon.asset}</>}
      </>
    </button>
  ) : (
    <button {...rest} />
  )
}

export default Button
