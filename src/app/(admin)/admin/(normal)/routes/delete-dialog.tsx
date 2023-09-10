"use client"

import { Route } from "@prisma/client"

import Button from "@/components/button/Button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { updateRoute } from "./actions"

interface DeleteRouteDialogProps {
  route: Route
}

export function DeleteRouteDialog(props: DeleteRouteDialogProps) {
  const isDeleted = !!props.route.deletedAt
  function handleDelete() {
    updateRoute({
      id: props.route.id,
      data: {
        deletedAt: isDeleted ? null : new Date(),
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{isDeleted ? "복구" : "삭제"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-solid">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isDeleted ? "복구 하시겠습니까?" : "정말 삭제하시겠습니까?"}
          </AlertDialogTitle>
          {!isDeleted && (
            <AlertDialogDescription>
              삭제되면 헤더에 나타나지 않습니다. 언제든 되돌릴 수 있습니다.
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button design={{ type: "secondary" }}>취소</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDelete}>
              {isDeleted ? "복구" : "삭제"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
