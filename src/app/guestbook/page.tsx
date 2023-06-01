import { cache } from "react"
import { guestbooks } from "@prisma/client"

import Typography from "@/components/typography/Typography"

const getData = cache(async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guestbook`)
  return (await res.json()) as guestbooks[]
})

async function GuestBook() {
  const books = await getData()
  return (
    <ul className="guestbook-page__comment-container">
      {books.map((book, index) => (
        <li key={index} className="guestbook-page__comment-wrapper">
          <div className="guestbook-page__comment">
            <Typography>{book?.nickname}: </Typography>
            <Typography weight="medium" colorLevel={12}>
              {book.content}
            </Typography>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GuestBook
