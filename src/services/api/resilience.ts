import axios from "axios";
import { logger } from "../logger/logger";
export async function withRetry<T>(task: () => Promise<T>, retries = 2) {
  let last: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await task();
    } catch (error) {
      last = error;
      logger.warn("Request attempt failed", i + 1);
      if (i < retries) await new Promise((r) => setTimeout(r, 250 * 2 ** i));
    }
  }
  throw last;
}
export function safeJson<T>(value: string, fallback: T): T {
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed as T;
  } catch (error) {
    logger.warn("Invalid JSON response");
    return fallback;
  }
}
export function isTimeout(error: unknown) {
  return axios.isAxiosError(error) && error.code === "ECONNABORTED";
}
