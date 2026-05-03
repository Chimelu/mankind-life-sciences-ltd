const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

type ApiResponse<T> = {
  message: string
  data: T
}

function getAuthToken() {
  return window.localStorage.getItem('mankind-auth-token')
}

async function request<T>(path: string, init?: RequestInit) {
  const token = getAuthToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...(init?.headers ?? {}),
    },
  })
  const json = (await response.json()) as ApiResponse<T> | { message?: string }
  if (!response.ok) {
    throw new Error(json.message ?? 'Request failed')
  }
  return (json as ApiResponse<T>).data
}

export function getFavouriteIds() {
  return request<number[]>('/favourites')
}

export function addFavourite(productId: number) {
  return request<number[]>('/favourites', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  })
}

export function removeFavourite(productId: number) {
  return request<number[]>(`/favourites/${productId}`, {
    method: 'DELETE',
  })
}
