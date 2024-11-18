import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetLoadingunloadinggates = () => {
  const query = useQuery({
    queryKey: ['loadingunloadinggates'],
    queryFn: async () => {
      const response = await client.api.loadingunloadinggates.$get();
      console.log(response, 'response');

      if (!response.ok) {
        throw new Error('Failed to fetch loadingunloadinggates');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
