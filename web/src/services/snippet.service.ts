import { axiosClient } from "./axiosClient";
import type {
  CreateSnippetType,
  GenerateSnippet,
  SnippetQuery,
} from "@/types/snippet";

export const createSnippet = async (data: CreateSnippetType) =>
  (await axiosClient.post("/snippets", data)).data;

export const getSnippets = async (query?: SnippetQuery) =>
  (
    await axiosClient.get("/snippets", {
      params: query,
    })
  ).data;

export const getSnippet = async (ID: string) =>
  (await axiosClient.get(`/snippets/${ID}`)).data;

export const deleteSnippet = async (ID: string) =>
  (await axiosClient.delete(`/snippets/${ID}`)).data;

export const updateSnippet = async (ID: string, data: CreateSnippetType) =>
  (await axiosClient.put(`/snippets/${ID}`, data)).data;

export const generateSnippet = async (data: GenerateSnippet) =>
  (await axiosClient.post(`/ai/generate`, data)).data;
