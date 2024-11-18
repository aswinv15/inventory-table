import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api.cashaccounts)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.cashaccounts)[':id']['$patch']
>['json'];

export const useEditCashaccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      
      const response = await client.api.cashaccounts[':id']['$patch']({
        param: { id },
        json
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Cashaccounts updated');
      queryClient.invalidateQueries({ queryKey: ['cashaccount', { id }] });
      queryClient.invalidateQueries({ queryKey: ['cashaccounts'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Failed to edit cashaccount');
    }
  });

  return mutation;
};
