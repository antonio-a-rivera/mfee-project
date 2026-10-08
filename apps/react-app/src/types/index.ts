export type Input = {
  value: string;
  error: string;
};

export type FormInputs = {
  title: Input;
  description: Input;
  category: Input;
  image: Input;
};

// Nuevos para Actividad 8
export type CommentFormInputs = {
  author: Input;
  content: Input;
};

export type newComment = {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};

export type CategoryFormInputs = {
  name: Input;
};

export type UserFormInputs = {
  firstname: Input;
  lastname: Input;
  username: Input;
  password: Input;
}
//--------------------

export type NewPost = {
  title: string;
  image: string;
  description: string;
  category: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
};

export interface Alert {
  severity?: "error" | "warning" | "info" | "success";
  message: string;
}

export type Order = "asc" | "desc";

export interface TableData {
  [key: string]: string;
}

export interface HeadCell {
  id: string;
  label: string;
}

export type FormData = { [key: string]: string };

export type Inputs = {
  id: string;
  name: keyof FormInputs;
  label: string;
  type: string;
  options?: { id?: string; name: string }[];
}[];

export interface Category {
  id: string;
  name: string;
}

export interface NewCategory {
  id: string;
  name: string;
}

export interface CategoriesResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: string[];
};

export type SelectedPost = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: CommentResponse[];
};

export interface PostsResponse {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CommentResponse {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface PostResponse {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: CommentResponse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewComment {
  author: string;
  content: string;
}

export interface User {
  username: string;
  password: string;
}

// Modificado para actividad 8
export interface NewUser extends User {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
}

export interface AuthLoginResponse {
  accessToken: string;
}
