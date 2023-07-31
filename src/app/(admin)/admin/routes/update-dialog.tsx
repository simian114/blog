"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Route } from "@prisma/client"
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

import { updateRoute } from "./actions"

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const formSchema = z.object({
  title: z.optional(z.string().min(1).max(20)),
  description: z.optional(z.string().min(1).max(20)),
  open: z.optional(z.boolean()),
  url: z.optional(z.string()),
  priority: z.number(),
})

interface UpdateRouteDialogProps {
  route: Route
}

export function UpdateRouteDialog(props: UpdateRouteDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.route.title,
      description: props.route.description || undefined,
      priority: props.route.priority,
      open: props.route.open,
      url: props.route.title,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateRoute({
      id: props.route.id,
      data: {
        ...values,
        url: `${values.title}`,
      },
    })
    wait().then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>수정</Button>
      </DialogTrigger>
      <DialogContent className="border-solid">
        <DialogHeader>
          <DialogTitle>라우트 수정</DialogTitle>
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
                        <Input
                          className="border-solid"
                          placeholder="Route Description"
                          {...field}
                        />
                      </FormControl>
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
                          onChange={v => {
                            field.onChange(Number(v.target.value))
                          }}
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
