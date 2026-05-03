import { apiGet } from './client'

export type DistributorApiDto = {
  id: string
  name: string
  country: string
  city: string
  state: string
  address: string
  phone: string
  email: string
}

export function getAllDistributors() {
  return apiGet<DistributorApiDto[]>('/distributors')
}
