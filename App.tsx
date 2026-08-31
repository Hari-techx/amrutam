import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigator";
import AppProviders from "./src/app/providers/AppProviders";
import SyncProvider from "./src/app/providers/SyncProvider";
import { ErrorBoundary } from "./src/components/ui/ErrorBoundary";
import { store } from "./src/store/store";

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppProviders>
          <SyncProvider>
            <AppNavigator />
          </SyncProvider>
        </AppProviders>
      </Provider>
    </ErrorBoundary>
  );
}
