import type { Spot } from '../types/spot'

let cache: Spot[] | null = null

export async function loadSpots(): Promise<Spot[]> {
  if (cache) return cache
  const res = await fetch('/data/spots.json')
  if (!res.ok) throw new Error(`Failed to load spots.json: ${res.status}`)
  cache = (await res.json()) as Spot[]
  return cache
}
