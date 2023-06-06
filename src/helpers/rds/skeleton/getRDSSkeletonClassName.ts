import {
  SkeletonDesignProps,
  SkeletonType,
} from "@/components/skeleton/Skeleton"

//

function getRDSSkeletonClassName<C extends SkeletonType>(
  design?: SkeletonDesignProps<C>
) {
  const prefix = "rds-skeleton"

  return `${prefix} ${prefix}--${design?.type || "primary"} ${prefix}--${
    design?.type || "primary"
  }${design?.variant ? `-${design.variant}` : ""}`
}

export default getRDSSkeletonClassName
