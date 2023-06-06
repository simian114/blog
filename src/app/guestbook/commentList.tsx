import { PrismaClient } from "@prisma/client"

import Typography from "@/components/typography/Typography"

const prisma = new PrismaClient()

const getData = async () => {
  const books = await prisma.guestbooks.findMany({
    orderBy: { createdAt: "desc" },
  })
  return books
}

export default async function CommentList() {
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
