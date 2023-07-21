import {
  TypographyVariants,
  TypographyWeight,
} from "@/components/typography/Typography"

const RDS_TYPOGRAPHY_PREFIX = "rds-typography"

export function getRDSTypographyClassName(typography?: {
  weight?: TypographyWeight
  variants?: TypographyVariants
}) {
  const weight = typography?.weight
    ? `${RDS_TYPOGRAPHY_PREFIX}-${typography?.weight}`
    : ""
  const variants = typography?.variants
    ? `${RDS_TYPOGRAPHY_PREFIX}-${typography?.variants}`
    : ""
  return `${RDS_TYPOGRAPHY_PREFIX} ${weight} ${variants}`
}
