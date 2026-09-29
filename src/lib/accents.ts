import type { Accent, NumeralAccent } from '$lib/types';

/**
 * Tailwind only compiles class names it can see as literal strings, so
 * `text-{accent}` never works. Each variant is spelled out here and looked
 * up by role.
 */

export const accentText: Record<Accent, string> = {
	secondary: 'text-secondary',
	primary: 'text-primary',
	cobalt: 'text-primary-container',
	danger: 'text-red-400'
};

/** Icon tile: soft wash + hairline border + tinted glyph. */
export const accentTile: Record<Accent, string> = {
	secondary: 'bg-secondary/15 border-secondary/30 text-secondary',
	primary: 'bg-primary-container/20 border-primary-container/40 text-primary',
	cobalt: 'bg-primary-container/20 border-primary-container/40 text-secondary',
	danger: 'bg-red-500/10 border-red-500/30 text-red-400'
};

/** Solid fill for metric bars. */
export const accentBar: Record<Accent, string> = {
	secondary: 'bg-secondary',
	primary: 'bg-primary',
	cobalt: 'bg-primary-container',
	danger: 'bg-red-500'
};

/** Numerals in the stat strip and case-study metrics. */
export const numeralText: Record<NumeralAccent, string> = {
	secondary: 'text-secondary',
	primary: 'text-primary',
	cobalt: 'text-primary-container',
	danger: 'text-red-400',
	bright: 'text-white',
	default: 'text-on-surface'
};

/** Code-span colours inside the hero terminal. */
export const codeSpanClass: Record<Accent | 'bright' | 'muted', string> = {
	secondary: 'text-secondary',
	primary: 'text-primary',
	cobalt: 'text-primary-container',
	danger: 'text-red-400',
	bright: 'text-white',
	muted: 'text-outline-subtle'
};
