import { NextResponse } from "next/server"

/**
 * response.header 에 Accept-CH 와 Sec-CH-Perfers-Color-Scheme 를 설정함으로써
 * 클라이언트의 요청에는 유저의 system theme 을 받아오게 된다.
 * 사실 media-query 로 해결해서 의미는 없지만, ...
 * 참고링크: https://web.dev/user-preference-media-features-headers/#complete-list-of-the-client-hints
 */
export function middleware() {
  const response = NextResponse.next({})
  response.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme")

  return response
}
