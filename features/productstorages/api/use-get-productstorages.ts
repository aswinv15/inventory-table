import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetProductstorages = () => {
  const query = useQuery({
    queryKey: ['productstorages'],
    queryFn: async () => {
      const response = await client.api.productstorages.$get();
      console.log(response, 'response');

      if (!response.ok) {
        throw new Error('Failed to fetch productstorages');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
