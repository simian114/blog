"use client"

import { Prisma } from "@prisma/client"

import { columns } from "./columns"
import { DataTable } from "./data-table"

interface RouteTableWrapperProps {
  allRoutes: Prisma.RouteGetPayload<{
    include: {
      categories: true
      components: true
    }
  }>[]
}

export function RouteTableWrapper(props: RouteTableWrapperProps) {
  // const keys = LayoutComponentList
  // console.log("---------- mapper keys ------------")
  // console.log(keys)
  // console.log("-----------------------------------")
  return <DataTable columns={columns} data={props.allRoutes} />
}
