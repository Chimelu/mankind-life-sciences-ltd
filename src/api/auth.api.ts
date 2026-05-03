import { apiPost } from './client'

type AuthUser = {
  id: string
  fullName: string
  email: string
  companyName: string
  cac: string
  address: string
}

type RegisterPayload = {
  fullName: string
  companyName: string
  cac: string
  address: string
  email: string
  password: string
}

type LoginPayload = {
  email: string
  password: string
}

export async function registerUser(payload: RegisterPayload) {
  return apiPost<{ user: AuthUser; otpRequired: boolean }, RegisterPayload>(
    '/auth/register',
    payload,
  )
}

export async function loginUser(payload: LoginPayload) {
  return apiPost<{ user: AuthUser; token: string | null; otpRequired?: boolean }, LoginPayload>(
    '/auth/login',
    payload,
  )
}

export async function sendRegistrationOtp(email: string) {
  return apiPost<{ email: string; expiresInMinutes: number }, { email: string }>(
    '/auth/send-registration-otp',
    { email },
  )
}

export async function verifyRegistrationOtp(payload: { email: string; otp: string }) {
  return apiPost<{ user: AuthUser; verified: boolean }, { email: string; otp: string }>(
    '/auth/verify-registration-otp',
    payload,
  )
}

export async function sendPasswordResetOtp(email: string) {
  return apiPost<{ email: string; expiresInMinutes: number }, { email: string }>(
    '/auth/send-password-reset-otp',
    { email },
  )
}

export async function verifyPasswordResetOtp(payload: { email: string; otp: string }) {
  return apiPost<{ verified: boolean }, { email: string; otp: string }>(
    '/auth/verify-password-reset-otp',
    payload,
  )
}

export async function resetPassword(payload: {
  email: string
  otp: string
  newPassword: string
}) {
  return apiPost<{ updated: boolean }, { email: string; otp: string; newPassword: string }>(
    '/auth/reset-password',
    payload,
  )
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

async function apiPutWithAuth<TResponse, TBody>(path: string, body: TBody) {
  const token = window.localStorage.getItem('mankind-auth-token')
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

  const json = (await response.json()) as { data?: TResponse; message?: string }
  if (!response.ok) {
    throw new Error(json.message ?? 'Request failed')
  }
  return json.data as TResponse
}

export async function updateProfile(payload: {
  fullName: string
  companyName: string
}) {
  return apiPutWithAuth<{ user: AuthUser }, { fullName: string; companyName: string }>(
    '/auth/profile',
    payload,
  )
}

export async function changePassword(payload: {
  currentPassword: string
  newPassword: string
}) {
  return apiPutWithAuth<{ updated: boolean }, { currentPassword: string; newPassword: string }>(
    '/auth/change-password',
    payload,
  )
}
