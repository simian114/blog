const RDS_FLUID_PREFIX = "rds-fluid"

function getRDSFluidClassName(fluid?: boolean) {
  if (!fluid) {
    return ""
  }

  return `${RDS_FLUID_PREFIX}`
}

export default getRDSFluidClassName
