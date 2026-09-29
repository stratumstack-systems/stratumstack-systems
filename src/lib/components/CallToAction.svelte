<script lang="ts">
	import Icon from './Icon.svelte';
	import { spotlight } from '$lib/actions/spotlight';
	import { site } from '$lib/data/site';
	import { bookingSlots } from '$lib/data/trust';

	let selected = $state(bookingSlots[0].label);

	const mailto = (subject?: string) =>
		subject ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}` : `mailto:${site.email}`;

	const confirmHref = $derived(mailto(`Confirm Booking: ${selected}`));
</script>

<section id="book" class="relative mx-auto w-full max-w-[1280px] px-6 py-24">
	<div
		use:spotlight
		class="spotlight-card from-surface-card via-surface-low to-surface-lowest border-outline-subtle/40 relative overflow-hidden rounded-xl border bg-gradient-to-br p-8 shadow-2xl md:p-14"
	>
		<div
			class="bg-primary-container/20 pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full blur-[90px]"
		></div>

		<div class="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
			<div class="space-y-6 lg:col-span-7">
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
					Book a direct 30-minute technical triage call. No sales reps, no high-pressure pitches—just
					systems code, architecture profiling, and honest feasibility analysis.
				</p>

				<div class="flex flex-wrap items-center gap-4 pt-2">
					<a
						class="group font-mono from-primary-container border-secondary/40 inline-flex items-center justify-center gap-2 rounded border bg-gradient-to-r to-blue-700 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all hover:from-blue-600 hover:to-blue-800"
						href={mailto('Rust Consultancy Inquiry')}
					>
						<span>Schedule Technical Call</span>
						<Icon
							name="calendar_month"
							size={18}
							class="text-secondary transition-transform group-hover:rotate-12"
						/>
					</a>
					<a
						class="glide-link text-on-surface hover:text-secondary font-mono inline-flex items-center gap-2 px-4 py-3 text-sm transition-colors"
						href={mailto()}
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
			</div>

			<!-- Booking card -->
			<div class="lg:col-span-5">
				<div
					class="border-outline-subtle/40 space-y-5 rounded border bg-[#0b0e18]/90 p-6 shadow-xl backdrop-blur-md"
				>
					<div class="border-outline-subtle/30 flex items-center justify-between border-b pb-4">
						<div class="flex items-center gap-2.5">
							<div
								class="bg-primary-container/20 border-secondary/40 text-secondary font-mono flex h-9 w-9 items-center justify-center rounded border text-xs font-bold"
							>
								SS
							</div>
							<div>
								<span class="font-display block text-sm leading-tight font-semibold text-white"
									>Technical Review Slot</span
								>
								<span class="font-mono text-on-surface-variant text-[11px]">30 Min · Google Meet</span
								>
							</div>
						</div>
						<span
							class="bg-secondary/15 text-secondary border-secondary/30 font-mono rounded border px-2 py-0.5 text-[10px]"
							>Available</span
						>
					</div>

					<fieldset class="space-y-2">
						<legend class="font-mono text-outline-subtle mb-2 text-[10px] tracking-wider uppercase"
							>Select Window (IST / UTC+5:30)</legend
						>
						<div class="font-mono grid grid-cols-2 gap-2 text-xs">
							{#each bookingSlots as slot (slot.label)}
								<button
									type="button"
									aria-pressed={selected === slot.label}
									class="rounded p-2.5 text-center transition-all {selected === slot.label
										? 'bg-primary-container/20 border-secondary text-secondary border font-semibold'
										: 'bg-surface-card border-outline-subtle/30 hover:border-secondary/60 text-on-surface border'}"
									onclick={() => (selected = slot.label)}
								>
									{slot.label}
								</button>
							{/each}
						</div>
					</fieldset>

					<div class="pt-2">
						<a
							class="font-mono from-primary-container border-secondary/40 flex w-full items-center justify-center gap-1.5 rounded border bg-gradient-to-r to-blue-700 py-2.5 text-xs font-semibold text-white shadow transition-colors hover:from-blue-600 hover:to-blue-800"
							href={confirmHref}
						>
							<span>Lock Slot ({selected}) &amp; NDA</span>
							<Icon name="chevron_right" size={16} class="text-secondary" />
						</a>
					</div>

					<p class="font-mono text-outline-subtle text-center text-[10px]">
						Prefer asynchronous? Send your repo or flamegraph directly.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
