import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title, description }) {
  const pageTitle = title
    ? `${title} | Anant's Analytics Portfolio`
    : "Anant's Data Analytics Portfolio"

  const pageDescription =
    description ||
    'Data analytics portfolio by Anant — sports analytics, machine learning, and interactive visualizations.'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description"    content={pageDescription} />
        <meta name="viewport"       content="width=device-width, initial-scale=1" />
        <meta property="og:title"   content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type"    content="website" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
