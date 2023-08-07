"use client"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma, SubUrlSelector, Tag } from "@prisma/client"
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

import { createPost } from "./actions"
import { RouteWithCategories } from "./page"

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const formSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  published: z.boolean(),
  routeId: z.number(),
  categoryId: z.number().optional(),
  description: z.string(),
  url: z.string().min(1).max(100),
})

interface AddPostDialogProps {
  allRoutes: RouteWithCategories[]
  allTags: Tag[]
  content: string
}

export function AddPostDialog(props: AddPostDialogProps) {
  const [open, setOpen] = useState(false)
  const routes = useMemo(
    () =>
      props.allRoutes.filter(
        route =>
          !!route.layouts.find(
            layout =>
              layout.type === "SUB_URL" &&
              (layout.extendedData as Prisma.JsonObject)?.selector ===
                SubUrlSelector.CATEGORY
          )
      ),
    [props.allRoutes]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: props.content,
      published: false,
      description: "",
      routeId: routes?.[0].id,
      categoryId: routes?.[0]?.categories?.[0]?.id,
      url: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { categoryId, routeId, url, ...rest } = values
    const time = readingTime(props.content).minutes

    await createPost({
      ...rest,
      url: url.replaceAll(" ", "-"),
      readingTime: time,
      content: props.content,
      category: { connect: { id: categoryId } },
      route: { connect: { id: routeId } },
    })
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
                            routes?.[0]?.id.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="border-solid">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {routes.map(route => {
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
                      routes.find(route => route.id === routeID)?.categories ||
                      []

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
