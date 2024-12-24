import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetProductstorage = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["productstorage", { id }],
    queryFn: async () => {
      const response = await client.api.productstorages[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch productstorage");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};