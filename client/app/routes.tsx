
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "routes/home.tsx",
  },
  {
    path: "/dashboard",
    file: "routes/dashboard.tsx",
  },
  {
    path: "/login",
    file: "routes/login.tsx",
  },
  {
    path: "/users", 
    file: "routes/users.tsx",
  },
  {
    path: "/projects",
    file: "routes/projects.tsx",
  },
  {
    path: "/invoices",
    file: "routes/invoices.tsx",
  },
] satisfies RouteConfig;