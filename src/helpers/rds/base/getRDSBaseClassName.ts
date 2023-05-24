import { RDSBaseProps } from "@/types/rds.t"

import getRDSFluidClassName from "./getRDSFluidClassName"
import getRDSShapeClassName from "./getRDSShapeClassName"
import { getRDSTypographyClassName } from "./getRDSTypographyClassName"

function getRDSBaseClassName(params?: RDSBaseProps) {
  return `${getRDSShapeClassName(params?.shape)} ${getRDSFluidClassName(
    params?.fluid
  )} ${getRDSTypographyClassName(params?.typography)}`
}

export default getRDSBaseClassName
