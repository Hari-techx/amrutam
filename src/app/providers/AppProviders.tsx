import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storage } from "../../services/storage/storage";
import { darkTheme, lightTheme, Theme } from "../../theme/theme";
import { Toast } from "../../components/ui/Toast";
type ThemeValue = { theme: Theme; dark: boolean; toggleTheme: () => void };
type ToastValue = { show: (message: string) => void };
const ThemeContext = createContext<ThemeValue | null>(null);
const ToastContext = createContext<ToastValue | null>(null);
export const useAppTheme = () => {
  const v = useContext(ThemeContext);
  if (!v) throw new Error("useAppTheme must be used inside AppProviders");
  return v;
};

export const useToast = () => {
  const v = useContext(ToastContext);
  if (!v) throw new Error("useToast must be used inside AppProviders");
  return v;
};

export default function AppProviders({ children }: PropsWithChildren) {
  const [dark, setDark] = useState(Appearance.getColorScheme() === "dark");
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    void storage.get<boolean | null>("@amrutam/dark_mode", null).then((v) => {
      if (v !== null) setDark(v);
    });
  }, []);
  const theme = dark ? darkTheme : lightTheme;
  const themeValue = useMemo(
    () => ({
      theme,
      dark,
      toggleTheme: () =>
        setDark((v) => {
          const n = !v;
          void storage.set("@amrutam/dark_mode", n);
          return n;
        }),
    }),
    [dark, theme],
  );

  const toastValue = useMemo(
    () => ({ show: (m: string) => setMessage(m) }),
    [],
  );
  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={themeValue}>
        <ToastContext.Provider value={toastValue}>
          {children}
          <Toast message={message} onDismiss={() => setMessage(null)} />
        </ToastContext.Provider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}
