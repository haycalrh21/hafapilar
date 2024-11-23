import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"; // Menggunakan next-auth untuk mendapatkan token

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); // Mendapatkan token dengan next-auth
  const { pathname } = req.nextUrl;
  // console.log(token);
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

  // Jika semua validasi aman, lanjutkan request
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Middleware hanya untuk route admin
};
