import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

const STATE_STORAGE_KEY = "@app_state";

const initialState: TInitialState = {
  theme: "light",
  letterSpacing: 0.5,
  lineHeight: 24,
  textAlign: "left",
};

export const AccessibilityContext = createContext({
  state: initialState,
  updateState: (payload: TInitialState) => {},
  resetState: () => {},
});

export function AccessibilityProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme();

  const [state, setState] = useState<TInitialState>({
    ...initialState,
    theme: systemColorScheme ?? "light",
  });

  const loadSavedState = useCallback(async () => {
    try {
      const savedState = await AsyncStorage.getItem(STATE_STORAGE_KEY);
      if (savedState) {
        setState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Failed to load state:", error);
    }
  }, []);

  useEffect(() => {
    loadSavedState();
  }, [loadSavedState]);

  const updateState = async (payload: TInitialState) => {
    setState(payload);
    try {
      await AsyncStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  };

  const resetState = async () => {
    setState(initialState);
    try {
      await AsyncStorage.setItem(
        STATE_STORAGE_KEY,
        JSON.stringify(initialState)
      );
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  };

  return (
    <AccessibilityContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </AccessibilityContext.Provider>
  );
}
