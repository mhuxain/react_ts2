import { redirect } from "react-router";

export interface User {
  id: string;
  email: string;
  name: string;
}

// Simple in-memory auth (replace with your actual auth logic)
let currentUser: User | null = null;

export function getCurrentUser(): User | null {
  return currentUser;
}

export function login(email: string, password: string): User | null {
  // Mock authentication - replace with real auth
  if (email === "admin@example.com" && password === "password") {
    currentUser = {
      id: "1",
      email: "admin@example.com",
      name: "Admin User"
    };
    return currentUser;
  }
  return null;
}

export function logout(): void {
  currentUser = null;
}

export function requireAuth(): User {
  const user = getCurrentUser();
  if (!user) {
    throw redirect("/login");
  }
  return user;
}