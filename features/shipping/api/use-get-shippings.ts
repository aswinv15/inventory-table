import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetShippings = () => {
  const query = useQuery({
    queryKey: ['shippings'],
    queryFn: async () => {
      const response = await client.api.shippings.$get();
      console.log(response, 'response');

      if (!response.ok) {
        throw new Error('Failed to fetch shippings');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
