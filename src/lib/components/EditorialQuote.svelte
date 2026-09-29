<script lang="ts">
	import { editorialQuote as quote } from '$lib/data/services';
</script>

<section
	class="border-outline-subtle/30 relative w-full overflow-hidden border-y bg-[#0b0e18] py-20"
>
	<div
		class="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]"
	></div>

	<div class="relative z-10 mx-auto max-w-[1080px] px-6 text-center">
		<span class="font-mono text-secondary mb-4 block text-xs tracking-[0.25em] uppercase"
			>{quote.eyebrow}</span
		>
		<blockquote
			class="font-editorial mx-auto max-w-4xl text-2xl leading-snug font-normal tracking-tight text-white italic sm:text-3xl md:text-4xl"
		>
			&ldquo;{quote.lead}<span class="text-secondary font-display font-semibold not-italic"
				>{quote.emphasis}</span
			>{quote.tail}&rdquo;
		</blockquote>
		<div class="mt-6 flex items-center justify-center gap-3">
			<div class="bg-secondary/60 h-px w-8"></div>
			<span class="font-mono text-on-surface-variant text-[11px] tracking-wider uppercase"
				>{quote.attribution}</span
			>
			<div class="bg-secondary/60 h-px w-8"></div>
		</div>
	</div>
</section>
