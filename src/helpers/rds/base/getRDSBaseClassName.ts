import { RDSBaseProps } from "@/types/rds.t"

import getRDSBGColorClassName from "./getRDSBgColorClassName"
import getRDSColorClassName from "./getRDSColorClassName"
import getRDSFluidClassName from "./getRDSFluidClassName"
import getRDSShapeClassName from "./getRDSShapeClassName"
import { getRDSTypographyClassName } from "./getRDSTypographyClassName"

function getRDSBaseClassName(params?: RDSBaseProps) {
  return `${getRDSShapeClassName(params?.shape)} ${getRDSFluidClassName(
    params?.fluid
  )} ${getRDSTypographyClassName(params?.typography)} ${getRDSBGColorClassName(
    params?.bg
  )} ${getRDSColorClassName(params?.color)}
`
}

export default getRDSBaseClassName
