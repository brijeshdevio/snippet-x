import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { toast } from "sonner";
import { createSnippet } from "@/services/snippet.service";
import type { CreateSnippetType } from "@/types/snippet";
import { errorHandler } from "@/utils";

export function useSnippet() {
  const queryClient = useQueryClient();

  const createSnippetMutation = useMutation({
    mutationKey: ["create-snippet"],
    mutationFn: async (data: CreateSnippetType) => await createSnippet(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-snippets"] });
    },
    onError: errorHandler,
  });

  return {
    createSnippetMutation,
  };
}
