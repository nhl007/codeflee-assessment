import { Colors } from "@/constants/Colors";
import useAccessibilityContext from "./useAccessibilityContext";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const {
    state: { theme },
  } = useAccessibilityContext();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
