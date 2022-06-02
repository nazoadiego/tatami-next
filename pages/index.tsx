import { motion } from 'framer-motion'
import { FC } from 'react'
import Navbar from '../components/Navbar'

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.8, 1.8, 1, 1],
          rotate: [0, 0, 270, 270, 0],
        }}
        transition={{ duration: 1.4 }}
        className="grid grid-cols-3 grid-rows-3"
      >
        <motion.div className="row-span-2 border border-black bg-yellow-400 p-12"></motion.div>
        <motion.div className="col-span-2 border border-black bg-red-500 p-12"></motion.div>
        <motion.div className="border border-black bg-white p-12"></motion.div>
        <motion.div className="row-span-2 border border-black bg-yellow-400 p-12"></motion.div>
        <motion.div className="col-span-2 border border-black bg-red-500 p-12"></motion.div>
      </motion.div>
      <motion.h1
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-6xl"
      >
        Tatami
      </motion.h1>
      <Navbar />
      {/* <div className="grid grid-cols-3">
        <motion.div
          initial={{ paddingTop: '0', paddingLeft: '0' }}
          animate={{ paddingTop: '16rem', paddingLeft: '16rem', x: '0rem' }}
          transition={{ duration: 1 }}
          className="relative col-start-2 border-8 border-black bg-sky-400"
        >
          <motion.div
            className="absolute -top-9 left-0 right-0 ml-auto mr-auto w-4 rounded-tl-3xl border-2 border-black bg-yellow-400
          "
            initial={{ paddingBottom: '0', paddingLeft: '0' }}
            animate={{ paddingBottom: '2rem', paddingLeft: '2rem' }}
            exit={{ paddingBottom: '0', paddingLeft: '0' }}
            transition={{ delay: 1 }}
          ></motion.div>
        </motion.div>
        <motion.div
          initial={{ paddingTop: '0', paddingLeft: '0' }}
          animate={{ paddingTop: '16rem', paddingLeft: '16rem', x: '10rem' }}
          transition={{ duration: 1, delay: 1 }}
          className="relative row-start-2 border-8 border-black bg-sky-400"
        ></motion.div>
        <motion.div
          initial={{ paddingTop: '0', paddingLeft: '0' }}
          animate={{ paddingTop: '16rem', paddingLeft: '16rem', x: '5rem' }}
          transition={{ duration: 1, delay: 1 }}
          className="relative row-start-3 border-8 border-black bg-sky-400"
        ></motion.div>
      </div> */}
    </div>
  )
}

export default HomePage
