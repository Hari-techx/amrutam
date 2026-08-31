import React, { PropsWithChildren, useEffect } from "react";
import { startBackgroundSync } from "../../services/sync/syncQueue";
export default function SyncProvider({ children }: PropsWithChildren) {
  useEffect(() => startBackgroundSync(), []);
  return <>{children}</>;
}
