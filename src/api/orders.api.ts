const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

type ApiResponse<T> = {
  message: string
  data: T
  pagination?: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export type OrderPaymentStatus = 'pending_payment' | 'partially_paid' | 'paid' | 'cancelled'

export type OrderPaymentRecord = {
  id: string
  orderId: string
  amount: number
  currency: string
  status: 'pending' | 'success' | 'failed'
  paystackReference: string
  paystackTransactionId: string
  channel: string
  paidAt: string | null
  failureReason: string
  createdAt: string
}

export type OrderLineItem = {
  id: string
  productId: string
  productName: string
  productImageUrl: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export type Order = {
  id: string
  orderNumber: string
  userId: string
  paymentStatus: OrderPaymentStatus
  fulfillmentStatus: string
  subtotal: number
  serviceFee: number
  totalAmount: number
  amountPaid: number
  balanceDue: number
  fulfillmentMethod: 'pickup' | 'delivery'
  deliveryAddress: string
  notes: string
  createdAt: string
  updatedAt: string
  items?: OrderLineItem[]
  payments?: OrderPaymentRecord[]
}

export type CreateOrderPayload = {
  items: { productId: string; quantity: number }[]
  fulfillmentMethod: 'pickup' | 'delivery'
  deliveryAddress?: string
  notes?: string
}

export type InitiatePaymentResult = {
  payment: {
    id: string
    amount: number
    status: string
    paystackReference: string
  }
  authorizationUrl: string
  accessCode: string
  reference: string
  publicKey: string
  balanceDue: number
}

function getAuthToken() {
  return window.localStorage.getItem('mankind-auth-token')
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  })

  const json = (await response.json()) as ApiResponse<T> | { message?: string }
  if (!response.ok) {
    throw new Error(json.message ?? 'Request failed')
  }

  return (json as ApiResponse<T>).data
}

export async function createOrder(payload: CreateOrderPayload) {
  return request<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getOrders(params?: { page?: number; limit?: number }) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))

  const query = searchParams.toString()
  const token = getAuthToken()
  const response = await fetch(`${API_BASE_URL}/orders${query ? `?${query}` : ''}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  const json = (await response.json()) as ApiResponse<Order[]> | { message?: string }
  if (!response.ok) {
    throw new Error(json.message ?? 'Failed to fetch orders')
  }

  const payload = json as ApiResponse<Order[]>
  return {
    items: payload.data ?? [],
    pagination: payload.pagination,
  }
}

export async function getOrderById(orderId: string) {
  return request<Order>(`/orders/${orderId}`)
}

export async function initiatePayment(
  orderId: string,
  options?: { amount?: number; callbackUrl?: string },
) {
  const body: { amount?: number; callbackUrl?: string } = {}
  if (options?.amount) body.amount = options.amount
  if (options?.callbackUrl) body.callbackUrl = options.callbackUrl

  return request<InitiatePaymentResult>(`/orders/${orderId}/payments/initiate`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function verifyPayment(reference: string) {
  return request<Order>(`/orders/payments/verify/${encodeURIComponent(reference)}`)
}
