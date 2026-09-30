<script lang="ts">
	import CalendlyButton from './CalendlyButton.svelte';
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { pricingTiers } from '$lib/data/pricing';
</script>

<section
	id="pricing"
	class="bg-surface-lowest/80 border-outline-subtle/30 w-full border-b py-24"
>
	<div class="mx-auto max-w-[1280px] px-6">
		<SectionHeading
			layout="centered"
			eyebrow="Transparent Engagements"
			title="Clear scope. Clear pricing."
			lede="Fixed-price engineering packages or monthly retainers. No open-ended hourly billing, no surprises."
		/>

		<div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
			{#each pricingTiers as tier (tier.title)}
				<article
					use:spotlight
					class="spotlight-card relative flex flex-col justify-between rounded p-8 {tier.featured
						? 'bg-surface-card border-primary-container border-2 shadow-[0_0_35px_-5px_rgba(37,99,235,0.45)]'
						: 'bg-surface-card/70 border-outline-subtle/40 border shadow-xl'}"
				>
					{#if tier.badge}
						<div
							class="from-primary-container border-secondary/40 font-mono absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border bg-gradient-to-r to-blue-700 px-3.5 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-md"
						>
							{tier.badge}
						</div>
					{/if}

					<div>
						<div class="mb-4 flex items-center justify-between gap-2">
							<span class="font-mono text-secondary text-xs font-semibold tracking-wider"
								>{tier.kicker}</span
							>
							<span
								class="font-mono rounded px-2 py-0.5 text-[10px] whitespace-nowrap {tier.featured
									? 'text-secondary bg-primary-container/20 border-secondary/30 border font-medium'
									: 'text-on-surface-variant bg-surface-high border-outline-subtle/30 border'}"
								>{tier.duration}</span
							>
						</div>

						<h3 class="font-display mb-2 text-xl font-bold tracking-tight text-white">
							{tier.title}
						</h3>
						<p class="text-on-surface-variant mb-6 text-xs leading-relaxed">{tier.body}</p>

						<div class="mb-6 flex items-baseline">
							<span class="font-display text-3xl font-bold tracking-tight text-white"
								>{tier.price}</span
							>
							<span class="text-on-surface-variant ml-2 text-xs font-medium">{tier.cadence}</span>
						</div>

						<ul
							class="text-on-surface/90 border-outline-subtle/30 space-y-3 border-t pt-6 text-xs leading-normal"
						>
							{#each tier.features as feature (feature)}
								<li class="flex items-start gap-2.5">
									<Icon name="check_circle" size={16} class="text-secondary mt-0.5 shrink-0" />
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</div>

					<CalendlyButton
						label={tier.cta}
						variant={tier.featured ? 'tile-featured' : 'tile'}
						icon="arrow_forward"
						iconSize={15}
						utmContent={tier.utmContent}
					/>
				</article>
			{/each}
		</div>

		<div
			class="text-on-surface-variant/80 border-outline-subtle/30 font-mono mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs"
		>
			<div class="flex items-center gap-2">
				<Icon name="lock" size={17} class="text-secondary" />
				<span>Bilateral NDA signed prior to source disclosure. Invoiced in USD or EUR.</span>
			</div>
			<div class="flex items-center gap-3">
				<span>NO HIDDEN SETUP FEES</span>
				<span>•</span>
				<span>MONTH-TO-MONTH CANCELABLE</span>
			</div>
		</div>
	</div>
</section>
