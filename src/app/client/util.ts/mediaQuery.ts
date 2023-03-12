export function isMaches(mediaQueryString: string): boolean {
  return !!window.matchMedia(mediaQueryString)?.matches
}
