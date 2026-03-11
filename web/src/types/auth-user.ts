export type AuthUser = {
  id: string;
  email: string;
};

export type RegistrationInput = {
  email: string | null;
  password: string | null;
};

export type LoginInput = {
  email: string | null;
  password: string | null;
};
