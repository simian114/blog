import { RDSShapeType } from "@/types/rds.t"

const RDS_SHAPE_PREFIX = "rds-shape"

function isShapeType(type: string): type is RDSShapeType {
  return ["primary", "secondary", "tertiary", "circle"].includes(type)
}

function getRDSShapeClassName(shape?: RDSShapeType) {
  if (!isShapeType(shape || "")) {
    return ""
  }

  return `${RDS_SHAPE_PREFIX}--${shape}`
}

export default getRDSShapeClassName
