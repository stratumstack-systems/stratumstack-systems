<script lang="ts">
	import Counter from './Counter.svelte';
	import Icon from './Icon.svelte';
	import MoreLink from './MoreLink.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { articles, crateTotal, crates, proofLinks, talks } from '$lib/data/proof';
</script>

<section id="proof" class="bg-surface-lowest/80 border-outline-subtle/30 w-full border-y py-24">
	<div class="mx-auto max-w-[1280px] px-6">
		<SectionHeading
			eyebrow="Ecosystem Stewardship"
			title="Built in the open"
			lede="We don't just write Rust for hire. We maintain foundational crates, publish in-depth systems research, and lead developer communities worldwide."
		/>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Open source -->
			<article
				use:spotlight
				class="spotlight-card bg-surface-card/75 border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-xl"
			>
				<div>
					<div class="border-outline-subtle/30 mb-4 flex items-center justify-between border-b pb-4">
						<span class="font-display flex items-center gap-2 text-lg font-semibold text-white">
							<Icon name="package_2" size={20} class="text-secondary" />
							Open Source Impact
						</span>
						<span
							class="font-mono bg-secondary/15 text-secondary border-secondary/30 rounded border px-2 py-0.5 text-[10px]"
							>CRATES.IO</span
						>
					</div>

					<div
						class="bg-surface-lowest border-outline-subtle/30 mb-6 flex items-center justify-between rounded border p-4"
					>
						<div>
							<span class="font-mono text-outline-subtle block text-[11px]">TOTAL CRATE DOWNLOADS</span
							>
							<Counter spec={crateTotal} class="font-mono text-2xl font-bold text-white" />
						</div>
						<Icon name="download_done" size={32} class="text-secondary/40" />
					</div>

					<ul class="font-mono space-y-3 text-xs">
						{#each crates as crate (crate.name)}
							<li
								class="bg-surface-lowest border-outline-subtle/30 hover:border-secondary/40 flex items-center justify-between gap-3 rounded border p-3 transition-colors"
							>
								<div>
									<span class="text-secondary font-semibold">{crate.name}</span>
									<span class="text-on-surface-variant block font-sans text-[11px]"
										>{crate.description}</span
									>
								</div>
								<span class="text-outline-subtle shrink-0">{crate.downloads}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div
					class="border-outline-subtle/30 font-mono mt-6 flex items-center justify-between border-t pt-6 text-xs"
				>
					<span class="text-on-surface-variant">40+ Public Repositories</span>
					<MoreLink label="View GitHub" href={proofLinks.github} />
				</div>
			</article>

			<!-- Writing -->
			<article
				use:spotlight
				class="spotlight-card bg-surface-card/75 border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-xl"
			>
				<div>
					<div class="border-outline-subtle/30 mb-4 flex items-center justify-between border-b pb-4">
						<span class="font-display flex items-center gap-2 text-lg font-semibold text-white">
							<Icon name="menu_book" size={20} class="text-secondary" />
							Deep Systems Writing
						</span>
						<span
							class="font-mono bg-primary-container/20 text-secondary border-secondary/30 rounded border px-2 py-0.5 text-[10px]"
							>RESEARCH</span
						>
					</div>

					<div class="space-y-4">
						{#each articles as article (article.title)}
							<a
								class="bg-surface-lowest border-outline-subtle/30 hover:border-secondary/50 group block rounded border p-3.5 transition-colors"
								href={article.href}
							>
								<span class="font-mono text-secondary mb-1 block text-[10px]">{article.meta}</span>
								<h4
									class="font-display group-hover:text-secondary mb-1 text-sm font-semibold text-white transition-colors"
								>
									{article.title}
								</h4>
								<p class="text-on-surface-variant text-xs">{article.excerpt}</p>
							</a>
						{/each}
					</div>
				</div>

				<div
					class="border-outline-subtle/30 font-mono mt-6 flex items-center justify-between border-t pt-6 text-xs"
				>
					<span class="text-on-surface-variant">Published in Systems Weekly</span>
					<MoreLink label="Read All Articles" href={proofLinks.articles} />
				</div>
			</article>

			<!-- Talks -->
			<article
				use:spotlight
				class="spotlight-card bg-surface-card/75 border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-xl"
			>
				<div>
					<div class="border-outline-subtle/30 mb-4 flex items-center justify-between border-b pb-4">
						<span class="font-display flex items-center gap-2 text-lg font-semibold text-white">
							<Icon name="podium" size={20} class="text-secondary" />
							Talks &amp; Community
						</span>
						<span
							class="font-mono bg-primary-container/20 text-secondary border-secondary/30 rounded border px-2 py-0.5 text-[10px]"
							>KEYNOTES</span
						>
					</div>

					<div class="space-y-4">
						{#each talks as talk (talk.title)}
							<div class="bg-surface-lowest border-outline-subtle/30 rounded border p-3.5">
								<div
									class="font-mono mb-1 flex items-center justify-between gap-2 text-[10px] {talk.highlight
										? 'text-secondary'
										: 'text-outline-subtle'}"
								>
									<span>{talk.event}</span>
									<span>{talk.location}</span>
								</div>
								<h4 class="font-display mb-1 text-sm font-semibold text-white">{talk.title}</h4>
								<p class="text-on-surface-variant text-xs">{talk.body}</p>
							</div>
						{/each}
					</div>
				</div>

				<div
					class="border-outline-subtle/30 font-mono mt-6 flex items-center justify-between border-t pt-6 text-xs"
				>
					<span class="text-on-surface-variant">Recordings on YouTube</span>
					<MoreLink label="View Sessions" icon="open_in_new" href={proofLinks.sessions} />
				</div>
			</article>
		</div>
	</div>
</section>
