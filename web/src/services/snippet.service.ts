import { axiosClient } from "./axiosClient";
import type { CreateSnippetType } from "@/types/snippet";

export const createSnippet = async (data: CreateSnippetType) =>
  (await axiosClient.post("/snippets", data)).data;

