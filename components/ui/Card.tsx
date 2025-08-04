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
