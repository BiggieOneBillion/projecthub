import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "../../utils/auth";
import { z } from "zod";

// Define environment variable schema
const envSchema = z.object({
  CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  REDIRECT_URI: z.string().url(),
  FRONTEND_URL: z.string().url(),
});

// Define GitHub user response schema
// const githubUserSchema = z.object({
//   id: z.number(),
//   login: z.string(),
//   email: z.string().optional(),
//   name: z.string().optional(),
// });

export async function GET(request: NextRequest) {
  try {
    // Validate environment variables
    const env = envSchema.parse({
      CLIENT_ID: process.env.CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      REDIRECT_URI: process.env.REDIRECT_URI,
      FRONTEND_URL: process.env.FRONTEND_URL,
    });

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { message: "Authorization code is required" },
        { status: 400 }
      );
    }

    // Step 1: Exchange code for access token
    const tokenResponse = await axios.post<{ access_token: string }>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: env.CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: env.REDIRECT_URI,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!tokenResponse.data.access_token) {
      throw new Error("Failed to obtain access token");
    }

    // Step 2: Fetch user information from GitHub
    // const userResponse = await axios.get("https://api.github.com/user", {
    //   headers: {
    //     Authorization: `Bearer ${tokenResponse.data.access_token}`,
    //     Accept: "application/vnd.github.v3+json",
    //   },
    // });

    // Validate user data
    // const userData = githubUserSchema.parse(userResponse.data);

    // Step 3: Generate JWT with minimal necessary data
    const token = await generateToken({
      accessCode: tokenResponse.data.access_token,
      isAuthenticated: true,
    });

    const redirectUrl = new URL(`${env.FRONTEND_URL}/dashboard`, request.url);
    redirectUrl.searchParams.set("t", encodeURIComponent(token));

    // Create response with secure cookie
    const response = NextResponse.redirect(
      // `${env.FRONTEND_URL}/dashboard?t=${token}`
      redirectUrl
    );

    // Set HTTP-only cookie with secure options
    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("GitHub OAuth Error:", error);

    // Handle different types of errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Configuration error", details: error.issues },
        { status: 500 }
      );
    }

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: "Authentication failed", details: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
