import useAccessibilityContext from "@/hooks/useAccessibilityContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

/**
 * A themed text component that adapts its color and style based on the current theme and accessibility settings.
 *
 * @param style - Custom style to apply to the text.
 * @param lightColor - Optional color to use in light mode.
 * @param darkColor - Optional color to use in dark mode.
 * @param type - The style type of the text. Can be "default", "title", "defaultSemiBold", "subtitle", or "link". Defaults to "default".
 * @param rest - Other props passed to the underlying React Native Text component.
 *
 * The component uses `useThemeColor` to determine the text color based on the theme,
 * and `useAccessibilityContext` to apply accessibility-related styles such as letter spacing, line height, and text alignment.
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const {
    state: { letterSpacing, lineHeight, textAlign },
  } = useAccessibilityContext();
  return (
    <Text
      style={[
        {
          color,
          textAlign,
          lineHeight: type === "title" ? lineHeight + 16 : lineHeight,
          letterSpacing,
        },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
  },
});
