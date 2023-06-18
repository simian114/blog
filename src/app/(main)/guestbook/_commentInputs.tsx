import { SubmitButton } from "./submitButton"

const COMMENT_MAX_LENGTH = 100
const NICKNAME_MAX_LENGTH = 20

export default function CommentInputs() {
  return (
    <>
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
      <SubmitButton />
    </>
  )
}
