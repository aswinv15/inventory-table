import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetCo2processings = () => {
  const query = useQuery({
    queryKey: ['co2processings'],
    queryFn: async () => {
      const response = await client.api.co2processings.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch co2processings');
      }

      const { data } = await response.json();
      
      return data;
    }
  });

  return query;
};
