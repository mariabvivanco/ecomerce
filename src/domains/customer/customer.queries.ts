import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import * as customerService from './customer.service'
import type { UpdateProfileData } from './customer.types'

export const customerKeys = {
  all: ['customer'] as const,
  profile: () => ['customer', 'profile'] as const,
}

export function useCustomer() {
  return useQuery({
    queryKey: customerKeys.profile(),
    queryFn: customerService.getProfile,
  })
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (data: UpdateProfileData) => customerService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.profile() })
      toast.success(t('profile.saved'))
    },
    onError: () => {
      toast.error(t('common.error'))
    },
  })
}
