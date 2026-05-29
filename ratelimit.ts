import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const redis = Redis.fromEnv();

await redis.set('foo', 'bar');
const data = await redis.get('foo');

console.log(data)
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

function getClientIp(request: NextRequest) {
    const xff = request.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    const realIp = request.headers.get("x-real-ip");
    if (realIp) return realIp;
    // Vercel/other envs sometimes surface the ip on the request object
    // @ts-ignore - permissive fallback
    if ((request as any).ip) return (request as any).ip;
    return "unknown";
}

export async function middleware(request: NextRequest) {

    console.log("middleware triggered:", request.nextUrl.pathname);
    const ip = getClientIp(request) || "unknown";

    try {

        const { success, limit, remaining, reset } = await ratelimit.limit(ip);

        if (!success) {
            return new NextResponse("Too many requests", { status: 429 });
        }

        const response = NextResponse.next();
        if (limit !== undefined) response.headers.set("X-RateLimit-Limit", String(limit));
        if (remaining !== undefined) response.headers.set("X-RateLimit-Remaining", String(remaining));
        if (reset !== undefined) response.headers.set("X-RateLimit-Reset", String(reset));
        return response;
    } catch (err) {
        console.error("Rate limit check failed:", err);
        return NextResponse.next();
    }
}



export const config = {
    matcher: ["/:path*"],
};