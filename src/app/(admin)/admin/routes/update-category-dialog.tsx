"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import * as z from "zod"

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { updateRoute } from "./actions"

interface RouteCategoryDialogProps {
  route: Prisma.RouteGetPayload<{ include: { categories: true } }>
  currentRouteID: number
}

const formSchema = z.object({
  categories: z.array(z.number()),
})

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

async function getCategoryList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`)
  return await res.json()
}

export function UpdateRouteCategoryDialog(props: RouteCategoryDialogProps) {
  const { data } = useQuery<
    Prisma.CategoryGetPayload<{ include: { route: true; posts: true } }>[]
  >({
    queryKey: ["categories"],
    queryFn: getCategoryList,
  })

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: props.route.categories.map(item => item.id) || [],
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateRoute({
      id: props.currentRouteID,
      data: {
        categories: {
          set: values.categories.map(id => ({ id })),
        },
      },
    })
    wait().then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>카테고리 변경</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>카테고리 변경</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <FormLabel>하위 카테고리를 선택해주세요</FormLabel>
                      <FormDescription>
                        header 의 드롭다운 영역에 나오게 됩니다.
                      </FormDescription>
                    </div>
                    {data?.map(category => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category.id}
                              className="flex flex-row gap-4 items-center"
                            >
                              <FormControl>
                                <Checkbox
                                  className="bg-white"
                                  checked={field.value?.includes(category.id)}
                                  disabled={
                                    !!category.route &&
                                    category.routeId !== props.route.id
                                  }
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          category.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== category.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal !mt-0 hello world">
                                {category.title}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
