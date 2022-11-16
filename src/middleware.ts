// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (!request.cookies.has("next-auth.session-token")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/app/:path*",
};
