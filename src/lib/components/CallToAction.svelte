<script lang="ts">
	import CalendlyEmbed from './CalendlyEmbed.svelte';
	import Icon from './Icon.svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { site } from '$lib/data/site';

	let booked = $state(false);

	const mailto = (subject?: string) =>
		subject ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}` : `mailto:${site.email}`;
</script>

<section id="book" class="relative mx-auto w-full max-w-[1280px] px-6 py-24">
	<div
		use:spotlight
		class="spotlight-card from-surface-card via-surface-low to-surface-lowest border-outline-subtle/40 relative overflow-hidden rounded-xl border bg-gradient-to-br p-8 shadow-2xl md:p-14"
	>
		<div
			class="bg-primary-container/20 pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full blur-[90px]"
		></div>

		<div class="relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
			<div class="space-y-6 lg:col-span-5">
				<div
					class="bg-surface-card border-outline-subtle/40 inline-flex items-center gap-2 rounded border px-3 py-1"
				>
					<span class="bg-secondary h-2 w-2 rounded-full"></span>
					<span class="font-mono text-on-surface text-xs">Direct Principal Engineer Consultation</span
					>
				</div>

				<h2
					class="font-display text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]"
				>
					Ready to make your systems <span class="text-secondary">faster, safer</span>, and cheaper
					to run?
				</h2>

				<p class="text-on-surface-variant max-w-xl text-base leading-relaxed">
					Pick a slot on the right for a 30-minute technical triage call. No sales reps, no
					high-pressure pitches—just systems code, architecture profiling, and honest feasibility
					analysis.
				</p>

				{#if booked}
					<div
						class="border-secondary/40 bg-secondary/10 flex items-start gap-3 rounded border p-4"
						role="status"
					>
						<Icon name="check_circle" size={20} class="text-secondary mt-0.5 shrink-0" />
						<p class="text-on-surface text-sm leading-relaxed">
							<span class="font-semibold text-white">You're booked.</span> The calendar invite and
							Google Meet link are on their way to your inbox. Reply to it with a repo link or a
							flamegraph and we'll come prepared.
						</p>
					</div>
				{/if}

				<div class="flex flex-wrap items-center gap-4 pt-2">
					<a
						class="glide-link text-on-surface hover:text-secondary font-mono inline-flex items-center gap-2 px-4 py-3 text-sm transition-colors"
						href={mailto('Rust Consultancy Inquiry')}
					>
						<Icon name="mail" size={18} class="text-secondary" />
						<span>{site.email}</span>
					</a>
				</div>

				<div class="text-on-surface-variant font-mono flex flex-wrap items-center gap-4 pt-2 text-xs">
					<span class="flex items-center gap-1.5">
						<Icon name="check_circle" size={16} class="text-secondary" />
						<span>Free 30-minute triage</span>
					</span>
					<span class="text-outline-subtle/50 hidden sm:inline">•</span>
					<span class="flex items-center gap-1.5">
						<Icon name="check_circle" size={16} class="text-secondary" />
						<span>Strict bilateral NDA</span>
					</span>
				</div>

				<p class="font-mono text-outline-subtle text-xs">
					Prefer asynchronous? Send your repo or flamegraph directly.
				</p>
			</div>

			<div class="lg:col-span-7">
				<CalendlyEmbed utmContent="cta-section" onScheduled={() => (booked = true)} />
			</div>
		</div>
	</div>
</section>
