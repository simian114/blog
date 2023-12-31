"use client"

import { Post } from "@prisma/client"

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
import { updatePost } from "@/helpers/actions/post-actions"

interface DeleteRouteDialogProps {
  post: Post
}

export function DeletePostDialog(props: DeleteRouteDialogProps) {
  const isDeleted = !!props.post.deletedAt
  function handleDelete() {
    updatePost({
      where: { id: props.post.id },
      data: { deletedAt: isDeleted ? null : new Date() },
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
              삭제되면 리스트에 노출되지 않습니다.
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
