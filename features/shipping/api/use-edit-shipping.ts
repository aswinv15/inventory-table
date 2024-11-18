import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  typeof client.api.shippings[':id']['$patch']
>;
type RequestType = InferRequestType<
  typeof client.api.shippings[':id']['$patch']
>['json'];

export const useEditShipping = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log('edit shipping form', json);
      const response = await client.api.shippings[':id']['$patch']({
        param: { id },
        json
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Shippings updated');
      queryClient.invalidateQueries({ queryKey: ['shipping', { id }] });
      queryClient.invalidateQueries({ queryKey: ['shippings'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Failed to edit shipping');
    }
  });

  return mutation;
};
