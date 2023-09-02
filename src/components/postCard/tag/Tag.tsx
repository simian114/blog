import { Tag } from "@prisma/client"

import getRDSBaseClassName from "@/helpers/rds/base/getRDSBaseClassName"
import { RDSBaseProps, RDSColorType } from "@/types/rds.t"

const BG_COLOR_SCALE = 6
const TEXT_COLOR_SCALE = 11

// NOTE: 현재 tag 는 오직 하나의 타입
// NOTE: 링크 타입이 하나 생겨도 될듯?
interface TagProps {
  tag: Tag
  type?: "not" | "yet"
  color?: RDSColorType
  baseDesign?: RDSBaseProps
}

export default function Tag(props: TagProps) {
  const color: RDSColorType = (props.color?.toLowerCase() ||
    "primary") as RDSColorType
  const baseDesign: RDSBaseProps = {
    ...(props.baseDesign || {}),
    bg: { color: color || "GRAY", scale: BG_COLOR_SCALE },
    typography: { color: { color, scale: TEXT_COLOR_SCALE } },
  }
  const cn = `tag ${getRDSBaseClassName(baseDesign)}`
  return <span className={cn}>{props.tag.title}</span>
}
