import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "../../types";

export const getCategories = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: Category[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: "/categories",
    method: "get",
  })
    .then((response: AxiosResponse) => {
      const data: Category[] = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

// ACT 9 - Create callbacks fuctions to call create, update and delete APIs (Done)
export const createCategory = async ({
  newCategory,
  onSuccess,
  onError,
  onLoading,
}: {
  newCategory: CreateCategoryPayload;
  onSuccess?: (data: Category) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    method: "post",
    url: "/categories",
    data: newCategory,
  })
    .then((response: AxiosResponse) => {
    const data = response.data;
      if (response.status === 201 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const updateCategory = async ({
  payload,
  onSuccess,
  onError,
  onLoading,
}: {
  payload: UpdateCategoryPayload;
  onSuccess?: (data: Category) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  const { _id, ...updatedCategory } = payload;

  onLoading && onLoading(true);

  await axios({
    url: `/categories/${_id}`,
    method: "patch",
    data: updatedCategory,
  })
    .then((response: AxiosResponse) => {
    const data = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const deleteCategory = async ({
  categoryID,
  onSuccess,
  onError,
  onLoading,
}: {
  categoryID: string;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/categories/${categoryID}`,
    method: "delete",
  })
    .then(() => onSuccess && onSuccess())
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};
