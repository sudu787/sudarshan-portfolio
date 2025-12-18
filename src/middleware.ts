import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 👇 CHANGE: Added 'default' keyword here
export default async function middleware(req: NextRequest) {
  // 1. Skip if it's a static file (image, favicon, etc.)
  if (req.nextUrl.pathname.includes(".")) {
    return NextResponse.next();
  }

  // 2. Capture Visitor Details
  const ip = req.ip || req.headers.get("x-forwarded-for") || "127.0.0.1";
  const city = req.geo?.city || "Unknown City";
  const country = req.geo?.country || "Unknown Country";
  const device = req.headers.get("user-agent") || "Unknown Device";
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // 3. Log to Redis (Fire and Forget)
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