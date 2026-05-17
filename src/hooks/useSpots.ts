import { useState, useEffect } from 'react'
import type { Spot } from '../types/spot'
import { loadSpots } from '../data/loader'

interface UseSpotsResult {
  spots: Spot[]
  loading: boolean
  error: string | null
}

export function useSpots(): UseSpotsResult {
  const [spots, setSpots] = useState<Spot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSpots()
      .then(setSpots)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  return { spots, loading, error }
}
