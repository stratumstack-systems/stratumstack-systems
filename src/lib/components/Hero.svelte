<script lang="ts">
	import CodeTerminal from './CodeTerminal.svelte';
	import Counter from './Counter.svelte';
	import Icon from './Icon.svelte';
	import { accentText, numeralText } from '$lib/accents';
	import {
		codeTabs,
		heroAssurances,
		heroBadge,
		heroStats,
		latencyBadge,
		trustChips
	} from '$lib/data/site';
</script>

<!--
	`overflow-hidden` contains the two ambient glows below, which are sized and
	offset past the section box on purpose. Clipping here rather than on <body>
	keeps the fixed header sized to the viewport.
-->
<section
	id="top"
	class="relative mx-auto w-full max-w-[1280px] overflow-hidden px-6 py-16 lg:py-24"
>
	<div
		class="bg-primary-container/15 pointer-events-none absolute -top-10 left-1/4 -z-10 h-96 w-96 rounded-full blur-[120px]"
	></div>
	<div
		class="bg-secondary/10 pointer-events-none absolute top-1/3 right-10 -z-10 h-80 w-80 rounded-full blur-[100px]"
	></div>

	<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
		<div class="flex flex-col gap-6 lg:col-span-7">
			<div
				class="bg-surface-card border-outline-subtle/40 inline-flex flex-wrap items-center gap-2 self-start rounded border px-3 py-1"
			>
				<span class="bg-secondary h-2 w-2 animate-pulse rounded-full"></span>
				<span class="font-mono text-secondary text-[11px] font-medium tracking-widest uppercase"
					>{heroBadge.eyebrow}</span
				>
				<span class="text-outline-subtle/60">/</span>
				<span class="font-mono text-on-surface-variant text-[11px] font-medium tracking-wide"
					>{heroBadge.region}</span
				>
			</div>

			<h1
				class="font-display text-4xl leading-[1.12] font-bold tracking-tight text-white sm:text-5xl lg:text-[52px]"
			>
				Rust engineering for teams that need
				<span class="from-secondary via-primary bg-gradient-to-r to-blue-400 bg-clip-text text-transparent"
					>speed, safety</span
				>, and fewer production bugs.
			</h1>

			<p class="text-on-surface-variant max-w-xl text-base leading-relaxed sm:text-lg">
				We help startups and enterprise engineering teams migrate performance-critical C++ and
				Python hot paths to Rust—incrementally, with mathematically verified concurrency and zero
				downtime.
			</p>

			<div class="flex flex-wrap items-center gap-4 pt-2">
				<a
					class="group font-mono from-primary-container border-secondary/40 inline-flex items-center justify-center gap-2 rounded border bg-gradient-to-r to-blue-700 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_-4px_rgba(37,99,235,0.5)] transition-all duration-200 hover:from-blue-600 hover:to-blue-800"
					href="#book"
				>
					<span>Book a free 30-min technical call</span>
					<Icon
						name="bolt"
						size={18}
						class="text-secondary transition-transform group-hover:translate-x-0.5"
					/>
				</a>
				<a
					class="glide-link group text-on-surface hover:text-secondary font-mono inline-flex items-center gap-2 px-4 py-3 text-sm font-medium tracking-wide transition-colors"
					href="#case-studies"
				>
					<span>See verified case studies</span>
					<Icon
						name="arrow_forward"
						size={18}
						class="transition-transform group-hover:translate-x-1"
					/>
				</a>
			</div>

			<div class="text-on-surface-variant font-mono flex flex-wrap items-center gap-4 pt-3 text-xs">
				{#each heroAssurances as item, i (item.label)}
					{#if i > 0}
						<!-- Separator only earns its place when the row sits on one line. -->
						<span class="text-outline-subtle/50 hidden sm:inline">•</span>
					{/if}
					<div class="flex items-center gap-1.5">
						<Icon name={item.icon} size={16} class="text-secondary" />
						<span>{item.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="relative lg:col-span-5">
			<CodeTerminal tabs={codeTabs} />

			<div
				class="bg-surface-card/95 border-secondary/40 absolute -bottom-5 -left-2 flex items-center gap-3 rounded border px-4 py-2.5 shadow-xl backdrop-blur-md md:-left-6"
			>
				<div
					class="bg-secondary/15 text-secondary border-secondary/30 flex h-8 w-8 items-center justify-center rounded border"
				>
					<Icon name="timer" size={19} />
				</div>
				<div>
					<div class="font-mono text-on-surface-variant text-[10px] tracking-wider uppercase">
						{latencyBadge.label}
					</div>
					<div class="font-mono text-secondary flex items-center gap-1.5 text-sm font-bold">
						<span class="text-outline-subtle text-xs font-normal line-through"
							>{latencyBadge.before}</span
						>
						<Icon name="trending_down" size={12} class="text-secondary" />
						<span class="font-bold text-white">{latencyBadge.after}</span>
						<span
							class="text-secondary bg-secondary/10 border-secondary/20 rounded border px-1 py-0.5 text-[10px] font-semibold"
							>{latencyBadge.delta}</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Trust strip & animated stat counters -->
	<div
		class="border-outline-subtle/30 mt-16 grid grid-cols-1 items-center gap-8 border-t pt-10 md:grid-cols-12"
	>
		<div class="flex flex-col gap-2 md:col-span-5">
			<span class="font-mono text-outline-subtle text-[11px] tracking-wider uppercase"
				>Engineered for teams backed by top Tier-1 VCs</span
			>
			<div class="text-on-surface-variant font-mono flex flex-wrap items-center gap-3 text-xs">
				{#each trustChips as chip (chip.label)}
					<div
						class="bg-surface-low border-outline-subtle/30 hover:border-secondary/40 flex items-center gap-1.5 rounded border px-3 py-1 transition-colors"
					>
						<Icon name={chip.icon} size={15} class={accentText[chip.accent]} />
						<span>{chip.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="border-outline-subtle/30 grid grid-cols-1 gap-6 border-l-0 sm:grid-cols-3 md:col-span-7 md:border-l md:pl-8"
		>
			{#each heroStats as stat (stat.label)}
				<div class="flex flex-col">
					<div class="flex items-baseline">
						<Counter
							spec={stat.counter}
							class="font-display text-3xl font-bold tracking-tight lg:text-4xl {numeralText[
								stat.numeralAccent
							]}"
						/>
						{#if stat.unit}
							<span
								class="font-display ml-1 text-xl font-semibold {numeralText[
									stat.unitAccent ?? 'default'
								]}">{stat.unit}</span
							>
						{/if}
					</div>
					<span class="text-on-surface-variant mt-0.5 text-xs">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
