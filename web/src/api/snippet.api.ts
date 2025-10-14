import type { CreateSnippetType } from "@/types/snippet";
import { axiosClient } from "./axiosClient";

export const createSnippet = async (data: CreateSnippetType) =>
  (await axiosClient.post("/snippets", data)).data;

export const getSnippets = async () =>
  (await axiosClient.get("/snippets")).data;
