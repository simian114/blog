"use client"
import { Category, Route } from "@prisma/client"

import { columns } from "./columns"
import { DataTable } from "./data-table"

interface RouteTableWrapperProps {
  allCategories: Category[]
  allRoutes: Route[]
}

export function RouteTableWrapper(props: RouteTableWrapperProps) {
  return (
    <DataTable columns={columns(props.allCategories)} data={props.allRoutes} />
  )
}
