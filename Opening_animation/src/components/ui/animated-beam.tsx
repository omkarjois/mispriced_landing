import { useEffect, useId, useState, useRef, type RefObject } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  fromSide?: "left" | "right" | "center"
  toSide?: "left" | "right" | "center"
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  repeat?: number
  repeatDelay?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  fromSide = "center",
  toSide = "center",
  curvature = 0,
  reverse = false,
  duration = 2,
  delay = 0,
  pathColor = "rgba(255, 255, 255, 0.15)",
  pathWidth = 2,
  pathOpacity = 0.25,
  gradientStartColor = "#ffffff",
  gradientStopColor = "#38bdf8",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const animFrameRef = useRef<number | null>(null)

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height

        if (svgWidth > 0 && svgHeight > 0) {
          setSvgDimensions((prev) =>
            prev.width === svgWidth && prev.height === svgHeight
              ? prev
              : { width: svgWidth, height: svgHeight }
          )
        }

        let startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        if (fromSide === "right") {
          startX = rectA.right - containerRect.left + startXOffset
        } else if (fromSide === "left") {
          startX = rectA.left - containerRect.left + startXOffset
        }
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset

        let endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        if (toSide === "left") {
          endX = rectB.left - containerRect.left + endXOffset
        } else if (toSide === "right") {
          endX = rectB.right - containerRect.left + endXOffset
        }
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        const midX = (startX + endX) / 2
        const controlY = ((startY + endY) / 2) - curvature
        const d = `M ${startX},${startY} Q ${midX},${controlY} ${endX},${endY}`
        setPathD(d)
      }
    }

    // Run animation frame tracking continuously to track moving Framer Motion elements
    let isMounted = true
    const loop = () => {
      if (!isMounted) return
      updatePath()
      animFrameRef.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      isMounted = false
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    fromSide,
    toSide,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width || "100%"}
      height={svgDimensions.height || "100%"}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 transform-gpu overflow-visible",
        className
      )}
      viewBox={
        svgDimensions.width && svgDimensions.height
          ? `0 0 ${svgDimensions.width} ${svgDimensions.height}`
          : undefined
      }
    >
      {/* Background static path glow */}
      {pathD && (
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
        />
      )}
      {/* Dynamic beam highlight moving along the path */}
      {pathD && (
        <path
          d={pathD}
          strokeWidth={pathWidth + 0.5}
          stroke={`url(#${id})`}
          strokeOpacity="1"
          strokeLinecap="round"
        />
      )}
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: "easeInOut",
            repeat,
            repeatDelay,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} stopOpacity="0.95" />
          <stop offset="35%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  )
}

