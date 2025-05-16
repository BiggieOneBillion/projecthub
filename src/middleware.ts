import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./app/api/utils/auth";

export async function middleware(req: NextRequest) {
  const unprotectedRoutes = ["/home", "/sign-in", "/sign-up"]; // Add more routes if needed

  // Check if the current path is unprotected
  const isUnprotected = unprotectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isUnprotected) {
    // Allow access to unprotected routes
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/dashboard/manage-github")) {
    const tokenCookie = req.cookies.get("auth");
    if (tokenCookie) {
      const token = tokenCookie.value;
      const payload = await verifyToken(token);

      if (payload && payload?.accessCode) {
        // Token is valid
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  if (req.nextUrl.pathname.startsWith("/set-up")) {
    const tokenCookie = req.cookies.get("auth");
    if (tokenCookie) {
      const token = tokenCookie.value;
      const payload = await verifyToken(token);

      if (payload && payload.initialSetUp) {
        // Token is valid
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }

  if (
    req.nextUrl.pathname.startsWith("api/git-info")
    // ||
    // req.nextUrl.pathname.startsWith("api/auth/verify-git-login")
  ) {
    const tokenCookie = req.cookies.get("auth");
    if (tokenCookie) {
      const token = tokenCookie.value;
      const payload = await verifyToken(token);

      if (payload && payload.initialSetUp && payload.accessCode) {
        // Token is valid
        // const requestHeaders = new Headers(req.headers);
        // requestHeaders.set("X-access-code", payload.accessCode as string);
        // return NextResponse.next({
        //   request: {
        //     headers: requestHeaders,
        //   },
        // });
        const response = NextResponse.next();

        response.headers.set("X-access-code", payload.accessCode as string);

        return response;
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }

  // Read state from cookies
  const tokenCookie = req.cookies.get("auth");
  if (tokenCookie) {
    const token = tokenCookie.value;
    const payload = await verifyToken(token);
    if (payload) {
      // Token is valid
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/home", req.url));
}

// Apply the middleware to specific routes
export const config = {
  // Apply middleware to all routes except API routes and static files
  matcher: [
    "/api/git-info", // Include the specific API route
    // "/api/auth/verify-git-login",
    "/((?!_next|api|favicon.ico|assets).*)",
  ],
};
