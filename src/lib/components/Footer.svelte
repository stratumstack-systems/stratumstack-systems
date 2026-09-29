<script lang="ts">
	import Icon from './Icon.svelte';
	import Mark from './Mark.svelte';
	import { footerLinks, site } from '$lib/data/site';

	const year = new Date().getFullYear();
</script>

<footer class="bg-surface-lowest border-outline-subtle/30 w-full border-t py-16">
	<div class="mx-auto max-w-[1280px] px-6">
		<div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
			<div class="flex flex-col gap-3 md:col-span-5">
				<div class="flex items-center gap-2.5">
					<Mark size="sm" />
					<span class="font-display text-lg font-semibold tracking-tight text-white"
						>{site.fullName}</span
					>
				</div>
				<p class="text-on-surface-variant max-w-sm text-xs leading-relaxed">{site.description}</p>
				<div class="mt-2 flex items-center gap-2">
					<span class="bg-secondary inline-block h-2 w-2 animate-pulse rounded-full"></span>
					<span class="font-mono text-secondary text-[11px]">{site.availability}</span>
				</div>
			</div>

			<div class="font-mono text-on-surface-variant flex flex-col gap-2 text-xs md:col-span-4">
				<span class="mb-1 font-semibold tracking-wider text-white uppercase"
					>Operating Latency &amp; Borders</span
				>
				<div class="text-secondary flex items-center gap-2">
					<Icon name="public" size={16} />
					<span>IST // UTC+5:30 · 4h East / EU Overlap</span>
				</div>
				<p class="text-outline-subtle mt-1 text-[11px] leading-relaxed">
					Engineered for synchronized distributed sprints and real-time telemetry collaboration
					across North American and European standard hours.
				</p>
			</div>

			<div class="font-mono flex flex-col gap-2 text-xs md:col-span-3">
				<span class="mb-1 font-semibold tracking-wider text-white uppercase">Consultancy Index</span>
				{#each footerLinks as link (link.href)}
					<a
						class="text-on-surface-variant hover:text-secondary transition-colors"
						href={link.href}>{link.label}</a
					>
				{/each}
			</div>
		</div>

		<div
			class="border-outline-subtle/20 text-on-surface-variant/60 font-mono flex flex-wrap items-center justify-between gap-2 border-t pt-8 text-[11px]"
		>
			<div>
				© {year}
				{site.fullName} Inc. All systems verified under strict memory-safety guarantees.
			</div>
			<div class="flex items-center gap-4">
				<span>SEC_AUDIT_PASS</span>
				<span>•</span>
				<span>ZERO_UNSAFE</span>
			</div>
		</div>
	</div>
</footer>
