"use client"

import { Prisma } from "@prisma/client"

import { columns } from "./columns"
import { DataTable } from "./data-table"

interface RouteTableWrapperProps {
  allRoutes: Prisma.RouteGetPayload<{
    include: {
      categories: true
    }
  }>[]
}

export function RouteTableWrapper(props: RouteTableWrapperProps) {
  return <DataTable columns={columns} data={props.allRoutes} />
}
