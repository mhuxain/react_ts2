import { redirect } from "react-router";

export interface User {
  id: string;
  email: string;
  name: string;
}

const USER_STORAGE_KEY = "auth:user";

let currentUser: User | null = null;
let storageHydrated = false;

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function loadStoredUser(): User | null {
  if (!isBrowser()) return null;
  try {
    const serialized = window.localStorage.getItem(USER_STORAGE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized) as User;
  } catch (error) {
    console.warn("Failed to load user from storage", error);
    return null;
  }
}

function persistUser(user: User | null) {
  if (!isBrowser()) return;
  try {
    if (!user) {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    } else {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  } catch (error) {
    console.warn("Failed to persist user to storage", error);
  }
}

function hydrateFromStorage() {
  if (storageHydrated) return;
  storageHydrated = true;
  currentUser = loadStoredUser();
}

function setCurrentUser(user: User | null) {
  storageHydrated = true;
  currentUser = user;
  persistUser(user);
}

export function getCurrentUser(): User | null {
  hydrateFromStorage();
  return currentUser;
}

export function login(email: string, password: string): User | null {
  // Mock authentication - replace with real auth
  if (email === "admin@example.com" && password === "password") {
    const user: User = {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
    };
    setCurrentUser(user);
    return user;
  }
  return null;
}

export function logout(): void {
  setCurrentUser(null);
}

export function requireAuth(): User {
  const user = getCurrentUser();
  if (!user) {
    throw redirect("/login");
  }
  return user;
}
