import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetProductflows = () => {
  const query = useQuery({
    queryKey: ['productflows'],
    queryFn: async () => {
      const response = await client.api.productflows.$get();
      console.log(response, 'response');

      if (!response.ok) {
        throw new Error('Failed to fetch productflows');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
