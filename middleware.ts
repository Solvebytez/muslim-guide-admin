import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const protectedRoutes = ["/activeuser", "/dashboard"];
console.log("🍪 All cookies in middleware:");
  request.cookies.getAll().forEach((cookie) =>
  console.log(`${cookie.name}: ${cookie.value}`)
);

  const refreshToken = request.cookies.get("isl_admin_refresh_token")?.value;

  console.log("➡ Pathname:", pathname);
  console.log("➡➡➡➡➡➡➡➡➡➡➡➡➡➡ Has refreshToken:", !!refreshToken, request.cookies.get("isl_admin_refresh_token")?.value);

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!refreshToken) {
      console.log("🔒 No refresh token – redirecting to /login");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("isl_admin_access_token");
      response.cookies.delete("isl_admin_refresh_token");
      return response;
    }

    try {
      console.log("🔄 Trying to refresh token...",process.env.NEXT_PUBLIC_API_URL);
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `isl_admin_refresh_token=${refreshToken}`,
          },
          credentials: "include",
        });
     
      if (!res.ok) throw new Error("Refresh failed");

      console.log("✅ Token refreshed successfully");
      return NextResponse.next();
    } catch (error) {
      console.log("❌ Refresh failed – redirecting to /login");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("isl_admin_access_token");
      response.cookies.delete("isl_admin_refresh_token");
      return response;
    }
  }

  if (authRoutes.includes(pathname)) {
    if (refreshToken) {
      console.log("🔁 On auth route but already logged in – redirect to /dashboard");

      try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `isl_admin_refresh_token=${refreshToken}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          console.log("✅ Refresh successful, redirecting to /dashboard");
          return NextResponse.redirect(new URL("/dashboard", request.url));
        } else {
          console.log("⚠️ Refresh failed on auth route – letting user continue");
          const response = NextResponse.next();
          response.cookies.delete("isl_admin_access_token");
          response.cookies.delete("isl_admin_refresh_token");
          return response;
        }
      } catch (err) {
        console.log("⚠️ Error refreshing on auth route:", err);
        const response = NextResponse.next();
        response.cookies.delete("isl_admin_access_token");
        response.cookies.delete("isl_admin_refresh_token");
        return response;
      }
    }
  }

  console.log("✅ Middleware passed through");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known (well-known URIs)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)',
  ],
};