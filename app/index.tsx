import Modal from "@/components/Modal";
import { ModalItemCard } from "@/components/ui/Card";
import { GradientView } from "@/components/ui/GradientView";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedText } from "@/components/ui/ThemedText";
import useAccessibilityContext from "@/hooks/useAccessibilityContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    state: { theme, letterSpacing, lineHeight, textAlign },
    updateState,
    resetState,
  } = useAccessibilityContext();

  const [showModal, setShowModal] = useState(true);

  return (
    <GradientView
      style={styles.background}
      colors={
        theme === "light"
          ? ["#ebc5f4", "#f2dbdc", "#ebc5f4"]
          : ["#000", "#4D4855"]
      }
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.menuContainer}>
          <ThemedButton
            darkColor="#4D4855"
            onPress={() => setShowModal((prev) => !prev)}
            flex={0.75}
          >
            <FontAwesome6
              name="universal-access"
              size={24}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText>Accessibility</ThemedText>
          </ThemedButton>
          <ThemedButton type="transparent">
            <Image
              height={20}
              width={20}
              style={styles.saFlag}
              source={require("../assets/images/icons/sa_flag.jpg")}
            />
            <ThemedText>English</ThemedText>

            <FontAwesome6
              name="angle-down"
              size={20}
              color={theme === "light" ? "black" : "white"}
            />
          </ThemedButton>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.companyContainer}>
            <Ionicons name="logo-react" size={40} color="#c01afe" />
            <ThemedText type="title">LiftUP Ai</ThemedText>
          </View>
          <View style={styles.welcomeContainer}>
            <ThemedText type="title">Welcome to</ThemedText>
            <ThemedText type="title" lightColor="#c01afe" darkColor="#c01afe">
              LiftUP Ai
            </ThemedText>
            <ThemedText type="default">
              Your Smart Learning Companion!
            </ThemedText>
          </View>
          <View style={styles.actionContainer}>
            <ThemedButton style={styles.clearPadding}>
              <GradientView
                style={styles.buttonBackground}
                colors={["#f8d56c", "#c134f1"]}
              >
                <ThemedText lightColor="#FFF">Get Started</ThemedText>
                <FontAwesome6 name="angle-right" size={16} color="white" />
              </GradientView>
            </ThemedButton>
            <ThemedButton>
              <ThemedText>Log In</ThemedText>
            </ThemedButton>
          </View>
        </View>
      </SafeAreaView>
      {showModal && (
        <Modal visible={showModal} onClose={() => setShowModal(false)}>
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
        </Modal>
      )}
    </GradientView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 40 : 24,
  },
  menuContainer: {
    zIndex: 99,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saFlag: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },

  titleContainer: {
    marginTop: "auto",
    gap: 32,
  },

  welcomeContainer: { gap: 8 },
  companyContainer: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  actionContainer: {
    gap: 12,
  },
  clearPadding: { padding: 0 },
  buttonBackground: {
    width: "100%",
    borderRadius: 100,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
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
