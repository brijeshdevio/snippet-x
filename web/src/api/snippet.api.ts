import type { CreateSnippetType } from "@/types/snippet";
import { axiosClient } from "./axiosClient";

export const createSnippet = async (data: CreateSnippetType) =>
  (await axiosClient.post("/snippets", data)).data;

export const getSnippets = async () =>
  (await axiosClient.get("/snippets")).data;

export const getSnippet = async (id: string) =>
  (await axiosClient.get(`/snippets/${id}`)).data;

export const deleteSnippet = async (id: string) =>
  (await axiosClient.delete(`/snippets/${id}`)).data;

export const getSnippetStats = async () =>
  (await axiosClient.get("/snippets/stats")).data;
