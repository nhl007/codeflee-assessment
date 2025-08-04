import { useThemeColor } from "@/hooks/useThemeColor";
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

type TModalItemCardProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

/**
 * A card component for modal items, styled with theme-aware background color.
 *
 * This component wraps a `TouchableOpacity` and applies custom styles, including
 * theme-based background color using the `useThemeColor` hook.
 *
 * @param style - Additional styles to apply to the card container.
 * @param lightColor - Optional background color for light theme.
 * @param darkColor - Optional background color for dark theme.
 * @param rest - Other `TouchableOpacityProps` passed to the underlying `TouchableOpacity`.
 *
 * @returns A themed, touchable card component for modal items.
 */
export function ModalItemCard({
  style,
  lightColor,
  darkColor,
  ...rest
}: TModalItemCardProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor,
        },
        styles.container,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "30%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    borderColor: "#FFF",
    borderWidth: 1.5,
  },
});
