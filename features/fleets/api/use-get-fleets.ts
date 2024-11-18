import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export const useGetFleets = () => {
  const query = useQuery({
    queryKey: ['fleets'],
    queryFn: async () => {
      const response = await client.api.fleetop0s.$get();
      console.log(response, 'response');

      if (!response.ok) {
        throw new Error('Failed to fetch fleets');
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
