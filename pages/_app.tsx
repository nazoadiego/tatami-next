import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { AnimatePresence, motion } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      {router.route === '/' ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      )}
    </>
  )
}

export default MyApp
