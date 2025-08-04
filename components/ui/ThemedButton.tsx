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

/**
 * A themed button component that adapts its background color based on the current theme.
 *
 * @param style - Custom styles to apply to the button.
 * @param lightColor - Optional background color for light theme.
 * @param darkColor - Optional background color for dark theme.
 * @param type - Button style type, either "default" or "transparent". Defaults to "default".
 * @param flex - Optional flex value for layout.
 * @param rest - Additional TouchableOpacityProps.
 *
 * Uses `useThemeColor` to determine the background color based on theme and provided colors.
 * Applies rounded corners, padding, and row layout by default.
 *
 * @returns A themed TouchableOpacity button.
 */

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
