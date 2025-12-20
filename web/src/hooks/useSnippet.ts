import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  createSnippet,
  deleteSnippet,
  generateSnippet,
  getSnippet,
  getSnippets,
  updateSnippet,
} from "@/services/snippet.service";
import type {
  CreateSnippetType,
  GenerateSnippet,
  SnippetQuery,
} from "@/types/snippet";
import { errorHandler } from "@/utils";

const defaultQuery: SnippetQuery = {
  search: "",
  language: "",
  tag: "",
  page: 1,
  limit: 10,
};

export function useSnippet() {
  const { SNIPPET_ID } = useParams();

  const createSnippetMutation = useMutation({
    mutationKey: ["create-snippet"],
    mutationFn: async (data: CreateSnippetType) => await createSnippet(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
      snippetsQueryMutation.mutate({ limit: 10 });
    },
    onError: errorHandler,
  });

  const snippetsQueryMutation = useMutation({
    mutationKey: ["get-snippets"],
    mutationFn: async (query: SnippetQuery = defaultQuery) =>
      await getSnippets(query),
  });

  const snippetQueryMutation = useMutation({
    mutationKey: ["get-snippet", SNIPPET_ID!],
    mutationFn: async () => await getSnippet(SNIPPET_ID!),
  });

  const deleteSnippetMutation = useMutation({
    mutationKey: ["delete-snippet", SNIPPET_ID!],
    mutationFn: async (ID: string = SNIPPET_ID!) => await deleteSnippet(ID),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
      snippetsQueryMutation.mutate({ limit: 10 });
    },
    onError: errorHandler,
  });

  const updateSnippetMutation = useMutation({
    mutationKey: ["update-snippet", SNIPPET_ID!],
    mutationFn: async (data: CreateSnippetType) =>
      await updateSnippet(SNIPPET_ID!, data),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
      snippetsQueryMutation.mutate({ limit: 10 });
    },
    onError: errorHandler,
  });

  const generateSnippetMutation = useMutation({
    mutationKey: ["generate-snippet"],
    mutationFn: async (data: GenerateSnippet) => await generateSnippet(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
    },
    onError: errorHandler,
  });

  return {
    createSnippetMutation,
    snippetsQueryMutation,
    snippetQueryMutation,
    deleteSnippetMutation,
    updateSnippetMutation,
    generateSnippetMutation,
  };
}
