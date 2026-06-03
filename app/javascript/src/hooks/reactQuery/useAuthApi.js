import { useMutation } from "@tanstack/react-query";
import authApi from "apis/auth";

export const useSignup = () =>
  useMutation({
    mutationFn: ({
      name,
      email,
      password,
      passwordConfirmation,
      organization,
    }) =>
      authApi.signup({
        name,
        email,
        password,
        passwordConfirmation,
        organization,
      }),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }) =>
      authApi.login({
        email,
        password,
      }),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => authApi.logout(),
  });
