import { Form, redirect, useActionData } from "react-router";
import { login } from "../lib/auth";
import type { ActionFunction } from "react-router";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = login(email, password);
  
  if (user) {
    return redirect("/dashboard");
  }
  
  return { error: "Invalid email or password" };
};

export default function Login() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>
      <Form method="post" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue="admin@example.com"
            required
            style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue="password"
            required
            style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: "0.75rem", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Login
        </button>
        {actionData?.error && (
          <div style={{ color: "red", marginTop: "0.5rem" }}>{actionData.error}</div>
        )}
      </Form>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
        Use: admin@example.com / password
      </p>
    </div>
  );
}