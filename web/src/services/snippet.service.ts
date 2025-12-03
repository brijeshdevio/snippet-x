import { axiosClient } from "./axiosClient";
import type { CreateSnippetType } from "@/types/snippet";

export const createSnippet = async (data: CreateSnippetType) =>
  (await axiosClient.post("/snippets", data)).data;

export const getSnippets = async () =>
  (await axiosClient.get("/snippets")).data;

export const getSnippet = async (ID: string) =>
  (await axiosClient.get(`/snippets/${ID}`)).data;

export const deleteSnippet = async (ID: string) =>
  (await axiosClient.delete(`/snippets/${ID}`)).data;
