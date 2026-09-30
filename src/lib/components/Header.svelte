<script lang="ts">
	import CalendlyButton from './CalendlyButton.svelte';
	import Icon from './Icon.svelte';
	import Mark from './Mark.svelte';
	import { nav, site } from '$lib/data/site';

	let menuOpen = $state(false);
</script>

<header
	class="bg-surface/90 border-outline-subtle/30 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-xl"
>
	<div class="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6">
		<a href="#top" class="flex shrink-0 items-center gap-3">
			<Mark />
			<span class="font-display text-base font-semibold tracking-tight text-white sm:text-lg"
				>{site.name}</span
			>
			<span
				class="font-mono text-secondary bg-surface-high border-secondary/30 hidden rounded border px-1.5 py-0.5 text-[10px] sm:inline-block"
				>{site.tag}</span
			>
		</a>

		<nav class="text-on-surface-variant hidden items-center gap-6 text-sm font-medium md:flex">
			{#each nav as link (link.href)}
				<a class="hover:text-secondary transition-colors" href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<div class="flex shrink-0 items-center gap-2">
			<CalendlyButton
				label="Book a Call"
				variant="compact"
				icon="arrow_forward"
				iconSize={15}
				utmContent="header"
			/>
			<button
				type="button"
				class="text-on-surface-variant hover:text-secondary flex h-8 w-8 items-center justify-center md:hidden"
				aria-expanded={menuOpen}
				aria-label="Toggle navigation"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? 'close' : 'menu'} size={22} />
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="border-outline-subtle/30 bg-surface border-t px-6 py-4 md:hidden">
			<ul class="flex flex-col gap-3">
				{#each nav as link (link.href)}
					<li>
						<a
							class="text-on-surface-variant hover:text-secondary block text-sm transition-colors"
							href={link.href}
							onclick={() => (menuOpen = false)}>{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
