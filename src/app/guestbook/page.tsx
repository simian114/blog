import { PrismaClient } from "@prisma/client"

import Typography from "@/components/typography/Typography"

import { createGuestBook } from "./actions"
import Form from "./form"

async function getData() {
  const prisma = new PrismaClient()
  const books = await prisma.guestbooks.findMany({
    orderBy: { createdAt: "desc" },
  })

  return books
}

async function GuestBook() {
  const books = await getData()
  return (
    <main className="guestbook-page">
      <Typography variants="h1" as="h1" colorLevel={12}>
        방명록
      </Typography>
      <Form createGuestBook={createGuestBook} />
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
    </main>
  )
}

export default GuestBook
