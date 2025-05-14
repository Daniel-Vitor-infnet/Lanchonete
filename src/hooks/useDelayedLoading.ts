import { useState, useEffect } from 'react'


export function useDelayedLoading(isLoading: boolean, delayMs = 5000) {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), delayMs)
    } else {
      setShowLoading(false)
    }
    return () => clearTimeout(timer)
  }, [isLoading, delayMs])

  return showLoading
}