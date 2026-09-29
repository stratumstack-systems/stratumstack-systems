<script lang="ts">
	import Icon from './Icon.svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { services } from '$lib/data/services';
</script>

<section id="services" class="mx-auto w-full max-w-[1280px] px-6 py-24">
	<div class="mb-14">
		<div
			class="bg-surface-card border-outline-subtle/30 mb-3 inline-flex items-center gap-2 rounded border px-3 py-1"
		>
			<Icon name="terminal" size={16} class="text-secondary" />
			<span class="font-mono text-secondary text-xs tracking-wider uppercase"
				>Modular Architecture Scope</span
			>
		</div>
		<h2 class="font-display mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
			What we do
		</h2>
		<p class="text-on-surface-variant max-w-2xl text-base">
			Specialized bare-metal and high-concurrency systems engineering from greenfield architectural
			design to mission-critical hot-path rewrites. Hover cards to reveal engineering deliverables.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each services as service (service.title)}
			<article
				use:spotlight
				class="spotlight-card card-line bg-surface-card/75 border-outline-subtle/40 hover:border-secondary/50 group flex flex-col justify-between rounded border p-7 shadow-xl"
			>
				<div>
					<div class="mb-4 flex items-center justify-between">
						<Icon
							name={service.icon}
							size={26}
							class="text-secondary transition-colors group-hover:text-white"
						/>
						<div class="flex items-center gap-1.5">
							<span
								class="font-mono text-outline-subtle bg-surface-high border-outline-subtle/30 rounded border px-2 py-0.5 text-[10px] uppercase"
								>{service.tag}</span
							>
							<Icon
								name="arrow_forward"
								size={16}
								class="text-secondary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
							/>
						</div>
					</div>

					<h3
						class="font-display group-hover:text-secondary mb-2 text-lg font-semibold text-white transition-colors"
					>
						{service.title}
					</h3>
					<p class="text-on-surface-variant mb-4 text-xs leading-relaxed">{service.body}</p>

					<!-- Deliverables stay collapsed until the card is hovered. -->
					<div
						class="border-outline-subtle/20 max-h-0 overflow-hidden border-t pt-0 transition-all duration-300 ease-in-out group-hover:max-h-24 group-hover:pt-2"
					>
						<ul class="font-mono text-primary space-y-1 text-[11px]">
							{#each service.deliverables as item (item)}
								<li>↳ {item}</li>
							{/each}
						</ul>
					</div>
				</div>

				<ul
					class="border-outline-subtle/30 font-mono text-secondary flex flex-wrap gap-1.5 border-t pt-4 text-[10px]"
				>
					{#each service.stack as item (item)}
						<li class="bg-surface-lowest border-outline-subtle/20 rounded border px-2 py-0.5">
							{item}
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>
