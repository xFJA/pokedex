/**
 * This object is created to store the background color class for each Pokémon type.
 *
 * ⚠️ IMPORTANT: If you want to use dynamic class names (e.g., `bg-type-${type}-500`),
 * Tailwind CSS cannot recognize or generate the corresponding CSS unless those classes
 * are defined statically somewhere in your codebase or explicitly safelisted in your
 * tailwind.config.js. This is because Tailwind scans for literal class names at build time.
 *
 * By using this mapping, you ensure that all required classes are present as static strings,
 * so Tailwind will generate the correct CSS for each type and color level.
 *
 * Example usage:
 *   TYPE_BG_CLASS['fire'][500] // => 'bg-type-fire-500'
 */

export const TYPE_BG_CLASS: Record<string, Record<number, string>> = {
  normal: {
    100: 'bg-type-normal-100',
    300: 'bg-type-normal-300',
    500: 'bg-type-normal-500',
    700: 'bg-type-normal-700',
    900: 'bg-type-normal-900',
  },
  fire: {
    100: 'bg-type-fire-100',
    300: 'bg-type-fire-300',
    500: 'bg-type-fire-500',
    700: 'bg-type-fire-700',
    900: 'bg-type-fire-900',
  },
  water: {
    100: 'bg-type-water-100',
    300: 'bg-type-water-300',
    500: 'bg-type-water-500',
    700: 'bg-type-water-700',
    900: 'bg-type-water-900',
  },
  electric: {
    100: 'bg-type-electric-100',
    300: 'bg-type-electric-300',
    500: 'bg-type-electric-500',
    700: 'bg-type-electric-700',
    900: 'bg-type-electric-900',
  },
  grass: {
    100: 'bg-type-grass-100',
    300: 'bg-type-grass-300',
    500: 'bg-type-grass-500',
    700: 'bg-type-grass-700',
    900: 'bg-type-grass-900',
  },
  ice: {
    100: 'bg-type-ice-100',
    300: 'bg-type-ice-300',
    500: 'bg-type-ice-500',
    700: 'bg-type-ice-700',
    900: 'bg-type-ice-900',
  },
  fighting: {
    100: 'bg-type-fighting-100',
    300: 'bg-type-fighting-300',
    500: 'bg-type-fighting-500',
    700: 'bg-type-fighting-700',
    900: 'bg-type-fighting-900',
  },
  poison: {
    100: 'bg-type-poison-100',
    300: 'bg-type-poison-300',
    500: 'bg-type-poison-500',
    700: 'bg-type-poison-700',
    900: 'bg-type-poison-900',
  },
  ground: {
    100: 'bg-type-ground-100',
    300: 'bg-type-ground-300',
    500: 'bg-type-ground-500',
    700: 'bg-type-ground-700',
    900: 'bg-type-ground-900',
  },
  flying: {
    100: 'bg-type-flying-100',
    300: 'bg-type-flying-300',
    500: 'bg-type-flying-500',
    700: 'bg-type-flying-700',
    900: 'bg-type-flying-900',
  },
  psychic: {
    100: 'bg-type-psychic-100',
    300: 'bg-type-psychic-300',
    500: 'bg-type-psychic-500',
    700: 'bg-type-psychic-700',
    900: 'bg-type-psychic-900',
  },
  bug: {
    100: 'bg-type-bug-100',
    300: 'bg-type-bug-300',
    500: 'bg-type-bug-500',
    700: 'bg-type-bug-700',
    900: 'bg-type-bug-900',
  },
  rock: {
    100: 'bg-type-rock-100',
    300: 'bg-type-rock-300',
    500: 'bg-type-rock-500',
    700: 'bg-type-rock-700',
    900: 'bg-type-rock-900',
  },
  ghost: {
    100: 'bg-type-ghost-100',
    300: 'bg-type-ghost-300',
    500: 'bg-type-ghost-500',
    700: 'bg-type-ghost-700',
    900: 'bg-type-ghost-900',
  },
  dragon: {
    100: 'bg-type-dragon-100',
    300: 'bg-type-dragon-300',
    500: 'bg-type-dragon-500',
    700: 'bg-type-dragon-700',
    900: 'bg-type-dragon-900',
  },
  dark: {
    100: 'bg-type-dark-100',
    300: 'bg-type-dark-300',
    500: 'bg-type-dark-500',
    700: 'bg-type-dark-700',
    900: 'bg-type-dark-900',
  },
  steel: {
    100: 'bg-type-steel-100',
    300: 'bg-type-steel-300',
    500: 'bg-type-steel-500',
    700: 'bg-type-steel-700',
    900: 'bg-type-steel-900',
  },
  fairy: {
    100: 'bg-type-fairy-100',
    300: 'bg-type-fairy-300',
    500: 'bg-type-fairy-500',
    700: 'bg-type-fairy-700',
    900: 'bg-type-fairy-900',
  },
};
