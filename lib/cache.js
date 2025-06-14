import { Redis } from "@upstash/redis";
import { RedisCache } from "langchain/cache/redis";
import { cache } from "langchain";

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Set Redis as the global cache
cache.set(
  new RedisCache({
    client: redis,
    ttl: 3600, // Cache duration in seconds (1 hour here)
  })
);

console.log("Redis cache setup initialized");
