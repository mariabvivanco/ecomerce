import { useTranslation } from 'react-i18next'
import { useCustomer } from '@/domains/customer/customer.queries'
import { ProfileForm } from '@/domains/customer/ProfileForm'
import { BillingAddressForm } from '@/domains/customer/BillingAddressForm'
import { SavedCards } from '@/domains/customer/SavedCards'
import { Spinner } from '@/components/ui/Spinner'

export function ProfilePage() {
  const { t } = useTranslation()
  const { data: profile, isLoading } = useCustomer()

  if (isLoading) return <Spinner />

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">{t('profile.personalInfo')}</h2>
        {profile && <ProfileForm profile={profile} />}
      </section>
      <section className="border-t pt-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">{t('checkout.billing')}</h2>
        {profile && <BillingAddressForm profile={profile} />}
      </section>
      <section className="border-t pt-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">{t('profile.savedCards')}</h2>
        <SavedCards />
      </section>
    </div>
  )
}
