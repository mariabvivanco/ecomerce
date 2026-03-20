import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { LoginSchema, type LoginPayload } from './auth.types'
import { useAuth } from './useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function LoginForm() {
  const { t } = useTranslation()
  const { handleLogin } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(data: LoginPayload) {
    try {
      await handleLogin(data)
    } catch {
      toast.error(t('common.error'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">{t('auth.loginTitle')}</h1>
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
