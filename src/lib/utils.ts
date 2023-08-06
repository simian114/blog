import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export function capitalizeFirstLetter(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}
