import { AccessibilityContext } from "@/context/Accessibility.context";
import { useContext } from "react";

export default function useAccessibilityContext() {
  return useContext(AccessibilityContext);
}
