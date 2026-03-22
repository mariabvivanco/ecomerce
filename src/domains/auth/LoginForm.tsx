import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { LoginSchema, type LoginPayload } from './auth.types'
import { useAuth } from './useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function LoginForm() {
  const { t } = useTranslation()
  const { handleLogin } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(data: LoginPayload) {
    try {
      await handleLogin(data, from ?? '/')
    } catch (err) {
      const msg = isAxiosError(err) && err.response?.status === 401
        ? t('auth.invalidCredentials')
        : t('common.error')
      toast.error(msg)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">{t('auth.loginTitle')}</h1>
      {from === '/checkout' && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          {t('auth.loginRequired')}
        </p>
      )}
      <Input label={t('auth.email')} type="email" error={errors.email?.message} {...register('email')} />
      <Input label={t('auth.password')} type="password" error={errors.password?.message} {...register('password')} />
      <Button type="submit" loading={isSubmitting}>{t('auth.login')}</Button>
      <p className="text-sm text-center">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="text-blue-600 hover:underline">{t('auth.register')}</Link>
      </p>
    </form>
  )
}
