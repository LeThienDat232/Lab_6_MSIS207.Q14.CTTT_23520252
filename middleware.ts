import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RateState = {
  count: number;
  reset: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, RateState>();

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/ai/stream")) {
    const ip = (req.headers.get("x-forwarded-for") || "unknown")
      .split(",")[0]
      .trim();
    const now = Date.now();
    const state = rateLimitStore.get(ip);

    if (!state || now > state.reset) {
      rateLimitStore.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
      return NextResponse.next();
    }

    if (state.count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    state.count += 1;
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/secure") || pathname === "/api/secret") {
    const apiKey = req.headers.get("x-api-key");
    const expected = process.env.API_KEY;

    if (!expected) {
      // Fail-safe: if you forgot to set API_KEY, block secure endpoints
      return NextResponse.json(
        { error: "Server misconfigured: API_KEY not set" },
        { status: 500 }
      );
    }

    if (apiKey !== expected) {
      return NextResponse.json(
        { error: "Unauthorized: missing/invalid x-api-key" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/secure/:path*", "/api/secret", "/api/ai/:path*"]
};
