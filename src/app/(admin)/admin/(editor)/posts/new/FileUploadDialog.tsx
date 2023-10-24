import { FormEvent, useRef, useState } from "react"
import { PutBlobResult } from "@vercel/blob"
import { upload } from "@vercel/blob/client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FileUploadDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSuccess: (blob: PutBlobResult) => void
  onError?: (error: any) => void
}

export default function FileUploadDialog(props: FileUploadDialogProps) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected")
    }

    const file = inputFileRef.current.files[0]

    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/file/image/upload",
        // handleUploadUrl: "/api/avatar/upload",
      })

      props.onSuccess(newBlob)
    } catch (error: any) {
      props.onError && props.onError(error)
    }
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="border-solid">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            <>
              <form onSubmit={handleUpload}>
                <input
                  name="file"
                  ref={inputFileRef}
                  type="file"
                  required
                  accept="image/gif, image/jpeg, image/png"
                />
                <Button type="submit">Upload</Button>
              </form>
            </>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
