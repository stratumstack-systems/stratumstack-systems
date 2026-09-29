<script lang="ts">
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { guarantees } from '$lib/data/trust';
</script>

<section id="trust" class="bg-surface-lowest/80 border-outline-subtle/30 w-full border-y py-24">
	<div class="mx-auto max-w-[1280px] px-6">
		<SectionHeading
			layout="centered"
			eyebrow="Rigorous Governance"
			title="Enterprise-grade trust &amp; compliance"
			lede="Engineered to satisfy the stringent security, legal, and operational audits of European and North American enterprise organizations."
		/>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
			{#each guarantees as item (item.title)}
				<article
					use:spotlight
					class="spotlight-card bg-surface-card/75 border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-lg"
				>
					<div>
						<div
							class="bg-primary-container/20 text-secondary border-secondary/30 mb-4 flex h-8 w-8 items-center justify-center rounded border"
						>
							<Icon name={item.icon} size={20} />
						</div>
						<h3 class="font-display mb-2 text-sm font-semibold text-white">{item.title}</h3>
						<p class="text-on-surface-variant text-xs leading-relaxed">{item.body}</p>
					</div>
					<span class="font-mono text-secondary mt-4 block text-[9px] tracking-wider uppercase"
						>{item.tag}</span
					>
				</article>
			{/each}
		</div>
	</div>
</section>
