import { useLoaderData } from "react-router";
import { requireAuth } from "../lib/auth";
import type { LoaderFunction } from "react-router";

export const clientLoader: LoaderFunction = async () => {
  const user = requireAuth(); // This will redirect to /login if not authenticated
  return { user };
};

export default function Projects() {
  const { user } = useLoaderData<{ user: any }>();

  return (
    <div>
      <h1>Projects</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  );
}