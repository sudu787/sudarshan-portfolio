import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function middleware(req: NextRequest) {
  // 1. Skip if it's a static file
  if (req.nextUrl.pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Capture Visitor Details (Using Headers to fix TypeScript error)
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const city = req.headers.get("x-vercel-ip-city") || "Unknown City";
  const country = req.headers.get("x-vercel-ip-country") || "Unknown Country";
  const device = req.headers.get("user-agent") || "Unknown Device";
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // 3. Log to Redis
  try {
    await redis.lpush("visitors", JSON.stringify({ ip, city, country, device, time }));
    await redis.ltrim("visitors", 0, 99); 
  } catch (e) {
    console.error("Logging failed:", e);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};