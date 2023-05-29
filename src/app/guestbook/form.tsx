"use client"

import { useRef } from "react"

import Button from "@/components/button/Button"

interface FormProps {
  createGuestBook: (data: FormData) => Promise<void>
}

const COMMENT_MAX_LENGTH = 100
const NICKNAME_MAX_LENGTH = 20

export default function Form(props: FormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  async function handleAction(data: FormData) {
    if (!formRef.current) return
    formRef.current.nickname.value = ""
    formRef.current.comment.value = ""
    await props.createGuestBook(data)
  }

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action={handleAction as any}
      className="guestbook-page__form guest-form"
      ref={formRef}
    >
      <label
        className="guest-form__label guest-form__nickname-container"
        htmlFor="nickname"
      >
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          minLength={1}
          maxLength={NICKNAME_MAX_LENGTH}
          required
        />
      </label>
      <label
        className="guest-form__label guest-form__comment-container"
        htmlFor="comment"
      >
        <input
          type="text"
          name="comment"
          placeholder="방명록"
          minLength={1}
          maxLength={COMMENT_MAX_LENGTH}
          required
        />
      </label>
      <Button
        className="guest-form__btn"
        type="submit"
        design={{ size: "large" }}
        baseDesign={{ fluid: true }}
      >
        전송
      </Button>
    </form>
  )
}
