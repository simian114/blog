"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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

import { newRoute } from "./actions"

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const formSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(20),
  open: z.boolean(),
  url: z.string(),

  priority: z.number(),
})

export function AddRouteDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: 255,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await newRoute({
      ...values,
      url: `${values.title}`,
      title: values.title || "",
      layouts: {
        create: [],
      },
    })
    wait().then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>추가</Button>
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

                {/* <FormField
                  control={form.control}
                  name="layoutType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Layout type</FormLabel>
                      <Select
                        onValueChange={v =>
                          field.onChange(v as RouteLayoutType)
                        }
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-solid">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(RouteLayoutType).map(layoutType => {
                            return (
                              <SelectItem key={layoutType} value={layoutType}>
                                <div className="flex flex-row gap-4">
                                  <span>{layoutType}</span>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
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
