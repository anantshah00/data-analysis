import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to every element with [data-animate].
 * When an element enters the viewport, the "visible" class is added,
 * triggering the CSS fade-up transition defined in globals.css.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Stop watching once animated — no need to toggle
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
