<script lang="ts">
	import Icon from './Icon.svelte';
	import { openPopup, schedulingUrl } from '$lib/calendly';
	import { calendly } from '$lib/data/calendly';
	import type { CalendlyPrefill, IconName } from '$lib/types';

	/**
	 * The recurring button recipes, so call sites name an intent rather than
	 * repeating forty Tailwind classes. `class` is appended and wins.
	 */
	type Variant = 'primary' | 'compact' | 'ghost' | 'tile' | 'tile-featured';

	interface Props {
		label: string;
		variant?: Variant;
		icon?: IconName;
		iconSize?: number;
		/** Tags the booking in Calendly, e.g. `header`, `pricing-retainer`. */
		utmContent?: string;
		prefill?: CalendlyPrefill;
		class?: string;
	}

	let {
		label,
		variant = 'primary',
		icon = 'arrow_forward',
		iconSize = 18,
		utmContent,
		prefill,
		class: className = ''
	}: Props = $props();

	const variants: Record<Variant, string> = {
		primary:
			'group font-mono from-primary-container border-secondary/40 inline-flex items-center justify-center gap-2 rounded border bg-gradient-to-r to-blue-700 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_-4px_rgba(37,99,235,0.5)] transition-all duration-200 hover:from-blue-600 hover:to-blue-800',
		compact:
			'font-mono from-primary-container border-secondary/40 group inline-flex items-center gap-1.5 rounded border bg-gradient-to-r to-blue-700 px-3 py-1.5 text-[11px] font-medium tracking-wide whitespace-nowrap text-white shadow-[0_0_15px_-2px_rgba(37,99,235,0.4)] transition-all hover:from-blue-600 hover:to-blue-800 sm:px-4 sm:py-2 sm:text-xs',
		ghost:
			'glide-link group text-on-surface hover:text-secondary font-mono inline-flex items-center gap-2 px-4 py-3 text-sm font-medium tracking-wide transition-colors',
		tile: 'font-mono group mt-8 flex w-full items-center justify-center gap-1.5 rounded py-3 text-center text-xs font-semibold tracking-wide transition-all bg-surface-high border-outline-subtle/40 hover:border-secondary/50 border text-white',
		'tile-featured':
			'font-mono group mt-8 flex w-full items-center justify-center gap-1.5 rounded py-3 text-center text-xs font-semibold tracking-wide transition-all from-primary-container border-secondary/40 border bg-gradient-to-r to-blue-700 text-white shadow-lg hover:from-blue-600 hover:to-blue-800'
	};

	let opening = $state(false);

	/**
	 * A real link, enhanced into an overlay. Without JS — or with the widget
	 * blocked — the href still takes the visitor to the Calendly page, so the
	 * call is always bookable.
	 */
	const href = $derived(schedulingUrl(calendly.url, utmContent));

	async function open(event: MouseEvent) {
		// Leave modified clicks (⌘/ctrl/shift/middle) to the browser's own
		// new-tab handling rather than hijacking them into the overlay.
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

		event.preventDefault();
		opening = true;
		try {
			await openPopup(utmContent, prefill);
		} catch {
			window.open(href, '_blank', 'noopener,noreferrer');
		} finally {
			opening = false;
		}
	}
</script>

<a
	class="{variants[variant]} {className}"
	{href}
	target="_blank"
	rel="noopener noreferrer"
	aria-busy={opening}
	onclick={open}
>
	<span>{label}</span>
	<Icon
		name={icon}
		size={iconSize}
		class="{variant === 'ghost'
			? ''
			: 'text-secondary'} transition-transform group-hover:translate-x-0.5"
	/>
</a>
