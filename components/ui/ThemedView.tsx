import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

/**
 * A themed `View` component that automatically applies the correct background color
 * based on the current theme (light or dark).
 *
 * Uses the `useThemeColor` hook to determine the background color, which can be
 * overridden via the `lightColor` and `darkColor` props.
 *
 * @param style - Optional style(s) to apply to the view.
 * @param lightColor - Optional background color for light theme.
 * @param darkColor - Optional background color for dark theme.
 * @param otherProps - Additional props passed to the underlying `View` component.
 *
 * @returns A React Native `View` component with themed background color.
 */
export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
