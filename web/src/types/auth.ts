export type AuthUser = {
  id: string;
  email: string;
};

export type AuthSuccessUser = {
  id: string;
  email: string;
};

export type LoginInput = {
  email: string | null;
  password: string | null;
};

export type RegistrationInput = {
  email: string | null;
  password: string | null;
};

export type LoginResponse = {
  message: string;
  user: AuthSuccessUser;
};

export type RegisterResponse = {
  message: string;
};

export type ErrorResponse = {
  error: string;
};
