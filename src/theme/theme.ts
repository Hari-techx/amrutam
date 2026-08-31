import { ColorValue } from "react-native";

export type Theme = {
  background: ColorValue;
  surface: ColorValue;
  text: ColorValue;
  muted: ColorValue;
  border: ColorValue;
  primary: ColorValue;
  danger: ColorValue;
};

export const lightTheme: Theme = {
  background: "#F7F8F4",
  surface: "#FFFFFF",
  text: "#172018",
  muted: "#657065",
  border: "#D9DED8",
  primary: "#2E6B45",
  danger: "#B42318",
};

export const darkTheme: Theme = {
  background: "#101510",
  surface: "#1A211B",
  text: "#F0F5EF",
  muted: "#A8B2A8",
  border: "#344036",
  primary: "#8BC69A",
  danger: "#FF8A80",
};
