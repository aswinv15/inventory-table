import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetOrderingrules = () => {
  const query = useQuery({
    queryKey: ['orderingrules'],
    queryFn: async () => {
      const response = await client.api.orderingrules.$get();
      console.log(response, 'response');

      if (!response.ok) {
        throw new Error('Failed to fetch orderingrules');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
