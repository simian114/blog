"use client"

import Link from "next/link"
import { CategoryZ, Routee } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import { RouteCategoryDialog } from "./category-dialog"

export const columns = (allCategory: CategoryZ[]): ColumnDef<Routee>[] => [
  {
    accessorKey: "id",
    header: "id",
  },
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
    accessorKey: "open",
    header: "노출",
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
    accessorKey: "categoryIDs",
    header: "하위 카테고리",
    cell({ row }) {
      // const categories = row.getValue<number[]>("categoryIDs")
      const categoryIDs = row.getValue<number[]>("categoryIDs") || []
      const categories = allCategory.filter(c => categoryIDs.includes(c.id))
      return (
        <div className="flex flex-row gap-1 flex-wrap whitespace-pre">
          {categories?.map(category => category.title).join("\n")}
        </div>
      )
    },
  },
  {
    accessorKey: "id",
    header: "카테고리 추가",
    cell({ row }) {
      const categories = row.getValue<number[]>("categoryIDs")
      return (
        <RouteCategoryDialog
          currentRouteID={row.getValue<number>("id")}
          allCategories={allCategory}
          currentCategories={categories}
        />
      )
    },
  },
]
