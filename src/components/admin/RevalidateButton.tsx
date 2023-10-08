"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import Button from "../button/Button"

const formSchema = z.object({
  path: z.string().optional(),
  type: z.enum(["layout", "page"]).optional(),
  tag: z.string().optional(),
})

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { wait } from "@/lib/utils"

export default function RevalidateButton() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const path = values.path
    const tag = values.tag
    const type = values.type
    const params = new URLSearchParams()
    if (path) {
      params.append("path", path)
    }
    if (tag) {
      params.append("tag", tag)
    }
    if (type) {
      params.append("type", type)
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/revalidate?${params.toString()}`
      // {
      //   next: { tags: [`/api/post`, "simple-post-list"] },
      // }
    )
    const d = await res.json()
    if (d.revalidated) {
      alert("success")
    } else {
      alert("failed")
    }
    wait(100).then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Revalidate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="path"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Path</FormLabel>
                      <FormControl>
                        <Input placeholder="Path" {...field} />
                      </FormControl>
                      {/* <FormDescription>display name</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>type</FormLabel>
                      <FormControl>
                        <Input placeholder="Tag Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Tag URL" {...field} />
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
