import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetMilkruns = () => {
  const query = useQuery({
    queryKey: ['milkruns'],
    queryFn: async () => {
      const response = await client.api.milkruns.$get();
      console.log(response, 'response');

      if (!response.ok) {
        throw new Error('Failed to fetch milkruns');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
