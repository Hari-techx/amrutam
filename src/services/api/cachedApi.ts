import { storage } from "../storage/storage";
export async function cachedRequest<T>(
  key: string,
  request: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    const data = await request();
    await storage.set(key, data);
    return data;
  } catch {
    return storage.get(key, fallback);
  }
}
