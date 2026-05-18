const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

type ApiEnvelope<T> = {
  message: string
  data: T
  pagination?: ProductPagination
}

export type ProductPagination = {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type StoreProductItem = {
  id: string
  name: string
  categoryId: string
  brand?: string
  group?: 'Drugs' | 'Non-Drugs' | 'Laboratory Tests'
  manufacturer?: string
  packSize?: string
  description?: string
  price: number | string
  quantity?: number | string
  imageUrl: string
  category?: {
    id: string
    name: string
  }
}

export type ProductQueryParams = {
  categoryId?: string
  page?: number
  limit?: number
  search?: string
  group?: 'Drugs' | 'Non-Drugs' | 'Laboratory Tests'
  minPrice?: number
  maxPrice?: number
}

export async function getProducts(params: ProductQueryParams = {}) {
  const searchParams = new URLSearchParams()

  if (params.categoryId) searchParams.set('categoryId', params.categoryId)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.search) searchParams.set('search', params.search)
  if (params.group) searchParams.set('group', params.group)
  if (params.minPrice !== undefined) searchParams.set('minPrice', String(params.minPrice))
  if (params.maxPrice !== undefined) searchParams.set('maxPrice', String(params.maxPrice))

  const query = searchParams.toString()
  const response = await fetch(`${API_BASE_URL}/products${query ? `?${query}` : ''}`)
  const json = (await response.json()) as ApiEnvelope<StoreProductItem[]> | { message?: string }

  if (!response.ok) {
    throw new Error(json.message ?? 'Failed to fetch products')
  }

  const payload = json as ApiEnvelope<StoreProductItem[]>

  return {
    items: payload.data ?? [],
    pagination: payload.pagination,
  }
}

export async function getProductById(productId: string) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`)
  const json = (await response.json()) as ApiEnvelope<StoreProductItem> | { message?: string }

  if (!response.ok) {
    throw new Error(json.message ?? 'Failed to fetch product')
  }

  return (json as ApiEnvelope<StoreProductItem>).data
}
