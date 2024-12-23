import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.boms.$post>;
type RequestType = InferRequestType<typeof client.api.boms.$post>["json"];

export const useCreateBom = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.boms.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Bom created");
      queryClient.invalidateQueries({ queryKey: ["boms"] });
    },
    onError: () => {
      toast.error("Failed to create bom");
    },
  });

  return mutation;
};
