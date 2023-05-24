import { RDSBaseProps } from "@/types/rds.t"
import { getRDSTypographyClassName } from "./getRDSTypographyClassName"
import getRDSFluidClassName from "./getRDSFluidClassName"
import getRDSShapeClassName from "./getRDSShapeClassName"

function getRDSBaseClassName(params?: RDSBaseProps) {
  return `${getRDSShapeClassName(params?.shape)} ${getRDSFluidClassName(
    params?.fluid
  )} ${getRDSTypographyClassName(params?.typography)}`
}

export default getRDSBaseClassName
