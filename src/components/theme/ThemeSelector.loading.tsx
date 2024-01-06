import { Loader2Icon } from "lucide-react"

export default function ThemeSelectorLoading() {
  return (
    <button className="theme-trigger">
      <Loader2Icon className="theme-trigger__icon theme-trigger__icon--loading" />
    </button>
  )
}
