<script lang="ts">
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { accentTile } from '$lib/accents';
	import { spotlight } from '$lib/actions/spotlight';
	import { problems } from '$lib/data/problems';
</script>

<section
	id="problems"
	class="bg-surface-lowest/80 border-outline-subtle/30 w-full border-y py-20"
>
	<div class="mx-auto max-w-[1280px] px-6">
		<SectionHeading
			layout="split"
			eyebrow="Root Cause Remediation"
			title="Sound familiar?"
			lede="Where standard interpreted or garbage-collected runtimes hit an architectural ceiling, Rust delivers predictable zero-cost mechanical sympathy."
		/>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each problems as problem (problem.title)}
				<article
					use:spotlight
					class="spotlight-card card-line bg-surface-card/80 border-outline-subtle/40 hover:border-secondary/50 group flex flex-col justify-between rounded border p-6 shadow-lg"
				>
					<div>
						<div
							class="mb-4 flex h-10 w-10 items-center justify-center rounded border transition-transform group-hover:scale-105 {accentTile[
								problem.accent
							]}"
						>
							<Icon name={problem.icon} size={22} />
						</div>
						<h3 class="font-display mb-2 text-lg font-semibold text-white">{problem.title}</h3>
						<p class="text-on-surface-variant text-xs leading-relaxed">{problem.body}</p>
					</div>
					<div
						class="border-outline-subtle/30 font-mono mt-6 flex items-center justify-between gap-2 border-t pt-6 text-[10px] tracking-wider"
					>
						<span class="text-outline-subtle">{problem.symptom}</span>
						<span class="text-secondary font-semibold">{problem.fix}</span>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
