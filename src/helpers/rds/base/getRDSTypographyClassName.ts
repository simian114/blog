import {
  TypographyVariants,
  TypographyWeight,
} from "@/components/typography/Typography"
import { RDSColorScale, RDSColorType } from "@/types/rds.t"

const RDS_TYPOGRAPHY_PREFIX = "rds-typography"
const RDS_COLOR_PREFIX = "rds-color"

export function getRDSTypographyClassName(params?: {
  weight?: TypographyWeight
  variants?: TypographyVariants
  color?: {
    color?: RDSColorType
    scale?: RDSColorScale
  }
}) {
  const weight = params?.weight
    ? `${RDS_TYPOGRAPHY_PREFIX}-${params?.weight}`
    : ""
  const variants = params?.variants
    ? `${RDS_TYPOGRAPHY_PREFIX}-${params?.variants}`
    : ""
  const color = params?.color?.color || "primary"
  const scale = params?.color?.scale || 10
  const colorClassName = params?.color?.color
    ? `${RDS_COLOR_PREFIX}--${color.toLowerCase()}-${scale}`
    : ""
  return `${
    weight || variants ? RDS_TYPOGRAPHY_PREFIX : ""
  } ${weight} ${variants} ${colorClassName}`
}
