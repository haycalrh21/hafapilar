import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN } from "./app/types/candidate";

export async function middleware(request: NextRequest) {
  const cookieAuth = request.cookies.get(TOKEN);
  const response = NextResponse.next();

  if (!cookieAuth?.value) {
    if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"], // Middleware hanya untuk route admin
};
