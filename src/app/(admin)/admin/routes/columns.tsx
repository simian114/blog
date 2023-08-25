"use client"

import Link from "next/link"
import { Category, Component, Prisma } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import { AddRouteDialog } from "./add-dialog"
import { DeleteRouteDialog } from "./delete-dialog"
import { UpdateRouteCategoryDialog } from "./update-category-dialog"
import { UpdateRouteComponentDialog } from "./update-component-dialog"

export const columns: ColumnDef<
  Prisma.RouteGetPayload<{ include: { categories: true; components: true } }>
>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "name",
    cell({ row }) {
      return (
        <Link
          className="hover:text-sky-700 font-bold"
          href={row.getValue<string>("title")}
        >
          {row.getValue<string>("title")}
        </Link>
      )
    },
  },
  {
    id: "url",
    accessorKey: "url",
    header: "url",
  },
  {
    id: "type",
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "open",
    header: "노출",
  },
  {
    accessorKey: "categories",
    header: "하위 카테고리",
    cell({ row }) {
      const categories = row.getValue<Category[]>("categories") || []
      return (
        <div className="flex flex-row gap-1 flex-wrap whitespace-pre">
          {categories?.map(category => category.title).join("\n")}
        </div>
      )
    },
  },
  {
    id: "components",
    accessorKey: "components",
    header: "컴포넌트 타입",
    cell({ row }) {
      const components = row.getValue("components") as Component[]
      return (
        <div className="flex flex-col gap-4">
          {components.map((component, index) => (
            <div className="flex gap-4" key={index}>
              <span>type: {component.type}</span>
              <span>name: {component.name}</span>
              <span>props: {JSON.stringify(component.props)}</span>
            </div>
          ))}
        </div>
      )
    },
  },
  {
    id: "priority",
    accessorKey: "priority",
    header: "우선순위",
  },
  {
    id: "deletedAt",
    accessorKey: "deletedAt",
    header: "삭제",
    cell({ row }) {
      if (!row.original.deletedAt) {
        return <></>
      }
      return <span>{dayjs(row.original.deletedAt).format("YYYY.MM.DD")}</span>
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <AddRouteDialog route={row.original} />
          <DeleteRouteDialog route={row.original} />
          <UpdateRouteCategoryDialog
            route={row.original}
            currentRouteID={row.getValue<number>("id")}
          />
          <UpdateRouteComponentDialog
            route={row.original}
            currentRouteID={row.getValue<number>("id")}
          />
        </div>
      )
    },
  },
]
