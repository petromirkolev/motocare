import type { AuthUser } from '../types/auth-user';

let currentUser: AuthUser | null = null;

export function readLoginForm(form: HTMLFormElement) {
  const fd = new FormData(form);

  const email: string = String(fd.get('email') ?? '').trim();
  if (!email) throw new Error('Email is required');

  const password: string = String(fd.get('password') ?? '').trim();
  if (!password) throw new Error('Password is required');

  return { email, password };
}

export function readRegForm(form: HTMLFormElement) {
  const fd = new FormData(form);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const email: string = String(fd.get('email') ?? '').trim();
  if (!email) throw new Error('Email is required');

  const emailCheck = emailRegex.test(email);
  if (!emailCheck) throw new Error('Invalid email');

  const password: string = String(fd.get('password') ?? '').trim();
  if (!password) throw new Error('Password is required');

  const password2: string = String(fd.get('repeat-password') ?? '').trim();
  if (!password2) throw new Error('Password is required');

  if (password !== password2) throw new Error('Passwords do not match');

  return { email, password };
}

export function setCurrentUser(user: AuthUser | null): void {
  currentUser = user;
}

export function getCurrentUser(): AuthUser | null {
  return currentUser;
}
