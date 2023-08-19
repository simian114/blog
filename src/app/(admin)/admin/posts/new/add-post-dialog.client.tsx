"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma, SubUrlSelector, Tag } from "@prisma/client"
import { useQueries } from "@tanstack/react-query"
import readingTime from "reading-time"
import { z } from "zod"

import Button from "@/components/button/Button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { AllIncludedPost } from "../[id]/page"

import { createPost, updatePost } from "./actions"

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const formSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().optional(),
  published: z.boolean().optional(),
  routeId: z.number().optional(),
  categoryId: z.number().optional(),
  description: z.string().optional(),
  url: z.string().min(1).max(100),
  tagIds: z.array(z.number()),
})

interface AddPostDialogProps {
  post?: AllIncludedPost
  content?: string
}

async function fetchRouteList(): Promise<
  Prisma.RouteGetPayload<{
    include: { categories: true; posts: true; layouts: true }
  }>[]
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/route`)
  return await res.json()
}

async function fetchTagList(): Promise<Tag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tag`)
  return await res.json()
}

export function AddPostDialog(props: AddPostDialogProps) {
  const [{ data: routes }, { data: tags }] = useQueries({
    queries: [
      { queryKey: ["routes"], queryFn: fetchRouteList },
      { queryKey: ["tags"], queryFn: fetchTagList },
    ],
  })
  const [open, setOpen] = useState(false)
  const filteredRoutes = useMemo(
    () =>
      routes?.filter(
        route =>
          !!route.layouts.find(
            layout =>
              layout.type === "SUB_URL" &&
              (layout.extendedData as Prisma.JsonObject)?.selector ===
                SubUrlSelector.CATEGORY
          )
      ) || [],
    [routes]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.post?.title || "",
      content: props.content || "",
      published: props.post?.published || false,
      description: props.post?.description || "",
      routeId: props.post?.routeId || routes?.[0].id,
      categoryId: props.post?.categoryId || routes?.[0]?.categories?.[0]?.id,
      url: props.post?.url || "",
      tagIds: props.post?.tags.map(tag => tag.tagId) || [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { categoryId, routeId, tagIds, url, ...rest } = values

    if (!!props.post) {
      const addedTags = tagIds
        .filter(tagId => !props.post?.tags.find(tag => tag.tagId === tagId))
        .map(id => ({ tagId: id, assignedBy: "" }))
      const deletedTags = props.post.tags
        .filter(tag => !tagIds.find(id => id === tag.tagId))
        .map(tag => ({ tagId: tag.tagId }))

      await updatePost({
        id: props.post.id,
        data: {
          ...rest,
          url: url.replaceAll(" ", "-"),
          readingTime: readingTime(props.content || "").minutes,
          content: props.content,
          category:
            props.post.categoryId === categoryId
              ? undefined
              : { connect: { id: categoryId } },
          route:
            props.post.routeId === routeId
              ? undefined
              : { connect: { id: routeId } },
          tags: {
            deleteMany: deletedTags,
            createMany: {
              data: addedTags,
            },
          },
        },
      })
    } else {
      await createPost({
        ...rest,
        url: url.replaceAll(" ", "-"),
        readingTime: readingTime(props.content || "").minutes,
        content: props.content,
        category: !categoryId ? undefined : { connect: { id: categoryId } },
        route: !routeId ? undefined : { connect: { id: routeId } },
        tags: {
          createMany: {
            data: tagIds.map(id => ({ tagId: id, assignedBy: "" })),
          },
        },
      })
    }

    wait().then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>저장</Button>
      </DialogTrigger>
      <DialogContent className="border-solid">
        <DialogHeader>
          <DialogTitle>정보</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Input
                          className="border-solid"
                          placeholder="제목을 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>url</FormLabel>
                      <FormControl>
                        <Input
                          className="border-solid"
                          placeholder="공백은 - 로 치환됩니다"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약</FormLabel>
                      <FormControl>
                        <Input
                          className="border-solid"
                          placeholder="콘텐츠를 요약해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>공개 설정</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="bg-white"
                          checked={field.value}
                          onCheckedChange={v => field.onChange(v as boolean)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="routeId"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel>route</FormLabel>
                        <Select
                          onValueChange={v => {
                            field.onChange(Number(v) || 0)
                            form.trigger("categoryId")
                            form.trigger("routeId")
                          }}
                          defaultValue={
                            field.value?.toString() ||
                            filteredRoutes?.[0]?.id.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="border-solid">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredRoutes.map(route => {
                              return (
                                <SelectItem
                                  key={route.id}
                                  value={route.id.toString()}
                                >
                                  <div className="flex flex-row gap-4">
                                    <span>{route?.title}</span>{" "}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => {
                    const routeID = form.getValues("routeId")
                    const categoriesByRoute =
                      filteredRoutes.find(route => route.id === routeID)
                        ?.categories || []

                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel>카테고리</FormLabel>
                        <Select
                          onValueChange={v => field.onChange(Number(v) || 0)}
                          defaultValue={
                            field.value?.toString() ||
                            categoriesByRoute?.[0]?.id.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="border-solid">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoriesByRoute.map(category => {
                              return (
                                <SelectItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  <div className="flex flex-row gap-4">
                                    <span>
                                      {category?.title}{" "}
                                      {category?.id?.toString()}
                                    </span>
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="tagIds"
                  render={() => (
                    <FormItem className="flex flex-col gap-4">
                      <div className="flex flex-col gap-4">
                        <FormLabel>태그를 선택해주세요</FormLabel>
                      </div>
                      <div className="flex flex-row gap-4 flex-wrap">
                        {tags?.map(tag => (
                          <FormField
                            key={tag.id}
                            control={form.control}
                            name="tagIds"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={tag.id}
                                  className="flex flex-row gap-4 items-center"
                                >
                                  <FormControl>
                                    <Checkbox
                                      className="bg-white"
                                      checked={field.value?.includes(tag.id)}
                                      // NOTE: disable condition
                                      // disabled={
                                      //   !!tag.route &&
                                      //   tag.routeId !== props.route.id
                                      // }
                                      onCheckedChange={checked => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              tag.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                value => value !== tag.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal !mt-0 hello world">
                                    {tag.title}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* NOTE: */}
                <Button type="submit">submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
