import { ReactNode } from "react"

import Typography from "@/components/typography/Typography"

import Form from "./form"

async function GuestBookLayout({ children }: { children: ReactNode }) {
  return (
    <main className="guestbook-page">
      <Typography variants="h1" as="h1" colorLevel={12}>
        방명록
      </Typography>
      <div className="guestbook-page__form-container ">
        <Form />
      </div>
      {children}
    </main>
  )
}

export default GuestBookLayout
