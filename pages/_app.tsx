import { AppProps } from 'next/app'
import '../styles/index.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('UHVHKTPD', {
      includedDomains: ['https://rosnovskyus.vercel.app']
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])
  return <Component {...pageProps} />
}
