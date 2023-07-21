"use client"
import { CategoryZ, Routee } from "@prisma/client"

import { columns } from "./columns"
import { DataTable } from "./data-table"

interface RouteTableWrapperProps {
  allCategories: CategoryZ[]
  allRoutes: Routee[]
}

export function RouteTableWrapper(props: RouteTableWrapperProps) {
  return (
    <DataTable columns={columns(props.allCategories)} data={props.allRoutes} />
  )
}
