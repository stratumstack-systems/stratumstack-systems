<script lang="ts">
	import type { CounterSpec } from '$lib/types';

	interface Props {
		spec: CounterSpec;
		class?: string;
	}

	let { spec, class: className = '' }: Props = $props();

	const format = (value: number) =>
		(spec.prefix ?? '') +
		(spec.decimals ? value.toFixed(spec.decimals) : Math.floor(value).toLocaleString()) +
		(spec.suffix ?? '');

	/** Rendered server-side and before the animation starts, so the number is
	 *  correct without JS and never flashes as a placeholder zero. */
	const settled = $derived(format(spec.target));
	/** Non-null only while counting up. */
	let animating = $state<string | null>(null);

	const display = $derived(animating ?? settled);

	let el: HTMLElement;

	$effect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced || spec.target === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				observer.disconnect();

				const duration = 1600;
				let start: number | null = null;

				const step = (now: number) => {
					start ??= now;
					const progress = Math.min((now - start) / duration, 1);
					// Ease-out cubic.
					animating = format((1 - Math.pow(1 - progress, 3)) * spec.target);
					if (progress < 1) requestAnimationFrame(step);
					else animating = null;
				};

				requestAnimationFrame(step);
			},
			{ threshold: 0.25 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<span bind:this={el} class={className}>{display}</span>
