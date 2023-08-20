"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Tag, TagColor } from "@prisma/client"
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

const TagColors = [
  TagColor.BLUE,
  TagColor.BROWN,
  TagColor.CRIMSON,
  TagColor.CYAN,
  TagColor.GRAY,
  TagColor.GREEN,
  TagColor.ORANGE,
  TagColor.PINK,
  TagColor.PRIMARY,
  TagColor.PURPLE,
  TagColor.RED,
  TagColor.SECONDARY,
  TagColor.TERTIARY,
  TagColor.YELLOW,
]

const formSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(1).max(20),
  // description: z.string().min(1).max(20).optional(),
  url: z.string().min(1).max(20),
  color: z.enum([
    TagColor.BLUE,
    TagColor.BROWN,
    TagColor.CRIMSON,
    TagColor.CYAN,
    TagColor.GRAY,
    TagColor.GREEN,
    TagColor.ORANGE,
    TagColor.PINK,
    TagColor.PRIMARY,
    TagColor.PURPLE,
    TagColor.RED,
    TagColor.SECONDARY,
    TagColor.TERTIARY,
    TagColor.YELLOW,
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
      color: props.tag?.color || TagColor.PRIMARY,
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
                            field.onChange(v as TagColor)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-solid">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TagColors.map(tagColor => {
                              return (
                                <SelectItem key={tagColor} value={tagColor}>
                                  <div className="flex flex-row gap-4">
                                    <span>{tagColor}</span>
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
