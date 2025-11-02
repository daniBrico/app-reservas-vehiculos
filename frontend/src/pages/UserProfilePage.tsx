import type { JSX } from 'react'
import ProfileUser from '../components/user/ProfileUser'
export default function UserProfilePage(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <ProfileUser />
    </div>
  )
}
