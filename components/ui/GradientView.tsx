import { LinearGradient, type LinearGradientProps } from "expo-linear-gradient";
export type GradientViewProps = LinearGradientProps & {
  // darkColors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  // lightColors: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

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
