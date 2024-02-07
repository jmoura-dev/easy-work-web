import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h2>Home page</h2>
      <Link href="/signUp">SignUp</Link>
    </div>
  )
}
