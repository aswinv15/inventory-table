import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.boms[":id"]["$delete"]>;

export const useDeleteBom = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async () => {
      const response = await client.api.boms[":id"]["$delete"]({ 
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Bom deleted");
      queryClient.invalidateQueries({ queryKey: ["bom", { id }] });
      queryClient.invalidateQueries({ queryKey: ["boms"] });
    },
    onError: () => {
      toast.error("Failed to delete bom");
    },
  });

  return mutation;
};
