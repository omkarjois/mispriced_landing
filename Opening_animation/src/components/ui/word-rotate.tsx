import { useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export interface WordRotateItem {
  text?: string
  content?: ReactNode
  className?: string
  duration?: number
}

export interface WordRotateProps {
  words: (string | WordRotateItem)[]
  duration?: number
  startDelay?: number
  loop?: boolean
  motionProps?: MotionProps
  className?: string
  dimAt?: number
}

export function WordRotate({
  words,
  duration = 2500,
  startDelay = 0,
  loop = true,
  motionProps = {
    initial: { opacity: 0, rotateX: 90, y: 8 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
    exit: { opacity: 0, rotateX: -90, y: -8 },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  className,
  dimAt,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(startDelay === 0)

  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true)
      }, startDelay * 1000)
      return () => clearTimeout(startTimer)
    }
    return undefined
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted) return undefined

    const currentItem = words[index]
    const currentDuration =
      currentItem && typeof currentItem === "object" && currentItem.duration
        ? currentItem.duration * 1000
        : duration

    const timer = setTimeout(() => {
      setIndex((prevIndex) => {
        if (prevIndex + 1 >= words.length) {
          return loop ? 0 : prevIndex
        }
        return prevIndex + 1
      })
    }, currentDuration)

    return () => clearTimeout(timer)
  }, [hasStarted, index, words, duration, loop])

  const currentItem = words[index]
  const itemText =
    typeof currentItem === "string"
      ? currentItem
      : currentItem && typeof currentItem === "object"
      ? currentItem.text
      : ""
  const itemContent =
    currentItem && typeof currentItem === "object" && currentItem.content
      ? currentItem.content
      : itemText
  const itemClassName =
    currentItem && typeof currentItem === "object" ? currentItem.className : undefined

  return (
    <div
      className={cn("overflow-hidden py-1 [perspective:800px]", className)}
      style={dimAt ? { animation: `dim-line .8s ease ${dimAt}s forwards` } : undefined}
    >
      {hasStarted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={cn("w-fit whitespace-nowrap", itemClassName)}
            style={{ transformStyle: "preserve-3d" }}
            {...motionProps}
            {...(index === 0 ? { initial: { opacity: 1, rotateX: 0, y: 0 } } : {})}
          >
            {itemContent}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div
          className={cn("w-fit whitespace-nowrap invisible select-none opacity-0", itemClassName)}
          aria-hidden="true"
        >
          {itemContent}
        </div>
      )}
    </div>
  )
}

