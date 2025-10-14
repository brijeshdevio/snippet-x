import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { toast } from "sonner";
import { createSnippet, getSnippets } from "@/api/snippet.api";
import type { CreateSnippetType } from "@/types/snippet";
import { errorHandler } from "./utils";

export function useSnippet() {
  const queryClient = useQueryClient();
  
  const createMutate = useMutation({
    mutationKey: ["cerate-snippet"],
    mutationFn: async (data: CreateSnippetType) => await createSnippet(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
      queryClient.invalidateQueries(["get-snippets"]);
    },
    onError: errorHandler,
  });

  const getSnippetsQuery = useMutation({
    mutationKey: ["get-snippets"],
    mutationFn: async () => await getSnippets(),
  });

  return { createMutate, getSnippetsQuery };
}
