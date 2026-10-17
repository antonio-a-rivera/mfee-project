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

export interface Alert {
  severity?: "error" | "warning" | "info" | "success";
  message: string;
}

export type Order = "asc" | "desc";

export interface TableData {
  [key: string]: string;
}

export interface HeadCell {
  _id: string;
  label: string;
}

export type FormData = { [key: string]: string };

export type Inputs = {
  _id: string;
  name: keyof FormInputs;
  label: string;
  type: string;
  options?: { id?: string; name: string }[];
}[];


// TypeScript interfaces for BE models

export interface Category {
  _id: string;
  name: string;
}

export interface NewCategory {
  _id: string;
  name: string;
}

export interface Comment {
  _id: string;
  author: string;
  content: string;
  post_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string | Pick<Category, "_id" | "name">;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

// Payload types
export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  _id: string;
  name: string;
}

export interface CreatePostPayload {
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface UpdatePostPayload {
  _id: string;
  title?: string;
  image?: string;
  description?: string;
  category?: string;
}

export interface CreateCommentPayload {
  _id: string;
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

// Response types
export interface AuthResponse {
  accessToken: string;
  message: string;
}

export interface MeResponse {
  user: { name: string; username: string } | null;
}
