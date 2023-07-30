"use client"

import Link from "next/link"
import { Category, Prisma } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import { DeleteRouteDialog } from "./delete-dialog"
import { UpdateRouteCategoryDialog } from "./update-category-dialog"
import { UpdateRouteDialog } from "./update-dialog"
import { UpdateRouteLayoutDialog } from "./update-layout-type-dialog"

export const columns: ColumnDef<
  Prisma.RouteGetPayload<{ include: { categories: true } }>
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
    id: "layoutType",
    header: "레이아웃 타입",
    cell({ row }) {
      return <div>{row.original?.layoutType}</div>
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
          <UpdateRouteDialog route={row.original} />
          <DeleteRouteDialog route={row.original} />
          <UpdateRouteCategoryDialog
            route={row.original}
            currentRouteID={row.getValue<number>("id")}
          />
          <UpdateRouteLayoutDialog route={row.original} />
        </div>
      )
    },
  },
]
