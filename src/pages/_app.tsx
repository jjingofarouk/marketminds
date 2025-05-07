import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import Header from 'components/Header'
import { useEffect } from 'react'
import { useThemeStore } from 'store/useThemeStore'

function MyApp({ Component, pageProps }: AppProps) {
  const { isDark } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
