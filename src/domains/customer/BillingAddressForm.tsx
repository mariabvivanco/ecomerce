import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { BillingSchema, type BillingData, type CustomerProfile } from './customer.types'
import { useUpdateCustomer } from './customer.queries'

type Props = { profile: CustomerProfile }

export function BillingAddressForm({ profile }: Props) {
  const { t } = useTranslation()
  const { mutate, isPending } = useUpdateCustomer()
  const b = profile.billingAddress
  const { register, handleSubmit, formState: { errors } } = useForm<BillingData>({
    resolver: zodResolver(BillingSchema),
    defaultValues: {
      firstName: b?.firstName ?? '',
      lastName: b?.lastName ?? '',
      nif: b?.nif ?? '',
      address: b?.address ?? '',
      city: b?.city ?? '',
      postalCode: b?.postalCode ?? '',
      country: b?.country ?? 'ES',
      phone: b?.phone ?? '',
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => mutate({ billing: data }))} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label={t('auth.firstName')} {...register('firstName')} error={errors.firstName?.message} />
        <Input label={t('auth.lastName')} {...register('lastName')} error={errors.lastName?.message} />
      </div>
      <Input label={t('checkout.nif')} {...register('nif')} error={errors.nif?.message} />
      <Input label={t('checkout.address')} {...register('address')} error={errors.address?.message} />
      <div className="grid grid-cols-2 gap-3">
        <Input label={t('checkout.city')} {...register('city')} error={errors.city?.message} />
        <Input label={t('checkout.postalCode')} {...register('postalCode')} error={errors.postalCode?.message} />
      </div>
      <Input label={t('checkout.phone')} {...register('phone')} />
      <Button type="submit" loading={isPending}>{t('common.save')}</Button>
    </form>
  )
}
