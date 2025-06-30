import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const protectedRoutes = ["/activeuser", "/dashboard"];

  const sessionMarker = request.cookies.get("isl_session_marker")?.value === "1";

  console.log("🍪 Cookies in middleware:");
  request.cookies.getAll().forEach((cookie) =>
    console.log(`${cookie.name}: ${cookie.value}`)
  );
  console.log("➡ Pathname:", pathname);
  console.log("➡ Session marker:", sessionMarker);

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!sessionMarker) {
      console.log("🔒 Not logged in – redirecting to /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (authRoutes.includes(pathname) && sessionMarker) {
    console.log("🔁 Already logged in – redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)',
  ],
};
