import { COLOR_TYPE } from "@prisma/client"

import {
  TypographyVariants,
  TypographyWeight,
} from "@/components/typography/Typography"

export interface RDSBaseProps {
  shape?: RDSShapeType
  typography?: RDSTypographyProps
  fluid?: boolean
  bg?: {
    color?: RDSColorType
    scale?: RDSColorScale
  }
  color?: {
    color?: RDSColorType
    scale?: RDSColorScale
  }
}

export interface RDSTypographyProps {
  weight?: TypographyWeight
  variants?: TypographyVariants
  color?: {
    color?: RDSColorType
    scale?: RDSColorScale
  }
}
export type RDSShapeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "squared"
  | "circle"

export type RDSColorType = keyof typeof COLOR_TYPE

export type RDSColorScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
