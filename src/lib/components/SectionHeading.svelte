<script lang="ts">
	interface Props {
		eyebrow: string;
		title: string;
		lede?: string;
		/** `split` floats the lede right on wide screens. */
		layout?: 'stacked' | 'split' | 'centered';
		/** Tightens the bottom margin (used above the case-study filter). */
		tight?: boolean;
	}

	let { eyebrow, title, lede, layout = 'stacked', tight = false }: Props = $props();
</script>

{#if layout === 'split'}
	<div
		class="flex flex-col justify-between gap-4 md:flex-row md:items-end {tight ? 'mb-8' : 'mb-12'}"
	>
		<div>
			<span class="font-mono text-secondary mb-1 block text-xs tracking-widest uppercase"
				>{eyebrow}</span
			>
			<h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
		</div>
		{#if lede}
			<p class="text-on-surface-variant max-w-md text-sm leading-relaxed">{lede}</p>
		{/if}
	</div>
{:else if layout === 'centered'}
	<div class="mx-auto mb-16 max-w-2xl text-center">
		<span class="font-mono text-secondary mb-1 block text-xs tracking-widest uppercase">{eyebrow}</span
		>
		<h2 class="font-display mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
			{title}
		</h2>
		{#if lede}
			<p class="text-on-surface-variant text-sm">{lede}</p>
		{/if}
	</div>
{:else}
	<div class="mb-14">
		<span class="font-mono text-secondary mb-1 block text-xs tracking-widest uppercase">{eyebrow}</span
		>
		<h2 class="font-display mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
			{title}
		</h2>
		{#if lede}
			<p class="text-on-surface-variant max-w-2xl text-base">{lede}</p>
		{/if}
	</div>
{/if}
