import { apiGet } from './client'

export type StoreCategory = {
  id: string
  name: string
  isActive: boolean
}

export function getAllCategories() {
  return apiGet<StoreCategory[]>('/categories')
}
