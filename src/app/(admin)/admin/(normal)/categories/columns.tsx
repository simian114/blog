"use client"

import { Category, Route } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import { AddDialog } from "./add-dialog"

export const columns: ColumnDef<Category>[] = [
  { accessorKey: "id", header: "id" },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "createdAt",
    header: "생성일",
    cell({ row }) {
      const createdAt = row.getValue<string>("createdAt")
      return <div>{dayjs(createdAt).format("YYYY-MM-DD")}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "수정일",
    cell({ row }) {
      const updatedAt = row.getValue<string>("updatedAt")
      return <div>{dayjs(updatedAt).format("YYYY-MM-DD")}</div>
    },
  },
  {
    accessorKey: "route",
    header: "route",
    cell({ row }) {
      const route = row.getValue<Route>("route")
      return <div className="whitespace-pre">{route?.title}</div>
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <AddDialog category={row.original} />
        </div>
      )
    },
  },
]
