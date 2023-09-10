"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { COLOR_TYPE, Tag } from "@prisma/client"
import { z } from "zod"

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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { newTag, updatetag } from "./actions"

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const COLOR_TYPEs = [
  COLOR_TYPE.BLUE,
  COLOR_TYPE.BROWN,
  COLOR_TYPE.CRIMSON,
  COLOR_TYPE.CYAN,
  COLOR_TYPE.GRAY,
  COLOR_TYPE.GREEN,
  COLOR_TYPE.ORANGE,
  COLOR_TYPE.PINK,
  COLOR_TYPE.PRIMARY,
  COLOR_TYPE.PURPLE,
  COLOR_TYPE.RED,
  COLOR_TYPE.SECONDARY,
  COLOR_TYPE.TERTIARY,
  COLOR_TYPE.YELLOW,
]

const formSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(20),
  // description: z.string().min(1).max(20).optional(),
  url: z.string().min(1).max(20),
  color: z.enum([
    COLOR_TYPE.BLUE,
    COLOR_TYPE.BROWN,
    COLOR_TYPE.CRIMSON,
    COLOR_TYPE.CYAN,
    COLOR_TYPE.GRAY,
    COLOR_TYPE.GREEN,
    COLOR_TYPE.ORANGE,
    COLOR_TYPE.PINK,
    COLOR_TYPE.PRIMARY,
    COLOR_TYPE.PURPLE,
    COLOR_TYPE.RED,
    COLOR_TYPE.SECONDARY,
    COLOR_TYPE.TERTIARY,
    COLOR_TYPE.YELLOW,
  ]),
  // color: z.string(),
})

interface AddDialogProps {
  tag?: Tag
}

export function AddDialog(props: AddDialogProps) {
  const [open, setOpen] = useState(false)
  const isEditMode = !!props.tag

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.tag?.title || "",
      description: props.tag?.description || "",
      url: props.tag?.url || "",
      color: props.tag?.color || COLOR_TYPE.PRIMARY,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode && typeof props.tag?.id === "number") {
      await updatetag({ ...values, id: props.tag.id })
    } else {
      await newTag(values)
    }
    wait().then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{isEditMode ? "수정" : "추가"}</Button>
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Tag Title" {...field} />
                      </FormControl>
                      {/* <FormDescription>display name</FormDescription> */}
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
                        <Input placeholder="Tag Description" {...field} />
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
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Tag URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel>route</FormLabel>
                        <Select
                          onValueChange={v => {
                            field.onChange(v as COLOR_TYPE)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-solid">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COLOR_TYPEs.map(COLOR_TYPE => {
                              return (
                                <SelectItem key={COLOR_TYPE} value={COLOR_TYPE}>
                                  <div className="flex flex-row gap-4">
                                    <span>{COLOR_TYPE}</span>
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
                <Button type="submit">submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
