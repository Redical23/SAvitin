"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
}

interface ScrollState {
  isVisible: boolean
  isScrollingDown: boolean
  scrollProgress: number
  parallaxOffset: number
  floatOffset: number
  dampedScrollY: number // Added damped scroll for slow-motion effect
  scrollVelocity: number // Track scroll velocity for momentum
}

let lastScrollY = 0
let dampedScrollY = 0
let scrollVelocity = 0

export function useScrollAnimation(
  options: ScrollAnimationOptions = {},
): ScrollState & { ref: React.RefObject<HTMLElement> } {
  const { threshold = 0.1, rootMargin = "0px" } = options
  const ref = useRef<HTMLElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const [state, setState] = useState<ScrollState>({
    isVisible: false,
    isScrollingDown: true,
    scrollProgress: 0,
    parallaxOffset: 0,
    floatOffset: 0,
    dampedScrollY: 0,
    scrollVelocity: 0,
  })

  useEffect(() => {
    const updateDampedScroll = () => {
      const dampingFactor = 0.15 // Lower = slower, more smooth (0.15 is slow-motion feel)
      const delta = lastScrollY - dampedScrollY
      dampedScrollY += delta * dampingFactor
      scrollVelocity = delta * dampingFactor

      const currentScrollY = lastScrollY
      const scrollProgress = Math.min(
        (currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
        100,
      )

      // Use damped scroll for parallax (gives slow-motion effect)
      const parallaxOffset = dampedScrollY * 0.3 // Slower parallax based on damped scroll
      const floatOffset = Math.sin(dampedScrollY * 0.008) * 25 // Smooth floating

      setState((prev) => ({
        ...prev,
        isScrollingDown: currentScrollY > lastScrollY,
        scrollProgress,
        parallaxOffset,
        floatOffset,
        dampedScrollY: Math.round(dampedScrollY),
        scrollVelocity: Math.round(scrollVelocity),
      }))

      animationFrameRef.current = requestAnimationFrame(updateDampedScroll)
    }

    const handleScroll = () => {
      lastScrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    animationFrameRef.current = requestAnimationFrame(updateDampedScroll)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState((prev) => ({ ...prev, isVisible: true }))
        } else {
          setState((prev) => ({ ...prev, isVisible: false }))
        }
      },
      { threshold, rootMargin },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [threshold, rootMargin])

  return { ref, ...state }
}
