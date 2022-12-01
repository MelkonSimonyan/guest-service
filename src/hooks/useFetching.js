import { useState } from 'react'
import { useLang } from './useLang'

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const getLang = useLang()

  const fetching = async (...args) => {
    try {
      setIsLoading(true)
      await callback(...args)
      setError('')
    } catch (e) {
      setError(getLang('serverError'))
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}