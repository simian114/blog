"use client"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RouteLayoutType, Tag } from "@prisma/client"
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

import { createPost, CreatePostDTO } from "./actions"
import { RouteWithCategories } from "./page"

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const formSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  published: z.boolean(),
  categoryId: z.number().optional(),
  description: z.string(),
  url: z.string().optional(),
})

interface AddPostDialogProps {
  allRoutes: RouteWithCategories[]
  allTags: Tag[]
  content: string
}

export function AddPostDialog(props: AddPostDialogProps) {
  const [open, setOpen] = useState(false)
  const routes = useMemo(() => props.allRoutes, [props.allRoutes])
  const [selectedRouteID, setSelectedRouteID] = useState(
    routes?.[0]?.id?.toString()
  )
  const selectedRoute = useMemo(
    () =>
      routes.find(
        route => route.id.toString() === selectedRouteID,
        [selectedRouteID]
      ),
    [routes, selectedRouteID]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: props.content,
      published: false,
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { url, ...rest } = values
    await createPost({
      ...(rest as unknown as CreatePostDTO),
      content: props.content,
      info: { url },
    })
    wait().then(() => setOpen(false))
  }

  // NOTE: custom

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
                <Select
                  defaultValue={`${selectedRouteID}`}
                  onValueChange={setSelectedRouteID}
                >
                  <SelectTrigger className="border-solid">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>

                  <SelectContent>
                    {routes.map(route => {
                      return (
                        <SelectItem key={route.id} value={route.id.toString()}>
                          <div className="flex flex-row gap-4">
                            <span>{route?.title}</span>{" "}
                            <span>type: {route?.layoutType}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                {selectedRoute?.layoutType !== RouteLayoutType.CUSTOM ? (
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col">
                          <FormLabel>카테고리</FormLabel>
                          <Select
                            onValueChange={v => field.onChange(Number(v) || 0)}
                            defaultValue={
                              field.value?.toString() ||
                              selectedRoute?.categories?.[0]?.id.toString()
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="border-solid">
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectedRoute?.categories.map(category => {
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
                ) : (
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>url</FormLabel>
                        <FormControl>
                          <Input
                            className="border-solid"
                            placeholder="url"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

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
