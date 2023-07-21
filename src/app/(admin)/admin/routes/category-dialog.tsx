import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
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
  currentRouteID: number
  currentCategories: number[]
  allCategories: Category[]
}

const formSchema = z.object({
  categories: z.array(z.number()),
})

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

export function RouteCategoryDialog(props: RouteCategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: props.currentCategories || [],
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await updateRoute({
      id: props.currentRouteID,
      data: {
        // categories: values.categories || [],
      },
    })
    wait().then(() => setOpen(false))
  }
  props
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>카테고리 추가</Button>
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
                  name="categories"
                  render={() => (
                    <FormItem className="flex flex-col gap-4">
                      <div className="flex flex-col gap-4">
                        <FormLabel>Username</FormLabel>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      </div>
                      {props.allCategories.map(category => (
                        <FormField
                          key={category.id}
                          control={form.control}
                          name="categories"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={category.id}
                                className="flex flex-row gap-4 align-middle"
                              >
                                <FormControl>
                                  <Checkbox
                                    className="bg-white"
                                    checked={field.value?.includes(category.id)}
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
                                <FormLabel className="text-sm font-normal mt-0">
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
