/**
 * Content model for the Stratumstack marketing site.
 *
 * Every section renders from typed data in `$lib/data`, so copy changes
 * never require touching markup.
 */

/** A Material Symbols Outlined ligature name, e.g. `memory`, `bolt`. */
export type IconName = string;

/**
 * Accent roles in the Sapphire & Cobalt palette. `secondary` (sky) carries
 * almost every highlight; `danger` is reserved for the failure-mode card.
 */
export type Accent = 'secondary' | 'primary' | 'cobalt' | 'danger';

/** Numerals may also render plain white or in the default body colour. */
export type NumeralAccent = Accent | 'bright' | 'default';

export interface NavLink {
	label: string;
	href: string;
}

/** A number that counts up from zero when it scrolls into view. */
export interface CounterSpec {
	/** Final value. */
	target: number;
	/** Decimal places to show; 0 renders a thousands-separated integer. */
	decimals?: number;
	prefix?: string;
	suffix?: string;
}

export interface Stat {
	counter: CounterSpec;
	/** Rendered next to the numeral, e.g. "Years". */
	unit?: string;
	unitAccent?: NumeralAccent;
	numeralAccent: NumeralAccent;
	label: string;
}

export interface TrustChip {
	label: string;
	icon: IconName;
	accent: Accent;
}

export interface HeroBadge {
	eyebrow: string;
	region: string;
}

export interface HeroAssurance {
	icon: IconName;
	label: string;
}

/** One tab of the hero code terminal. */
export interface CodeTab {
	/** Stable key used for tab state. */
	id: string;
	/** Filename on the tab. */
	filename: string;
	/** Shown only on the active tab. */
	icon?: IconName;
	lines: CodeLine[];
}

export interface CodeLine {
	/** Indent depth; maps to a `pl-*` class. */
	indent?: 0 | 1 | 2 | 3;
	/** Renders as a dimmed italic comment. */
	comment?: boolean;
	/** Blank spacer line. */
	spacer?: boolean;
	spans?: CodeSpan[];
}

export interface CodeSpan {
	text: string;
	accent?: Accent | 'bright' | 'muted';
	bold?: boolean;
}

export interface LatencyBadge {
	label: string;
	before: string;
	after: string;
	delta: string;
}

export interface Problem {
	icon: IconName;
	accent: Accent;
	title: string;
	body: string;
	symptom: string;
	fix: string;
}

export interface Service {
	icon: IconName;
	tag: string;
	title: string;
	body: string;
	/** Revealed on hover, prefixed with a turnstile arrow. */
	deliverables: string[];
	stack: string[];
}

export interface EditorialQuote {
	eyebrow: string;
	/** Text before the emphasised phrase. */
	lead: string;
	/** Rendered upright in display type. */
	emphasis: string;
	/** Text after the emphasised phrase. */
	tail: string;
	attribution: string;
}

export interface PricingTier {
	kicker: string;
	duration: string;
	title: string;
	body: string;
	price: string;
	cadence: string;
	features: string[];
	cta: string;
	href: string;
	/** Renders the highlighted "most popular" treatment. */
	featured?: boolean;
	badge?: string;
}

export interface Metric {
	label: string;
	counter: CounterSpec;
	numeralAccent: NumeralAccent;
	/** Bar fill as a percentage, 0-100. */
	fill: number;
	/** `true` renders the bar as a cobalt-to-sky gradient. */
	gradient?: boolean;
	barAccent: Accent;
	note: string;
}

/** Category key used by the case-study filter. */
export type CaseCategory = 'fintech' | 'observability' | 'robotics';

export interface CaseStudy {
	id: CaseCategory;
	sector: string;
	qualifier: string;
	title: string;
	challenge: string;
	approach: string;
	quote: string;
	attribution: string;
	metricsTitle: string;
	metricsTag: string;
	metrics: Metric[];
}

export interface CaseFilter {
	id: CaseCategory | 'all';
	label: string;
}

export interface Crate {
	name: string;
	description: string;
	downloads: string;
}

export interface Article {
	meta: string;
	title: string;
	excerpt: string;
	href: string;
}

export interface Talk {
	event: string;
	location: string;
	title: string;
	body: string;
	/** Highlights the meta row (used for the community entry). */
	highlight?: boolean;
}

export interface ProcessStep {
	number: string;
	title: string;
	body: string;
	/** `start` and `end` steps get gradient markers; the rest are outlined. */
	emphasis?: 'start' | 'end';
}

export interface ClockRow {
	city: string;
	time: string;
	active?: boolean;
}

export interface Guarantee {
	icon: IconName;
	title: string;
	body: string;
	tag: string;
}

export interface BookingSlot {
	label: string;
}

export interface FooterLink {
	label: string;
	href: string;
}
