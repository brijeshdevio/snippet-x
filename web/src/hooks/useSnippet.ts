import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { toast } from "sonner";
import {
  createSnippet,
  deleteSnippet,
  getSnippet,
  getSnippets,
} from "@/api/snippet.api";
import type { CreateSnippetType } from "@/types/snippet";
import { errorHandler } from "./utils";
import { useParams } from "react-router-dom";

export function useSnippet() {
  const queryClient = useQueryClient();
  const { snippetId } = useParams();

  const createMutate = useMutation({
    mutationKey: ["cerate-snippet"],
    mutationFn: async (data: CreateSnippetType) => await createSnippet(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-snippets"] });
    },
    onError: errorHandler,
  });

  const getSnippetsQuery = useQuery({
    queryKey: ["get-snippets"],
    queryFn: async () => await getSnippets(),
  });

  const getSnippetMutate = useMutation({
    mutationKey: ["get-snippet", snippetId!],
    mutationFn: async (id: string) => await getSnippet(id),
  });

  const deleteSnippetMutate = useMutation({
    mutationKey: ["get-snippet", snippetId!],
    mutationFn: async (id: string) => await deleteSnippet(id),
    onSuccess: (data: AxiosResponse["data"]) => {
      console.log(data);
      const message = data.message;
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-snippets"] });
    },
    onError: errorHandler,
  });

  return {
    createMutate,
    getSnippetsQuery,
    getSnippetMutate,
    deleteSnippetMutate,
  };
}
