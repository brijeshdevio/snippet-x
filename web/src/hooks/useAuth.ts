import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { toast } from "sonner";
import { login, logout, register } from "@/services/auth.service";
import type { LoginType, RegisterType } from "@/types/auth";
import { errorHandler } from "@/utils";

export function useRegister() {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterType) => await register(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}

export function useLogin() {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginType) => await login(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      window.location.href = "/dashboard";
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}

export function useLogout() {
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await logout(),
    onSuccess: (data: AxiosResponse["data"]) => {
      window.location.href = "/";
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}
