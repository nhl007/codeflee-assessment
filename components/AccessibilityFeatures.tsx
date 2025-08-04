import { ModalItemCard } from "@/components/ui/Card";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedText } from "@/components/ui/ThemedText";
import useAccessibilityContext from "@/hooks/useAccessibilityContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";

/**
 * AccessibilityFeatures component provides UI controls for adjusting accessibility settings
 * such as theme (dark/light), letter spacing, line height, and text alignment.
 *
 * It uses the `useAccessibilityContext` hook to read and update accessibility state.
 *
 * Features:
 * - Toggle between dark and light theme.
 * - Increase letter spacing (cycles between 1px and 2.5px).
 * - Increase line height (cycles between 24px and 40px).
 * - Cycle text alignment (center, right, justify, left).
 * - Reset all accessibility settings to their defaults.
 *
 * UI is composed of ModalItemCards for each setting and a reset button.
 *
 * The rendered accessibility features controls.
 */
export default function AccessibilityFeatures() {
  const {
    state: { theme, letterSpacing, lineHeight, textAlign },
    updateState,
    resetState,
  } = useAccessibilityContext();

  return (
    <>
      <View style={styles.modalItemContainer}>
        <ModalItemCard
          onPress={() => {
            updateState({
              theme: theme === "dark" ? "light" : "dark",
              textAlign,
              letterSpacing,
              lineHeight,
            });
          }}
        >
          <MaterialIcons
            name={theme === "dark" ? "dark-mode" : "light-mode"}
            size={28}
            color={theme === "light" ? "black" : "white"}
          />
          <ThemedText>{theme}</ThemedText>
        </ModalItemCard>
        <ModalItemCard
          onPress={() => {
            updateState({
              theme,
              textAlign,
              letterSpacing: letterSpacing >= 2.5 ? 1 : letterSpacing + 0.5,
              lineHeight,
            });
          }}
        >
          <MaterialCommunityIcons
            name="format-letter-spacing"
            size={32}
            color={theme === "light" ? "black" : "white"}
          />
          <ThemedText>{letterSpacing} px</ThemedText>
        </ModalItemCard>
        <ModalItemCard
          onPress={() => {
            updateState({
              theme,
              textAlign,
              letterSpacing,
              lineHeight: lineHeight >= 40 ? 24 : lineHeight + 8,
            });
          }}
        >
          <FontAwesome
            name="text-height"
            size={26}
            color={theme === "light" ? "black" : "white"}
          />
          <ThemedText>{lineHeight} px</ThemedText>
        </ModalItemCard>
        <ModalItemCard
          onPress={() => {
            updateState({
              theme,
              textAlign:
                textAlign === "center"
                  ? "right"
                  : textAlign === "right"
                  ? "justify"
                  : textAlign === "justify"
                  ? "left"
                  : "center",
              letterSpacing,
              lineHeight,
            });
          }}
        >
          <FontAwesome
            name={`align-${textAlign}`}
            size={24}
            color={theme === "light" ? "black" : "white"}
          />
          <ThemedText>{textAlign}</ThemedText>
        </ModalItemCard>
      </View>
      <ThemedButton onPress={resetState} style={styles.resetButton}>
        <FontAwesome6 name="repeat" size={18} color="#FFF" />
        <ThemedText lightColor="#FFF" darkColor="#FFF">
          Reset All Accessibility
        </ThemedText>
      </ThemedButton>
    </>
  );
}

const styles = StyleSheet.create({
  modalItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    padding: 16,
  },
  resetButton: {
    backgroundColor: "#c01afe",
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
