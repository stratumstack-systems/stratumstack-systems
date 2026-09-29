<script lang="ts">
	import Counter from './Counter.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { accentBar, numeralText } from '$lib/accents';
	import { spotlight } from '$lib/actions/spotlight';
	import { caseFilters, caseStudies } from '$lib/data/case-studies';
	import type { CaseCategory } from '$lib/types';

	let active = $state<CaseCategory | 'all'>('all');

	const shown = $derived(
		active === 'all' ? caseStudies : caseStudies.filter((c) => c.id === active)
	);
</script>

<section id="case-studies" class="mx-auto w-full max-w-[1280px] px-6 py-24">
	<SectionHeading
		layout="split"
		tight
		eyebrow="Production Telemetry"
		title="Results, not promises"
		lede="Real engineering impact verified across high-volume financial orderbooks, 50TB+ telemetry pipelines, and embedded robotics runtimes."
	/>

	<div
		class="border-outline-subtle/30 mb-8 flex flex-wrap items-center gap-2 border-b pb-4"
		role="tablist"
		aria-label="Filter case studies by sector"
	>
		{#each caseFilters as filter (filter.id)}
			<button
				type="button"
				role="tab"
				aria-selected={active === filter.id}
				class="font-mono rounded px-4 py-2 text-xs font-medium tracking-wide transition-all {active ===
				filter.id
					? 'bg-primary-container border-secondary/40 border text-white shadow-sm'
					: 'bg-surface-card text-on-surface-variant border-outline-subtle/30 border hover:text-white'}"
				onclick={() => (active = filter.id)}
			>
				{filter.label}
			</button>
		{/each}
	</div>

	<div class="space-y-8">
		{#each shown as study (study.id)}
			<article
				use:spotlight
				class="spotlight-card bg-surface-card/75 border-outline-subtle/40 grid grid-cols-1 items-center gap-8 rounded border p-8 shadow-xl lg:grid-cols-12 lg:p-10"
			>
				<div class="space-y-4 lg:col-span-7">
					<div class="flex flex-wrap items-center gap-2">
						<span
							class="bg-surface-high text-secondary border-secondary/30 font-mono rounded border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase"
							>{study.sector}</span
						>
						<span class="font-mono text-outline-subtle text-xs">{study.qualifier}</span>
					</div>

					<h3 class="font-display text-2xl font-semibold text-white">{study.title}</h3>

					<p class="text-on-surface-variant text-xs leading-relaxed">
						<strong class="text-white">The Challenge:</strong>
						{study.challenge}
					</p>
					<p class="text-on-surface-variant text-xs leading-relaxed">
						<strong class="text-white">Our Approach:</strong>
						{study.approach}
					</p>

					<blockquote class="bg-surface-lowest border-secondary mt-3 rounded border-l-2 p-4">
						<p class="font-editorial text-on-surface mb-2 text-base italic">
							&ldquo;{study.quote}&rdquo;
						</p>
						<cite class="font-mono text-on-surface-variant block text-xs font-medium not-italic"
							>{study.attribution}</cite
						>
					</blockquote>
				</div>

				<div
					class="bg-surface-lowest border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-inner lg:col-span-5"
				>
					<div class="font-mono text-outline-subtle mb-4 flex items-center justify-between text-xs">
						<span>{study.metricsTitle}</span>
						<span class="text-secondary">{study.metricsTag}</span>
					</div>

					<div class="space-y-6">
						{#each study.metrics as metric (metric.label)}
							<div>
								<div class="mb-1 flex items-baseline justify-between gap-3">
									<span class="text-on-surface text-xs">{metric.label}</span>
									<Counter
										spec={metric.counter}
										class="font-mono text-xl font-bold {numeralText[metric.numeralAccent]}"
									/>
								</div>
								<div
									class="bg-surface-high flex h-2 w-full overflow-hidden rounded-full"
									role="img"
									aria-label="{metric.label}: {metric.note}"
								>
									<div
										class="h-full rounded-full transition-all duration-1000 {metric.gradient
											? 'from-primary-container to-secondary bg-gradient-to-r'
											: accentBar[metric.barAccent]}"
										style="width: {metric.fill}%"
									></div>
								</div>
								<span class="font-mono text-outline-subtle mt-1 block text-[10px]">{metric.note}</span
								>
							</div>
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
