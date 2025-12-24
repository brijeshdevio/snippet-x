import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { createFolder, getFolders } from "@/services/folder.service";
import type { CreateFolderType } from "@/types/folder";
import { errorHandler } from "@/utils";

export function useFolder() {
  const createFolderMutation = useMutation({
    mutationKey: ["create-folder"],
    mutationFn: async (data: CreateFolderType) => await createFolder(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      const message = data.message;
      toast.success(message);
      getFoldersQuery.refetch();
    },
    onError: errorHandler,
  });

  const getFoldersQuery = useQuery({
    queryKey: ["get-folders"],
    queryFn: async () => await getFolders(),
    enabled: false,
  });

  return { createFolderMutation, getFoldersQuery };
}
