export const logger = {
  info: (...args: unknown[]) => console.log("[Amrutam]", ...args),
  warn: (...args: unknown[]) => console.warn("[Amrutam]", ...args),
  error: (...args: unknown[]) => console.error("[Amrutam]", ...args),
};
