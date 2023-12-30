/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Component,
  COMPONENT_POSITION,
  ComponentType,
  Prisma,
  ROUTE_TYPE,
} from "@prisma/client"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ROUTE_COMPONENT_LIST } from "@/constants/components"
import {
  getComponentPropTarget,
  isComponentPropsKey,
  makeComponentProps,
} from "@/helpers/components"
import { updateRoute } from "@/helpers/data/route"

interface UpdateRouteComponentDialogProps {
  route: Prisma.RouteGetPayload<{ include: { components: true } }>
  currentRouteID: number
}

const formSchema = z.object({
  components: z.any(),
})

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

export function UpdateRouteComponentDialog(
  props: UpdateRouteComponentDialogProps
) {
  const [open, setOpen] = useState(false)
  const [componentList, setComponentList] = useState<
    (Pick<Component, "type" | "name" | "props" | "position"> & {
      id?: number
    })[]
  >(() => {
    return (
      props.route.components.filter(
        component => component.position === COMPONENT_POSITION.ROUTE
      ) || []
    )
  })

  const LayoutComponentList = ROUTE_COMPONENT_LIST

  const hasSubUrl = !!componentList.find(
    component => component.type === ComponentType.SUB_URL
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values
    const updateList = componentList
      .filter(component => typeof component.id === "number")
      .map(component => {
        const { id = 0, routeId, ...rest } = component as any
        routeId
        return {
          where: { id },
          data: { ...rest, position: COMPONENT_POSITION.ROUTE } as any,
        }
      })
    const deleteList = (
      props.route.components.filter(
        component => component.position === COMPONENT_POSITION.ROUTE
      ) || []
    )
      .filter(
        prevComponent =>
          !componentList.find(
            newComponent => prevComponent.id === newComponent.id
          )
      )
      .map(component => ({ id: component.id }))
    const newList = componentList.filter(
      component => typeof component.id !== "number"
    )

    await updateRoute({
      where: { id: props.currentRouteID },
      data: {
        components: {
          updateMany: updateList,
          deleteMany: deleteList,
          createMany: {
            data: newList as unknown as any,
          },
        },
      },
    })
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
          type: ComponentType.SUB_URL,
          name: "CategorySelector",
          position: COMPONENT_POSITION.ROUTE,
          props: {
            post: "card",
          },
        },
      ])
    } else {
      if (!LayoutComponentList?.length) {
        return
      }
      const componentName = LayoutComponentList[0]

      const props = makeComponentProps({ componentName })
      setComponentList([
        ...componentList,
        {
          type: ComponentType.COMPONENT,
          name: LayoutComponentList[0],
          position: COMPONENT_POSITION.ROUTE,
          props,
        },
      ])
    }
  }

  // NOTE: sub url 타입
  // NOTE: components
  // 순서대로 나올 수 있도록 만들어야함
  function handleAddProp({ targetIndex }: { targetIndex: number }) {
    const targetComponent = componentList[targetIndex] as unknown as Pick<
      Component,
      "type" | "name" | "props" | "position"
    >
    const targetComponentProps = (targetComponent.props || {}) as Record<
      string,
      string
    >
    const beforeComponents = [...componentList]
    targetComponentProps.propKey = "prop value"
    targetComponent.props = targetComponentProps
    beforeComponents[targetIndex] = targetComponent
    setComponentList(beforeComponents)
  }

  function handleChangePropKey({
    targetIndex,
    prevKey,
    newKey,
  }: {
    targetIndex: number
    prevKey: string
    newKey: string
  }) {
    const targetComponent = componentList[targetIndex] as unknown as Pick<
      Component,
      "type" | "name" | "props" | "position"
    >
    const targetComponentProps = (targetComponent.props || {}) as Record<
      string,
      string
    >
    const beforeComponents = [...componentList]
    const value = targetComponentProps[prevKey]
    delete targetComponentProps[prevKey]
    targetComponentProps[newKey] = value
    targetComponent.props = targetComponentProps
    beforeComponents[targetIndex] = targetComponent
    setComponentList(beforeComponents)
  }

  function handleDeleteProp({
    targetIndex,
    key,
  }: {
    targetIndex: number
    key: string
  }) {
    const targetComponent = componentList[targetIndex] as unknown as Pick<
      Component,
      "type" | "name" | "props" | "position"
    >
    const targetComponentProps = (targetComponent.props || {}) as Record<
      string,
      string
    >
    const beforeComponents = [...componentList]
    delete targetComponentProps[key]
    targetComponent.props = targetComponentProps
    beforeComponents[targetIndex] = targetComponent
    setComponentList(beforeComponents)
  }

  function handleChangePropValue({
    targetIndex,
    key,
    value,
  }: {
    targetIndex: number
    key: string
    value: string
  }) {
    const targetComponent = componentList[targetIndex] as unknown as Pick<
      Component,
      "type" | "name" | "props" | "position"
    >
    const targetComponentProps = (targetComponent.props || {}) as Record<
      string,
      string
    >
    const beforeComponents = [...componentList]
    targetComponentProps[key] = value
    targetComponent.props = targetComponentProps
    beforeComponents[targetIndex] = targetComponent
    setComponentList(beforeComponents)
  }

  function handleChangeComponent({
    targetIndex,
    componentName,
    type,
  }: {
    targetIndex: number
    componentName: string
    type: ComponentType
  }) {
    const targetComponent = componentList[targetIndex] as unknown as Pick<
      Component,
      "type" | "name" | "props" | "position"
    >
    const beforeComponents = [...componentList]
    targetComponent.name = componentName
    targetComponent.type = type
    targetComponent.props = makeComponentProps({ componentName })
    beforeComponents[targetIndex] = targetComponent
    setComponentList(beforeComponents)
  }

  // NOTE: targetIndex 는 component 컴포넌트를 의미
  function handleDeleteComponent({ targetIndex }: { targetIndex: number }) {
    setComponentList(prev => prev.filter((_, index) => index !== targetIndex))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={props.route.type !== ROUTE_TYPE.BESPOKE}>
          레이아웃 변경
        </Button>
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
                  <div className="mb-16">
                    {componentList.map((component, targetIndex) => (
                      <FormItem
                        key={targetIndex}
                        className="flex flex-col mt-16"
                      >
                        <Button
                          type="button"
                          design={{ size: "xsmall", color: "secondary" }}
                          onClick={() => handleDeleteComponent({ targetIndex })}
                        >
                          delete component
                        </Button>
                        <FormLabel>
                          {component.name}
                          {component.type === ComponentType.SUB_URL
                            ? "sub url"
                            : "component"}
                        </FormLabel>
                        <div className="flex flex-col gap-2">
                          <Select
                            onValueChange={v => {
                              handleChangeComponent({
                                targetIndex,
                                componentName: v,
                                type: component.type,
                              })
                            }}
                            defaultValue={component.name}
                          >
                            <FormControl>
                              <SelectTrigger className="border-solid">
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* 타입에 따라 다름 */}
                              {component.type === "COMPONENT" ? (
                                <>
                                  {LayoutComponentList?.map(componentName => (
                                    <div
                                      key={componentName}
                                      className={`flex flex-col gap-2 `}
                                    >
                                      <SelectItem value={componentName}>
                                        {componentName}
                                      </SelectItem>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {["CategorySelector"].map(selectorName => (
                                    <SelectItem
                                      key={selectorName}
                                      value={selectorName}
                                    >
                                      {selectorName}
                                    </SelectItem>
                                  ))}
                                </>
                              )}
                            </SelectContent>
                            <div>
                              <Button
                                type="button"
                                onClick={() => handleAddProp({ targetIndex })}
                                className="mt-4"
                              >
                                prop 추가
                              </Button>
                              <span className="mt-2">props</span>
                              {/*  */}
                              {Object.entries(
                                (component.props || {}) as any
                              ).map(([key, value], index) => (
                                <Fragment key={index}>
                                  <div className="flex gap-2 align-middle mt-2">
                                    {isComponentPropsKey({
                                      componentName: component.name,
                                      propKey: key,
                                    }) ? (
                                      <></>
                                    ) : (
                                      <Button
                                        design={{ size: "xsmall" }}
                                        className="mr-4"
                                        onClick={() =>
                                          handleDeleteProp({
                                            targetIndex,
                                            key,
                                          })
                                        }
                                      >
                                        delete
                                      </Button>
                                    )}
                                    <Input
                                      className="border-solid"
                                      placeholder={`prop`}
                                      value={key}
                                      onChange={e =>
                                        handleChangePropKey({
                                          targetIndex,
                                          prevKey: key,
                                          newKey: e.target.value,
                                        })
                                      }
                                    />
                                    :
                                    <Input
                                      className="border-solid"
                                      placeholder={`prop key: ${key}`}
                                      value={value as string}
                                      onChange={e =>
                                        handleChangePropValue({
                                          targetIndex,
                                          key: key,
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  {getComponentPropTarget({
                                    componentName: component.name,
                                    propKey: key,
                                    target: "description",
                                  })}
                                </Fragment>
                              ))}
                            </div>
                          </Select>
                        </div>
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
