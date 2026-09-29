<script lang="ts">
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { clockRows, engagementModels, processSteps, standupLines } from '$lib/data/process';
</script>

<section id="process" class="mx-auto w-full max-w-[1280px] px-6 py-24">
	<SectionHeading
		eyebrow="Delivery Cadence"
		title="Remote, but never distant"
		lede="A structured engineering partnership designed for asynchronous velocity, zero communication friction, and continuous delivery."
	/>

	<ol class="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
		{#each processSteps as step (step.number)}
			<li
				use:spotlight
				class="spotlight-card bg-surface-card border-outline-subtle/30 rounded border p-5"
			>
				<div
					class="font-mono mb-3 flex h-10 w-10 items-center justify-center rounded text-sm font-bold text-white {step.emphasis ===
					'start'
						? 'from-primary-container border-secondary/40 border bg-gradient-to-br to-blue-700 shadow-[0_0_14px_rgba(37,99,235,0.4)]'
						: step.emphasis === 'end'
							? 'from-secondary/40 border-secondary/40 border bg-gradient-to-br to-blue-600'
							: 'bg-surface-high border-outline-subtle border'}"
				>
					{step.number}
				</div>
				<h3 class="font-display mb-1 text-sm font-semibold text-white">{step.title}</h3>
				<p class="text-on-surface-variant text-xs">{step.body}</p>
			</li>
		{/each}
	</ol>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<article
			use:spotlight
			class="spotlight-card bg-surface-card/75 border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-xl"
		>
			<div>
				<div
					class="bg-secondary/15 border-secondary/30 text-secondary mb-4 flex h-10 w-10 items-center justify-center rounded border"
				>
					<Icon name="schedule" size={22} />
				</div>
				<h3 class="font-display mb-2 text-lg font-semibold text-white">
					The 24-Hour Velocity Advantage
				</h3>
				<p class="text-on-surface-variant mb-6 text-xs leading-relaxed">
					Operating from India (UTC+5:30) allows 4+ hours of active real-time overlap with London
					and US East Coast mornings. Your team reviews at night; we implement, test, and push
					before your morning coffee.
				</p>

				<div
					class="bg-surface-lowest border-outline-subtle/30 font-mono space-y-2 rounded border p-3 text-[11px]"
				>
					{#each clockRows as row (row.city)}
						<div
							class="flex items-center justify-between gap-2 {row.active
								? 'text-secondary font-semibold'
								: ''}"
						>
							<span class={row.active ? '' : 'text-on-surface-variant'}>{row.city}</span>
							<span class={row.active ? '' : 'text-white'}>{row.time}</span>
						</div>
					{/each}
				</div>
			</div>
			<div
				class="border-outline-subtle/30 font-mono text-secondary mt-4 flex items-center gap-1.5 border-t pt-4 text-[11px]"
			>
				<span class="bg-secondary h-1.5 w-1.5 animate-ping rounded-full"></span>
				<span>True 24-hour round-the-clock shipping</span>
			</div>
		</article>

		<article
			use:spotlight
			class="spotlight-card bg-surface-card/75 border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-xl"
		>
			<div>
				<div
					class="bg-primary-container/20 border-secondary/30 text-secondary mb-4 flex h-10 w-10 items-center justify-center rounded border"
				>
					<Icon name="chat" size={22} />
				</div>
				<h3 class="font-display mb-2 text-lg font-semibold text-white">
					Transparent, Noise-Free Channels
				</h3>
				<p class="text-on-surface-variant mb-6 text-xs leading-relaxed">
					Direct access to senior Rust engineers via your shared Slack or Teams channels. Daily
					concise written standups, crisp async Loom walkthroughs, and zero junior agency overhead.
				</p>

				<div
					class="bg-surface-lowest border-outline-subtle/30 font-mono text-on-surface-variant space-y-1 rounded border p-3 text-[11px]"
				>
					<div class="text-secondary font-semibold">// Async Daily Check-in</div>
					{#each standupLines as line (line)}
						<div>{line}</div>
					{/each}
				</div>
			</div>
			<div
				class="border-outline-subtle/30 font-mono text-secondary mt-4 flex items-center gap-1.5 border-t pt-4 text-[11px]"
			>
				<Icon name="done_all" size={16} />
				<span>Direct developer-to-developer collaboration</span>
			</div>
		</article>

		<article
			use:spotlight
			class="spotlight-card bg-surface-card/75 border-outline-subtle/30 flex flex-col justify-between rounded border p-6 shadow-xl"
		>
			<div>
				<div
					class="bg-primary-container/20 border-secondary/30 text-secondary mb-4 flex h-10 w-10 items-center justify-center rounded border"
				>
					<Icon name="handshake" size={22} />
				</div>
				<h3 class="font-display mb-2 text-lg font-semibold text-white">
					Flexible Engagement Models
				</h3>
				<p class="text-on-surface-variant mb-6 text-xs leading-relaxed">
					Adapt our involvement to your stage. Kick off with a rapid 1-week assessment, scale up into
					a turnkey performance sprint, or retain dedicated monthly senior capacity as your core team
					scales.
				</p>

				<ul class="font-mono space-y-2 text-xs">
					{#each engagementModels as model (model)}
						<li class="flex items-center gap-2 text-white">
							<Icon name="check" size={16} class="text-secondary" />
							<span>{model}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div
				class="border-outline-subtle/30 font-mono text-secondary mt-4 flex items-center gap-1.5 border-t pt-4 text-[11px]"
			>
				<Icon name="verified" size={16} />
				<span>Zero long-term lock-in</span>
			</div>
		</article>
	</div>
</section>
