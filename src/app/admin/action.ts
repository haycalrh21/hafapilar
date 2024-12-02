"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "../api/auth/auth";

export async function handleLogin(email: string, password: string) {
  let redirectUrl = `/admin?errorMessage=${encodeURIComponent(
    "Failed to login"
  )}`;
  try {
    const res = await login(email, password);

    if (res.token) {
      // Simpan token di cookie
      cookies().set("token", res.token);

      redirectUrl = "/admin/dashboard";
    }
  } catch (error) {
  } finally {
    redirect(redirectUrl);
  }
}

export async function handleLogout() {
  cookies().delete("token");
  redirect("/admin");
}
