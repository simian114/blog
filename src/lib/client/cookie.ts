function getCookie(cookiename: string) {
  // Get name followed by anything except a semicolon
  const cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie)
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
  )
}

function setCookie(name: string, val: string) {
  const value = val

  // 만료기간 param 으로 받기
  // date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000)

  document.cookie = name + "=" + value + "; path=/"
}

export { getCookie, setCookie }
