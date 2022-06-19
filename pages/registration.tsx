import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, FormEvent, useState } from 'react'

interface RegistrationPageProps {}

const RegistrationPage: FC<RegistrationPageProps> = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newUser = {
      user: {
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      },
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    }).then((res) => {
      console.log(res)
      router.back()
    })
    // .catch((err) => {
    //   console.log(err)
    //   setError(err.message)
    // })
  }

  return (
    <form
      className="flex h-[70vh] flex-col items-center justify-center space-y-4 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-2xl">Register</h2>
      <label>Email</label>
      <input
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
      <input type="submit" className="rounded-lg bg-yellow-400 px-6 py-4" />
      <Link href="/login">
        <a>Sign Up</a>
      </Link>
    </form>
  )
}

export default RegistrationPage
