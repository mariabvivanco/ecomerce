import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/Input'
import type { CheckoutData } from './checkout.types'

type Props = { form: UseFormReturn<CheckoutData> }

export function ShippingForm({ form }: Props) {
  const { t } = useTranslation()
  const { register, formState: { errors } } = form

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-semibold text-lg mb-2">{t('checkout.shipping')}</legend>
      <div className="grid grid-cols-2 gap-3">
        <Input label={t('auth.firstName')} error={errors.shipping?.firstName?.message} {...register('shipping.firstName')} />
        <Input label={t('auth.lastName')} error={errors.shipping?.lastName?.message} {...register('shipping.lastName')} />
      </div>
      <Input label={t('checkout.address')} error={errors.shipping?.address?.message} {...register('shipping.address')} />
      <div className="grid grid-cols-2 gap-3">
        <Input label={t('checkout.city')} error={errors.shipping?.city?.message} {...register('shipping.city')} />
        <Input label={t('checkout.postalCode')} error={errors.shipping?.postalCode?.message} {...register('shipping.postalCode')} />
      </div>
      <Input label={t('checkout.phone')} {...register('shipping.phone')} />
    </fieldset>
  )
}
