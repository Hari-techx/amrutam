import NetInfo from "@react-native-community/netinfo";
import { storage } from "../storage/storage";
import { logger } from "../logger/logger";

export type Mutation = {
  id: string;
  type: "BOOK_SLOT" | "CART_UPDATE";
  payload: unknown;
  createdAt: string;
  attempts: number;
};

const QUEUE_KEY = "@amrutam/mutation_queue";

let syncing = false;

export async function enqueueMutation(mutation: Omit<Mutation, "attempts">) {
  const queue = await storage.get<Mutation[]>(QUEUE_KEY, []);
  await storage.set(QUEUE_KEY, [...queue, { ...mutation, attempts: 0 }]);
  await syncQueue();
}

export async function getQueue() {
  return storage.get<Mutation[]>(QUEUE_KEY, []);
}

async function processMutation(mutation: Mutation) {
  // Mock API layer: replace this switch with real apiClient calls.
  if (Math.random() < 0.05) throw new Error("Temporary sync failure");
  logger.info("Synced mutation", mutation.id, mutation.type);
}

export async function syncQueue() {
  if (syncing) return;
  const state = await NetInfo.fetch();
  if (!state.isConnected) return;

  syncing = true;
  try {
    const queue = await getQueue();
    const remaining: Mutation[] = [];

    for (const mutation of queue) {
      let synced = false;
      let current = mutation;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          await processMutation(current);
          synced = true;
          break;
        } catch {
          current = { ...current, attempts: current.attempts + 1 };
          await new Promise((resolve) =>
            setTimeout(resolve, 250 * 2 ** attempt),
          );
        }
      }
      if (!synced) remaining.push(current);
    }

    await storage.set(QUEUE_KEY, remaining);
  } finally {
    syncing = false;
  }
}

export function startBackgroundSync() {
  return NetInfo.addEventListener((state) => {
    if (state.isConnected) void syncQueue();
  });
}
