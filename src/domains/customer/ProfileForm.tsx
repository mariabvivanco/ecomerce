import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ProfileSchema, type ProfileData, type CustomerProfile } from './customer.types'
import { useUpdateCustomer } from './customer.queries'

type Props = { profile: CustomerProfile }

export function ProfileForm({ profile }: Props) {
  const { t } = useTranslation()
  const { mutate, isPending } = useUpdateCustomer()
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-4">
      <Input label={t('auth.firstName')} {...register('firstName')} error={errors.firstName?.message} />
      <Input label={t('auth.lastName')} {...register('lastName')} error={errors.lastName?.message} />
      <Button type="submit" loading={isPending}>{t('common.save')}</Button>
    </form>
  )
}
