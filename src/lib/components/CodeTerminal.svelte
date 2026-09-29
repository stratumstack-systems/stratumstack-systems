<script lang="ts">
	import Icon from './Icon.svelte';
	import { codeSpanClass } from '$lib/accents';
	import { spotlight } from '$lib/actions/spotlight';
	import type { CodeTab } from '$lib/types';

	interface Props {
		tabs: CodeTab[];
	}

	let { tabs }: Props = $props();

	/** Null until the reader picks a tab, so the first tab stays the default. */
	let activeId = $state<string | null>(null);
	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout>;

	const active = $derived(tabs.find((t) => t.id === activeId) ?? tabs[0]);
	const indentClass = ['', 'pl-4', 'pl-8', 'pl-12'];

	/** Flattens the active tab back to plain text for the clipboard. */
	function activeText(): string {
		return active.lines
			.map((line) =>
				line.spacer ? '' : (line.spans ?? []).map((s) => s.text).join('')
			)
			.join('\n');
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(activeText());
			copied = true;
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => (copied = false), 2000);
		} catch {
			// Clipboard is unavailable (insecure origin, denied permission) —
			// leave the button label untouched rather than claiming success.
		}
	}
</script>

<div
	use:spotlight
	class="spotlight-card bg-surface-lowest/90 border-outline-subtle/40 overflow-hidden rounded-xl border shadow-2xl backdrop-blur-md"
>
	<div
		class="border-outline-subtle/30 bg-surface-low flex items-center justify-between gap-2 border-b px-3.5 py-2.5"
	>
		<div class="flex min-w-0 items-center gap-1.5">
			<span class="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80"></span>
			<span class="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80"></span>
			<span class="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#27C93F]/80"></span>

			<div class="flex min-w-0 items-center gap-1 overflow-x-auto" role="tablist">
				{#each tabs as tab (tab.id)}
					<button
						type="button"
						role="tab"
						aria-selected={tab.id === active.id}
						aria-controls="snippet-{tab.id}"
						class="font-mono flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium tracking-wide whitespace-nowrap transition-all {tab.id ===
						active.id
							? 'bg-surface-card text-secondary border-secondary/30 border'
							: 'text-on-surface-variant hover:text-white'}"
						onclick={() => (activeId = tab.id)}
					>
						{#if tab.icon && tab.id === active.id}
							<Icon name={tab.icon} size={12} />
						{/if}
						{tab.filename}
					</button>
				{/each}
			</div>
		</div>

		<button
			type="button"
			class="font-mono bg-surface-high border-outline-subtle/40 hover:border-secondary/40 flex shrink-0 items-center gap-1 rounded border px-2 py-1 text-[10px] tracking-wider uppercase transition-all {copied
				? 'text-secondary'
				: 'text-on-surface-variant hover:text-secondary'}"
			onclick={copy}
		>
			<Icon name={copied ? 'check' : 'content_copy'} size={13} />
			<span>{copied ? 'Copied!' : 'Copy'}</span>
		</button>
	</div>

	<div class="font-mono min-h-[260px] overflow-x-auto bg-[#0b0e18] p-5 text-[12px] leading-relaxed">
		<div id="snippet-{active.id}" role="tabpanel" class="space-y-1">
			{#each active.lines as line, i (i)}
				{#if line.spacer}
					<div class="h-2"></div>
				{:else}
					<div
						class="{indentClass[line.indent ?? 0]} {line.comment
							? 'text-on-surface-variant/60 italic'
							: ''}"
					>
						{#each line.spans ?? [] as span, j (j)}<span
								class="{span.accent ? codeSpanClass[span.accent] : ''} {span.bold
									? 'font-semibold'
									: ''}">{span.text}</span
							>{/each}
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<div
		class="border-outline-subtle/30 font-mono text-on-surface-variant bg-surface-low flex items-center justify-between border-t px-4 py-2 text-[11px]"
	>
		<div class="flex items-center gap-2">
			<span class="bg-secondary h-1.5 w-1.5 rounded-full"></span>
			<span class="text-on-surface font-medium">CARGO BENCH: VERIFIED</span>
		</div>
		<span class="text-secondary font-semibold">0 allocs / frame</span>
	</div>
</div>
