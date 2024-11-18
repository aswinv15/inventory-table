import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const useGetPeriodgroups = () => {
  const query = useQuery({
    queryKey: ['periodgroups'],
    queryFn: async () => {
      const response = await client.api.periodgroups.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch periodgroups');
      }

      const { data } = await response.json();
      
      return data;
    }
  });

  return query;
};
