import { updateProfile } from '@/api/userApi'
import type { IUserInput, UpdateProfileFormData } from '@/types/types'
import { useState } from 'react'

interface useUpdateProfile {
  profileUpdated: IUserInput | null
  error: string | null
  loading: boolean
  updateProfileInfo: (formData: UpdateProfileFormData) => Promise<void>
}

const useUpdateProfile = (): useUpdateProfile => {
  const [profileUpdated, setProfileUpdated] = useState<IUserInput | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfileInfo = async (
    formData: UpdateProfileFormData
  ): Promise<void> => {
    setLoading(true)

    try {
      setTimeout(async () => {
        const data = await updateProfile(formData)

        setProfileUpdated(data.userProfileInfo)
        setLoading(false)
      }, 3000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido al actualizar los datos del usuario.')
      }
    }
  }

  return { profileUpdated, loading, error, updateProfileInfo }
}

export default useUpdateProfile
