import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  createSnippet,
  getSnippet,
  getSnippets,
} from "@/services/snippet.service";
import type { CreateSnippetType } from "@/types/snippet";
import { errorHandler } from "@/utils";

export function useSnippet() {
  const { SNIPPET_ID } = useParams();
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

  const snippetsQueryMutation = useMutation({
    mutationKey: ["get-snippets"],
    mutationFn: async () => await getSnippets(),
  });

  const snippetQueryMutation = useMutation({
    mutationKey: ["get-snippet", SNIPPET_ID!],
    mutationFn: async () => await getSnippet(SNIPPET_ID!),
  });

  return {
    createSnippetMutation,
    snippetsQueryMutation,
    snippetQueryMutation,
  };
}
