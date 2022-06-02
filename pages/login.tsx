import { FC, useState } from 'react'

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e, email, password) => {
    e.preventDefault()
    const newLogin = { user: { email: email, password: password } }

    fetch('http://localhost:3000/users/sign_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLogin),
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <form
      className="flex h-[70vh] flex-col items-center justify-center space-y-4"
      onSubmit={(e) => handleSubmit(e, email, password)}
    >
      <h2 className="text-2xl">Login</h2>
      <label>Email</label>
      <input
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        className="text-black"
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        className="text-black"
      />
      <input type="submit" className="rounded-lg bg-yellow-400 px-6 py-4" />
    </form>
  )
}

export default LoginPage
