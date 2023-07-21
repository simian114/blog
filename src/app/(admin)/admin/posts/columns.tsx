"use client"

import Link from "next/link"
import { Post, Tag } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import Typography from "@/components/typography/Typography"

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell({ row }) {
      return (
        <div className="hover:text-sky-700 font-bold">
          {row.getValue<string>("title")}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "publishedAt",
    header: "PublishedAt",
    cell({ row }) {
      const publishedAt = row.getValue<string>("publishedAt")
      return <div>{dayjs(publishedAt).format("YYYY-MM-DD")}</div>
    },
  },
  {
    id: "published",
    accessorKey: "publishedAt",
    header: "공개",
    cell({ row }) {
      const publishedAt = row.getValue<string>("publishedAt")
      if (!publishedAt) {
        return <Typography className="break-keep">비공개</Typography>
      }
      return <Typography className="break-keep">공개</Typography>
    },
  },
  {
    accessorKey: "info.url",
    header: "url",
    cell({ getValue }) {
      return (
        <Link href={getValue<string>() || ""} className="flex gap-4">
          {getValue<string>() || ""}
        </Link>
      )
    },
  },
  {
    accessorKey: "info.readingTime",
    header: "readingTime",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell({ row }) {
      const tags = row.getValue<Tag[] | undefined>("tags")
      if (!tags || !tags.length) {
        return <></>
      }
      return (
        <div className="flex gap-4">
          {tags.map((tag, index) => (
            <Typography key={index}>{tag.title}</Typography>
          ))}
        </div>
      )
    },
  },

  {
    accessorKey: "category.title",
    header: "Category",
  },
]
