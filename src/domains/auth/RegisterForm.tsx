import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { RegisterSchema, type RegisterPayload } from './auth.types'
import { useAuth } from './useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function RegisterForm() {
  const { t } = useTranslation()
  const { handleRegister } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
  })

  async function onSubmit(data: RegisterPayload) {
    try {
      await handleRegister(data, from ?? '/')
    } catch (err) {
      const msg = isAxiosError(err) && err.response?.status === 409
        ? t('auth.emailTaken')
        : t('common.error')
      toast.error(msg)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">{t('auth.registerTitle')}</h1>
      <Input label={t('auth.firstName')} error={errors.firstName?.message} {...register('firstName')} />
      <Input label={t('auth.lastName')} error={errors.lastName?.message} {...register('lastName')} />
      <Input label={t('auth.email')} type="email" error={errors.email?.message} {...register('email')} />
      <Input label={t('auth.password')} type="password" error={errors.password?.message} {...register('password')} />
      <Button type="submit" loading={isSubmitting}>{t('auth.register')}</Button>
      <p className="text-sm text-center">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="text-blue-600 hover:underline">{t('auth.login')}</Link>
      </p>
    </form>
  )
}
