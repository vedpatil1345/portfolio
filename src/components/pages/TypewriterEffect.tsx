import { useEffect, useState, useCallback } from "react"

const words = ["Web Developer", "Python Developer", "Gen-AI Enthusiast"]
const TYPING_SPEED = 150
const DELETING_SPEED = 100
const PAUSE_TIME = 2000

export const TypewriterEffect = () => {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [delta, setDelta] = useState(TYPING_SPEED)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1))
      setDelta(DELETING_SPEED)
    } else {
      setText(currentWord.substring(0, text.length + 1))
      setDelta(TYPING_SPEED)
    }

    if (!isDeleting && text === currentWord) {
      setTimeout(() => setIsDeleting(true), PAUSE_TIME)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    }

  }, [isDeleting, wordIndex, text])

  useEffect(() => {
    const timeout = setTimeout(tick, delta)
    return () => clearTimeout(timeout)
  }, [delta, tick])

  return (
    <span className="text-indigo-600 dark:text-indigo-400 font-bold" aria-label={`I am a ${text}`}>
      {text}
      <span className="animate-pulse" aria-hidden="true">
        |
      </span>
    </span>
  )

}
