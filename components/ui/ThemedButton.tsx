import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "transparent";
  flex?: number;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  flex,

  ...rest
}: ThemedButtonProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        { backgroundColor: color, flex: flex },
        styles.default,
        type === "transparent" ? styles.transparent : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 100,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  transparent: {
    backgroundColor: "transparent",
  },
});
