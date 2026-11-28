import { useEffect } from "react"

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | Mr. A`
      : "Mr. A | Game & Web Developer"
  }, [title])
}