import { revalidateTag } from "next/cache"

import Typography from "@/components/typography/Typography"

import CommentInputs from "./_commentInputs"
import CommentList from "./_commentList"
import { createGuestBook } from "./actions"

async function GuestBook() {
  async function handleAction(data: FormData) {
    "use server"
    await createGuestBook(data)
    revalidateTag("/guestbook")
  }

  return (
    <>
      <Typography variants="h1" as="h1" colorLevel={12}>
        방명록
      </Typography>
      <form action={handleAction}>
        <div className="guestbook-page__form-container ">
          <div className="guestbook-page__form guest-form">
            <CommentInputs />
          </div>
        </div>
        {/* @ts-expect-error Async Server Component */}
        <CommentList />
      </form>
    </>
  )
}

export default GuestBook
