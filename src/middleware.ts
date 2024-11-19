import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;
  const { pathname } = req.nextUrl;

  // Abaikan validasi untuk halaman login (/admin)
  if (pathname === "/admin") {
    // Jika ada token, redirect ke /admin/dashboard
    if (token) {
      const dashboardUrl = req.nextUrl.clone();
      dashboardUrl.pathname = "/admin/dashboard";
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }
  // Redirect ke halaman login jika tidak ada token
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin";
    loginUrl.searchParams.set("redirectUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Kalau token ada, lanjutkan request
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Middleware hanya untuk route admin
};
