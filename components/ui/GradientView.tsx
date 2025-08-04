import { LinearGradient, type LinearGradientProps } from "expo-linear-gradient";
export type GradientViewProps = LinearGradientProps & {
  // darkColors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  // lightColors: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

/**
 * A wrapper component around `expo-linear-gradient`'s `LinearGradient` that provides
 * a customizable gradient view for React Native applications.
 *
 * @param style - Optional style(s) to apply to the gradient container.
 * @param colors - An array of color values that define the gradient's colors.
 * @param start - Optional starting point of the gradient (default: `{ x: 0, y: 0 }`).
 * @param end - Optional ending point of the gradient (default: `{ x: 1, y: 1 }`).
 * @param otherProps - Additional props passed to the underlying `LinearGradient` component.
 *
 * @remarks
 * This component is intended to simplify the usage of gradients by providing sensible defaults
 * for the `start` and `end` properties. It accepts all props supported by `LinearGradient`.
 *
 * @example
 * ```tsx
 * <GradientView
 *   colors={['#ff0000', '#00ff00', '#0000ff']}
 *   style={{ height: 200, width: 200 }}
 * />
 * ```
 */
export function GradientView({
  style,
  colors,
  start,
  end,
  ...otherProps
}: GradientViewProps) {
  return (
    <LinearGradient
      colors={colors}
      start={start ? start : { x: 0, y: 0 }}
      end={end ? end : { x: 1, y: 1 }}
      style={[style]}
      {...otherProps}
    />
  );
}
