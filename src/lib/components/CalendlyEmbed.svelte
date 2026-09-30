<script lang="ts">
	import Icon from './Icon.svelte';
	import { loadWidget, onCalendlyEvent, schedulingUrl, utmFor } from '$lib/calendly';
	import { calendly } from '$lib/data/calendly';
	import { site } from '$lib/data/site';
	import type { CalendlyPrefill } from '$lib/types';

	interface Props {
		/** Tags the booking in Calendly, e.g. `cta-section`. */
		utmContent?: string;
		prefill?: CalendlyPrefill;
		/** Height reserved for the calendar; also the skeleton's height. */
		minHeight?: number;
		/** Fires once the visitor has actually booked. */
		onScheduled?: () => void;
		class?: string;
	}

	let {
		utmContent = 'inline-embed',
		prefill,
		minHeight = 700,
		onScheduled,
		class: className = ''
	}: Props = $props();

	const href = $derived(schedulingUrl(calendly.url, utmContent));

	let host = $state<HTMLDivElement | null>(null);
	let status = $state<'waiting' | 'loading' | 'ready' | 'failed'>('waiting');

	/**
	 * The widget is only fetched once the section is close to the viewport —
	 * `#book` sits at the bottom of a long page, so most visitors never pay for
	 * the script until they scroll with intent.
	 */
	$effect(() => {
		const el = host;
		if (!el) return;

		let cancelled = false;
		let started = false;

		const init = async () => {
			if (started || cancelled) return;
			started = true;
			status = 'loading';

			try {
				const api = await loadWidget();
				if (cancelled) return;
				api.initInlineWidget({
					url: href,
					parentElement: el,
					prefill,
					utm: utmFor(utmContent)
				});
				status = 'ready';
			} catch {
				if (!cancelled) status = 'failed';
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					observer.disconnect();
					void init();
				}
			},
			{ rootMargin: '400px' }
		);

		observer.observe(el);

		return () => {
			cancelled = true;
			observer.disconnect();
		};
	});

	$effect(() =>
		onCalendlyEvent((event) => {
			if (event === 'calendly.event_scheduled') onScheduled?.();
		})
	);
</script>

<div
	class="border-outline-subtle/40 relative overflow-hidden rounded border bg-[#0b0e18]/90 shadow-xl backdrop-blur-md {className}"
>
	<div class="border-outline-subtle/30 flex items-center justify-between border-b px-5 py-4">
		<div class="flex items-center gap-2.5">
			<div
				class="bg-primary-container/20 border-secondary/40 text-secondary font-mono flex h-9 w-9 items-center justify-center rounded border text-xs font-bold"
			>
				SS
			</div>
			<div>
				<span class="font-display block text-sm leading-tight font-semibold text-white"
					>{calendly.eventLabel}</span
				>
				<span class="font-mono text-on-surface-variant text-[11px]">{calendly.eventDuration}</span>
			</div>
		</div>
		<span
			class="bg-secondary/15 text-secondary border-secondary/30 font-mono rounded border px-2 py-0.5 text-[10px]"
			>Live Availability</span
		>
	</div>

	<div class="relative" style="min-height: {minHeight}px">
		<!-- Calendly replaces this element's contents with its iframe. -->
		<div
			bind:this={host}
			class="calendly-inline-widget h-full w-full"
			style="min-width: 320px; height: {minHeight}px"
			data-auto-load="false"
		></div>

		{#if status !== 'ready'}
			<div class="absolute inset-0 flex items-center justify-center p-6">
				{#if status === 'loading'}
					<div class="w-full max-w-sm space-y-3" aria-hidden="true">
						<div
							class="bg-surface-high/60 h-5 w-2/3 animate-pulse rounded motion-reduce:animate-none"
						></div>
						<div class="grid grid-cols-7 gap-2">
							{#each Array.from({ length: 21 }, (_, i) => i) as cell (cell)}
								<div
									class="bg-surface-high/40 h-8 animate-pulse rounded motion-reduce:animate-none"
								></div>
							{/each}
						</div>
					</div>
					<span class="sr-only">Loading available times…</span>
				{:else}
					<!--
						`waiting` is what a visitor without JavaScript sees, since the embed
						never initialises for them — so this state has to be a usable
						booking path, not a spinner. `failed` lands here too.
					-->
					<div class="max-w-xs space-y-4 text-center">
						<Icon name="calendar_month" size={28} class="text-secondary" />
						<p class="text-on-surface-variant text-sm leading-relaxed">
							{status === 'failed'
								? 'The scheduler could not load — an ad or tracker blocker will do that. Open it directly, or just email us.'
								: 'Open the scheduler to see live availability, or email us directly.'}
						</p>
						<div class="flex flex-col items-center gap-2">
							<a
								class="font-mono from-primary-container border-secondary/40 inline-flex items-center gap-2 rounded border bg-gradient-to-r to-blue-700 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:from-blue-600 hover:to-blue-800"
								{href}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>Open Calendly</span>
								<Icon name="open_in_new" size={15} class="text-secondary" />
							</a>
							<a
								class="glide-link text-on-surface hover:text-secondary font-mono text-xs transition-colors"
								href="mailto:{site.email}"
							>
								{site.email}
							</a>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
