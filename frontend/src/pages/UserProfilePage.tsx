import type { JSX } from 'react'
import ProfileUser from '../components/ProfileUser'
export default function UserProfilePage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ProfileUser />
    </div>
  )
}