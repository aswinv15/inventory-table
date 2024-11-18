import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.shippings.$post>;
type RequestType = InferRequestType<typeof client.api.shippings.$post>["json"];

export const useCreateShipping = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      console.log(`shipping Data: ${JSON.stringify(json)}`);
      const response = await client.api.shippings.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Shipping created");
      queryClient.invalidateQueries({ queryKey: ["shippings"] });
    },
    onError: () => {
      toast.error("Failed to create shipping");
    },
  });

  return mutation;
};
