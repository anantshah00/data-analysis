import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  // Activate scroll-reveal animation for all [data-animate] elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    // Re-query on each route change (pageProps change triggers re-render → useEffect re-runs)
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))
    }, 50)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [pageProps])

  return (
    <Layout title={pageProps.title} description={pageProps.description}>
      <Component {...pageProps} />
    </Layout>
  )
}
