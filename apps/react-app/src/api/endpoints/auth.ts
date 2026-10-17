import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "../axios";
import { AuthResponse, LoginPayload, RegisterPayload } from "../../types";

export const createUser = async ({
  newUser,
  onSuccess,
  onError,
  onLoading,
}: {
  newUser: RegisterPayload;
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axiosInstance({
    method: "post",
    url: `/auth/register`,
    data: newUser,
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 201) {
        if (data.accessToken) localStorage.setItem("apiToken", data.accessToken);
        onSuccess && onSuccess(data);
      }
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const login = async ({
  user,
  onSuccess,
  onError,
  onLoading,
}: {
  user: LoginPayload;
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axiosInstance({
    method: "post",
    url: `/auth/login`,
    data: user,
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 200) {
        if (!data.accessToken) {
          onError && onError(new Error("Login response did not include an access token"));
          return;
        }

        localStorage.setItem("apiToken", data.accessToken);
        onSuccess && onSuccess(data);
      }
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const logout = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axiosInstance({
    url: `/auth/logout`,
    method: "post",
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 200) {
        localStorage.removeItem("apiToken");
        onSuccess && onSuccess(data);
      }
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const refreshToken = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axiosInstance({
    url: `/auth/refresh`,
    method: "post",
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 200) {
        if (data.accessToken) localStorage.setItem("apiToken", data.accessToken);
        onSuccess && onSuccess(data);
      }
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};
