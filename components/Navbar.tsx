import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC } from 'react'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <ul className="mt-10 flex gap-10 text-3xl">
      <motion.li
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ delay: 1.4 }}
      >
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </motion.li>
      <motion.li
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ delay: 1.8 }}
      >
        <Link href="/login">
          <a href="#">Sign In</a>
        </Link>
      </motion.li>
    </ul>
  )
}

export default Navbar
