import { ComponentPropsWithoutRef, ReactNode } from "react"

import getRDSBaseClassName from "@/helpers/rds/base/getRDSBaseClassName"
import getRDSSkeletonClassName from "@/helpers/rds/skeleton/getRDSSkeletonClassName"
import { RDSBaseProps } from "@/types/rds.t"

import { TypographyVariants } from "../typography/Typography"

export type SkeletonType = "primary" | "avatar" | "text"

type TextSkeletonDesignProps = {
  variant: TypographyVariants
}

type NormalSkeletonDesignProps = {
  variant?: never
}

type ConditionalProps<C extends SkeletonType> = C extends "text"
  ? TextSkeletonDesignProps
  : NormalSkeletonDesignProps

export type SkeletonCommonDesignProps<C extends SkeletonType> = {
  type: C
}

export type SkeletonDesignProps<C extends SkeletonType> =
  SkeletonCommonDesignProps<C> & ConditionalProps<C>

interface SkeletonProps<C extends SkeletonType>
  extends Pick<ComponentPropsWithoutRef<"div">, "className"> {
  design?: SkeletonDesignProps<C>
  baseDesign?: RDSBaseProps
  children?: ReactNode
}

function Skeleton<C extends SkeletonType>(props: SkeletonProps<C>) {
  const { design, baseDesign, className } = props
  const rdsSkeletonClassName = getRDSSkeletonClassName(design)
  const rdsBaseClassName = getRDSBaseClassName(baseDesign)
  return (
    <div
      className={`${
        className ? className : ""
      } ${rdsSkeletonClassName}  ${rdsBaseClassName}`}
    >
      {props.children || "."}
    </div>
  )
}

export default Skeleton
