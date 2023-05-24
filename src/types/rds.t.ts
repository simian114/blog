import { RDSTypographyProps } from "@/components/typography/Typography"

export interface RDSBaseProps {
  shape?: RDSShapeType
  typography?: RDSTypographyProps
  fluid?: boolean
}

export type RDSShapeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "squared"
  | "circle"
