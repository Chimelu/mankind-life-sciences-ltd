import { useState } from 'react'
import { useAuth } from '../../../app/auth/AuthContext'
import { changePassword, updateProfile } from '../../../api/auth.api'

export function ProfilePage() {
  const { user, updateUser, signOut } = useAuth()
  const [formState, setFormState] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    organization: user?.organization ?? '',
  })
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileMessage, setProfileMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [profileError, setProfileError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const saveProfile = async () => {
    setProfileError('')
    setProfileMessage('')
    setIsSavingProfile(true)
    try {
      const result = await updateProfile({
        fullName: formState.name,
        companyName: formState.organization,
      })
      updateUser({
        name: result.user.fullName,
        email: result.user.email,
        organization: result.user.companyName,
      })
      setProfileMessage('Profile updated successfully.')
    } catch (requestError) {
      setProfileError(requestError instanceof Error ? requestError.message : 'Profile update failed')
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleChangePassword = async () => {
    setPasswordError('')
    setPasswordMessage('')
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.')
      return
    }
    setIsChangingPassword(true)
    try {
      await changePassword({ currentPassword, newPassword })
      setPasswordMessage('Password changed successfully.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (requestError) {
      setPasswordError(requestError instanceof Error ? requestError.message : 'Change password failed')
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-[96rem] px-3 py-8 md:px-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              Account
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
              Profile Information
            </h1>
          </div>
          <button
            onClick={signOut}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Sign out
          </button>
        </div>
      </div>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Name</span>
            <input
              value={formState.name}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, name: event.target.value }))
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input
              value={formState.email}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, email: event.target.value }))
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Organization
          </span>
          <input
            value={formState.organization}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                organization: event.target.value,
              }))
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
          />
        </label>

        <button
          onClick={saveProfile}
          disabled={isSavingProfile}
          className="mt-5 rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white"
        >
          {isSavingProfile ? 'Updating...' : 'Update profile'}
        </button>
        {profileError && <p className="mt-3 text-sm font-medium text-red-600">{profileError}</p>}
        {profileMessage && <p className="mt-3 text-sm font-medium text-emerald-700">{profileMessage}</p>}
      </section>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Current Password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Confirm New Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
          />
        </label>
        <button
          onClick={handleChangePassword}
          disabled={isChangingPassword}
          className="mt-5 rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white"
        >
          {isChangingPassword ? 'Changing...' : 'Change password'}
        </button>
        {passwordError && <p className="mt-3 text-sm font-medium text-red-600">{passwordError}</p>}
        {passwordMessage && <p className="mt-3 text-sm font-medium text-emerald-700">{passwordMessage}</p>}
      </section>
    </section>
  )
}
