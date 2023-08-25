import { guestbooks } from "@prisma/client"

import Typography from "@/components/typography/Typography"

import PendingSkeleton from "./_pendingSkeleton"

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guestbook`)
  const data = await res.json()

  return data
}

export default async function CommentList() {
  const comments = (await getData()) as guestbooks[]

  return (
    <>
      <ul className="guestbook-page__comment-container">
        <PendingSkeleton />
        {comments.map((comment, index) => (
          <li key={index} className="guestbook-page__comment-wrapper">
            <div className="guestbook-page__comment">
              <Typography>{comment?.nickname}: </Typography>
              <Typography weight="medium" colorLevel={12}>
                {comment.content}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
