"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma, RouteLayoutType } from "@prisma/client"
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
  FormDescription,
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

import { updateRoute } from "./actions"

interface RouteCategoryDialogProps {
  route: Prisma.RouteGetPayload<{ include: { categories: true } }>
}

const formSchema = z.object({
  layoutType: z.enum([
    RouteLayoutType.CARD,
    RouteLayoutType.TABLE,
    RouteLayoutType.CUSTOM,
  ]),
})

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

export function UpdateRouteLayoutDialog(props: RouteCategoryDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      layoutType: RouteLayoutType.CARD,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateRoute({
      id: props.route.id,
      data: {
        layoutType: {
          set: values.layoutType,
        },
      },
    })
    wait().then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>레이아웃 변경</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>레이아웃 타입 변경</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="layoutType"
                render={() => (
                  <FormItem className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <FormLabel>하위 카테고리를 선택해주세요</FormLabel>
                      <FormDescription>
                        header 의 드롭다운 영역에 나오게 됩니다.
                      </FormDescription>
                    </div>
                    <FormField
                      control={form.control}
                      name="layoutType"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col">
                            <FormLabel>layout type</FormLabel>
                            <Select
                              onValueChange={v =>
                                field.onChange(v as RouteLayoutType)
                              }
                              defaultValue={props.route.layoutType}
                            >
                              <FormControl>
                                <SelectTrigger className="border-solid">
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(RouteLayoutType).map(
                                  layoutType => {
                                    return (
                                      <SelectItem
                                        key={layoutType}
                                        value={layoutType}
                                      >
                                        <div className="flex flex-row gap-4">
                                          <span>{layoutType}</span>
                                        </div>
                                      </SelectItem>
                                    )
                                  }
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={
                  form.getValues("layoutType") === props.route.layoutType
                }
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
