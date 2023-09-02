"use client"

import Link from "next/link"
import { Post, Tag } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import TagComponent from "@/components/postCard/tag/Tag"

import { AddDialog } from "./add-dialog"

export const columns: ColumnDef<Tag>[] = [
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
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "color",
    header: "color",
    cell({ row }) {
      return (
        <div className="flex" style={{ whiteSpace: "pre" }}>
          <TagComponent tag={row.original} color={row.original.color} />
        </div>
      )
    },
  },
  {
    accessorKey: "posts",
    header: "연결된 post",
    cell({ row }) {
      const posts = row.getValue<Post[]>("posts")
      return (
        <div className="flex flex-col" style={{ whiteSpace: "pre" }}>
          {posts?.map(post => post?.title).join("\n")}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <AddDialog tag={row.original} />
        </div>
      )
    },
  },
]
