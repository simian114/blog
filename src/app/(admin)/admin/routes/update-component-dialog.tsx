"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Component, ComponentType, Prisma } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import * as z from "zod"

import Button from "@/components/button/Button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UpdateRouteComponentDialogProps {
  route: Prisma.RouteGetPayload<{ include: { components: true } }>
  currentRouteID: number
}

const formSchema = z.object({
  components: z.array(
    z.object({
      type: z.enum([ComponentType.COMPONENT, ComponentType.SUB_URL]),
      extendedData: z.any(),
    })
  ),
})

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

async function getLayoutComponentList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/layout/component`
  )
  return await res.json()
}

export function UpdateRouteComponentDialog(
  props: UpdateRouteComponentDialogProps
) {
  const { data: LayoutComponentList } = useQuery<string[]>({
    queryKey: ["getRouteLayoutList"],
    queryFn: getLayoutComponentList,
  })

  const [open, setOpen] = useState(false)

  const [componentList, setComponentList] = useState<
    Pick<Component, "type" | "name" | "props">[]
  >(props.route.components)

  const hasSubUrl = !!componentList.find(
    component => component.type === ComponentType.SUB_URL
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values
    // await updateRoute({
    //   id: props.currentRouteID,
    //   data: {
    //     categories: {
    //       set: values.categories.map(id => ({ id })),
    //     },
    //   },
    // })
    wait().then(() => setOpen(false))
  }

  function handleAddLayout(type: ComponentType) {
    if (type === ComponentType.SUB_URL) {
      if (hasSubUrl) {
        alert("이미 존재")
        return
      }
      setComponentList([
        ...componentList,
        {
          // routeId: props.route.id,
          type: ComponentType.COMPONENT,
          name: "CategorySelector",
          props: {
            post: "card",
          },
        },
      ])
    } else {
      if (!LayoutComponentList?.length) {
        return
      }
      setComponentList([
        ...componentList,
        {
          // routeId: props.route.id,
          type: ComponentType.COMPONENT,
          name: LayoutComponentList[0],
          props: {},
        },
      ])
    }
  }

  // NOTE: sub url 타입
  // NOTE: components
  // 순서대로 나올 수 있도록 만들어야함

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>레이아웃 변경</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>레이아웃 변경</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex gap-4">
            <Button
              disabled={hasSubUrl}
              onClick={() => handleAddLayout(ComponentType.SUB_URL)}
            >
              add sub url
            </Button>
            <Button onClick={() => handleAddLayout(ComponentType.COMPONENT)}>
              add components
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="components"
                render={() => (
                  <div>
                    {componentList.map((component, index) => (
                      <FormItem key={index} className="flex flex-col">
                        <FormLabel>layout</FormLabel>
                        <Select
                          onValueChange={v => {
                            console.log(v)
                            // field.onChange(Number(v) || 0)
                            // form.trigger("categoryId")
                            // form.trigger("routeId")
                          }}
                          defaultValue={JSON.stringify(component.props)}
                        >
                          <FormControl>
                            <SelectTrigger className="border-solid">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* 타입에 따라 다름 */}
                            {component.type === "COMPONENT" ? (
                              <SelectItem
                                value={JSON.stringify(component.props)}
                              >
                                {JSON.stringify(component.props)}
                              </SelectItem>
                            ) : (
                              <SelectItem
                                value={JSON.stringify(component.props)}
                              >
                                {JSON.stringify(component.props)}
                              </SelectItem>
                            )}
                            <div></div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    ))}
                  </div>
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
