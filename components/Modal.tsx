import useAccessibilityContext from "@/hooks/useAccessibilityContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GradientView } from "./ui/GradientView";
import { ThemedText } from "./ui/ThemedText";

type AnimatedModalProps = ViewProps & {
  visible: boolean;
  onClose: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * A modal component that slides up from the bottom of the screen with animated transitions.
 * Supports drag-to-dismiss gesture and backdrop press to close.
 *
 * @remarks
 * - Uses react-native-reanimated for smooth animations.
 * - Uses react-native-gesture-handler for drag gestures.
 * - The modal content is themed based on accessibility context.
 * - The modal is rendered only when `visible` is true.
 *
 * @param {AnimatedModalProps} props - The props for the Modal component.
 * @param {boolean} props.visible - Controls the visibility of the modal.
 * @param {() => void} props.onClose - Callback invoked when the modal is dismissed.
 * @param {React.ReactNode} props.children - The content to render inside the modal.
 * @param {ViewProps} [props.style] - Optional style for the modal container.
 *
 * @example
 * ```tsx
 * <Modal visible={isOpen} onClose={() => setIsOpen(false)}>
 *   <Text>Modal Content</Text>
 * </Modal>
 * ```
 */
const Modal = ({
  visible,
  onClose,
  style,
  children,
  ...rest
}: AnimatedModalProps) => {
  const {
    state: { theme },
  } = useAccessibilityContext();

  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
    }
  }, [translateY, visible]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 100) {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
        runOnJS(onClose)();
      } else {
        translateY.value = withTiming(0, { duration: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          {
            width: "100%",
            position: "absolute",
            bottom: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: "hidden",
          },
          animatedStyle,
          style,
        ]}
        {...rest}
      >
        <GradientView
          style={styles.background}
          colors={
            theme === "light"
              ? ["#ebc5f4", "#f2dbdc", "#ebc5f4"]
              : ["#000", "#4D4855"]
          }
        >
          <GestureDetector gesture={gesture}>
            <View style={styles.dragHandleWrapper}>
              <ThemedText>Accessibility Menu</ThemedText>
              <Pressable hitSlop={40} onPress={onClose}>
                <FontAwesome6
                  name="delete-left"
                  size={24}
                  color={theme === "light" ? "black" : "white"}
                />
              </Pressable>
            </View>
          </GestureDetector>
          {children}
        </GradientView>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  background: { flex: 1, marginTop: "auto" },
  dragHandleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#FFF",
    borderWidth: 1.2,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
