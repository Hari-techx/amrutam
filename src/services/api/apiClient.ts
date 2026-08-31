import axios from "axios";
import { ENV } from "../../config/env";
import { withRetry } from "./resilience";
export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});
export async function safeRequest<T>(
  request: Promise<{ data: T }>,
): Promise<T> {
  return withRetry(async () => {
    const response = await request;
    return response.data;
  });
}
