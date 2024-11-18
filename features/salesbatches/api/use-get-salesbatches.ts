import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetSalesbatches = () => {
  const query = useQuery({
    queryKey: ['salesbatches'],
    queryFn: async () => {
      const response = await client.api.salesbatches.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch salesbatches');
      }

      const { data } = await response.json();
      
      return data;
    }
  });

  return query;
};
