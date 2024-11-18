import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.bomcomponents[":id"]["$delete"]>;

export const useDeleteBomcomponent = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async () => {
      const response = await client.api.bomcomponents[":id"]["$delete"]({ 
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Bomcomponent deleted");
      queryClient.invalidateQueries({ queryKey: ["bomcomponent", { id }] });
      queryClient.invalidateQueries({ queryKey: ["bomcomponents"] });
    },
    onError: () => {
      toast.error("Failed to delete bomcomponent");
    },
  });

  return mutation;
};
