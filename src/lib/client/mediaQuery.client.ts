export function isMachesMediaQuery(mediaQueryString: string): boolean {
  return !!window.matchMedia(mediaQueryString)?.matches
}
