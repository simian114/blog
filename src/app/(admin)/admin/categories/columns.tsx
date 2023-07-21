"use client"

import Link from "next/link"
import { Category, Route } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

export const columns: ColumnDef<Category>[] = [
  { accessorKey: "id", header: "id" },
  {
    accessorKey: "title",
    header: "Title",
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
]
