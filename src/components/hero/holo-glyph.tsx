import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import styles from "./holo-glyph.module.css";

export type HoloGlyphVariant =
  | "angle"
  | "brace"
  | "bracket"
  | "fragment"
  | "slash"
  | "terminal";

type HoloGlyphProps = {
  className?: string;
  delay: number;
  idleOpacity: number;
  variant: HoloGlyphVariant;
};

type HoloGlyphStyle = CSSProperties & {
  "--glyph-ambient": number;
  "--glyph-delay": string;
  "--glyph-idle": number;
  "--glyph-mask": string;
  "--glyph-specular": number;
};

const glyphMasks: Record<HoloGlyphVariant, string> = {
  angle: 'url("/assets/profile/glyphs/code-angle.svg")',
  brace: 'url("/assets/profile/glyphs/code-brace.svg")',
  bracket: 'url("/assets/profile/glyphs/code-bracket.svg")',
  fragment: 'url("/assets/profile/glyphs/code-fragment.svg")',
  slash: 'url("/assets/profile/glyphs/code-slash.svg")',
  terminal: 'url("/assets/profile/glyphs/code-terminal.svg")',
};

export function HoloGlyph({
  className,
  delay,
  idleOpacity,
  variant,
}: HoloGlyphProps) {
  const ambientOpacity = Math.min(idleOpacity * 0.5, 0.22);
  const baseOpacity = Math.min(idleOpacity, 0.48);
  const specularOpacity = Math.min(idleOpacity * 0.42, 0.18);
  const style: HoloGlyphStyle = {
    "--glyph-ambient": ambientOpacity,
    "--glyph-delay": `${delay}s`,
    "--glyph-idle": baseOpacity,
    "--glyph-mask": glyphMasks[variant],
    "--glyph-specular": specularOpacity,
  };

  return (
    <div
      aria-hidden="true"
      className={cn(styles.holoGlyph, className)}
      data-holo-glyph={variant}
      style={style}
    >
      <span aria-hidden="true" className={styles.glyphBase} />
      <span aria-hidden="true" className={styles.glyphAmbient} />
      <span aria-hidden="true" className={styles.glyphSpecular} />
    </div>
  );
}
