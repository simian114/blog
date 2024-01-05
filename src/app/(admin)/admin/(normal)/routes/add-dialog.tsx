"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Route, ROUTE_TYPE } from "@prisma/client"
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
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea"
import { createRoute, updateRoute } from "@/helpers/data/route"

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const formSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(100),
  open: z.boolean(),
  priority: z.number(),
  type: z.enum([ROUTE_TYPE.CUSTOM, ROUTE_TYPE.BESPOKE]),
})

interface AddRouteDialogProps {
  route?: Route
}

export function AddRouteDialog(props: AddRouteDialogProps) {
  const [open, setOpen] = useState(false)
  const isEditMode = typeof props.route?.id === "number"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.route?.title || "",
      description: props.route?.description || "",
      priority: props.route?.priority ?? 255,
      open: props.route?.open || false,
      type: props.route?.type || ROUTE_TYPE.CUSTOM,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode && props.route?.id) {
      updateRoute({
        where: { id: props.route.id },
        data: { ...values, url: `${values.title}` },
      })
    } else {
      await createRoute({
        data: {
          ...values,
          url: `${values.title}`,
          title: values.title || "",
          components: {
            create: [],
          },
        },
      })
    }
    wait().then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{isEditMode ? "수정" : "추가 "}</Button>
      </DialogTrigger>
      <DialogContent className="border-solid">
        <DialogHeader>
          <DialogTitle>라우트 추가</DialogTitle>
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
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="border-solid"
                          placeholder="Route Title"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        title 에 맞춰 url 이 생성됩니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="border-solid"
                          placeholder="Route Description"
                          {...field}
                        />
                        {/* <Input
                          className="border-solid"
                          placeholder="Route Description"
                          {...field}
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Route type</FormLabel>
                      <Select
                        onValueChange={v => field.onChange(v as ROUTE_TYPE)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-solid">
                            <SelectValue placeholder="Select Route Type. default is CUSTOM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[ROUTE_TYPE.CUSTOM, ROUTE_TYPE.BESPOKE].map(
                            routeType => (
                              <SelectItem key={routeType} value={routeType}>
                                <div className="flex flex-row gap-4">
                                  <span>{routeType}</span>
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="open"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>노출</FormLabel>
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
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>우선순위</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="border-solid"
                          placeholder="Route Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
