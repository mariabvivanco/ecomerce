import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/Input'
import type { CheckoutData } from './checkout.types'

type Props = { form: UseFormReturn<CheckoutData> }

export function BillingForm({ form }: Props) {
  const { t } = useTranslation()
  const { register, formState: { errors } } = form

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-semibold text-lg mb-2">{t('checkout.billing')}</legend>
      <div className="grid grid-cols-2 gap-3">
        <Input label={t('auth.firstName')} error={errors.billing?.firstName?.message} {...register('billing.firstName')} />
        <Input label={t('auth.lastName')} error={errors.billing?.lastName?.message} {...register('billing.lastName')} />
      </div>
      <Input label={t('checkout.nif')} error={errors.billing?.nif?.message} {...register('billing.nif')} />
      <Input label={t('auth.email')} type="email" error={errors.billing?.email?.message} {...register('billing.email')} />
      <Input label={t('checkout.address')} error={errors.billing?.address?.message} {...register('billing.address')} />
      <div className="grid grid-cols-2 gap-3">
        <Input label={t('checkout.city')} error={errors.billing?.city?.message} {...register('billing.city')} />
        <Input label={t('checkout.postalCode')} error={errors.billing?.postalCode?.message} {...register('billing.postalCode')} />
      </div>
    </fieldset>
  )
}
