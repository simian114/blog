import { COLOR_TYPE } from "@prisma/client"

import { RDSColorScale, RDSColorType } from "@/types/rds.t"

const RDS_SHAPE_PREFIX = "rds-color"

function isRDSColorType(type: string): type is RDSColorType {
  return Object.keys(COLOR_TYPE).includes(type.toUpperCase())
}

function getRDSColorClassName(params?: {
  color?: RDSColorType
  scale?: RDSColorScale
}) {
  if (!isRDSColorType(params?.color || "")) {
    return ""
  }

  const color = params?.color || "gray"
  const scale = params?.scale || 10
  return `${RDS_SHAPE_PREFIX}--${color.toLowerCase()}-${scale}`
}

export default getRDSColorClassName
