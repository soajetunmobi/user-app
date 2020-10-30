import { useCallback, useEffect, useState } from 'react'
import { userService } from 'service'
import { useUserContext } from 'providers'

interface IFetchUser {
  user: User | undefined
  isLoading: boolean
  error: string | undefined
}

export const useFetchUser = (): IFetchUser => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [fetchedUser, setFetchedUser] = useState<User>()
  const { user, setUser } = useUserContext()

  const fetchUserHandler = useCallback(async () => {
    setError(undefined)
    setIsLoading(true)
    try {
      if (!user) {
        const response = await userService.getByEmail('')
        setFetchedUser(response)
        if (response) {
          setUser(response)
        }
      }
    } catch (err) {
      setError(err)
    }
    setIsLoading(false)
  }, [setIsLoading, setError])

  useEffect(() => {
    fetchUserHandler()
  }, [fetchUserHandler])

  return { user: fetchedUser, isLoading, error }
}
