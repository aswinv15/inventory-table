import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetDemandforecast = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["demandforecast", { id }],
    queryFn: async () => {
      const response = await client.api.demandforecasts[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch demandforecast");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
