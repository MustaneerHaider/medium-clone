import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'

const progressBar = new ProgressBar({
  size: 4,
  delay: 100,
  color: '#000',
  className: 'z-50',
})

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

Router.events.on('routeChangeStart', progressBar.start)
Router.events.on('routeChangeComplete', progressBar.finish)
Router.events.on('routeChangeError', progressBar.finish)

export default MyApp
