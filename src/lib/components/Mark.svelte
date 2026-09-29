<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		/** Tile edge length in Tailwind sizing units. */
		size?: 'sm' | 'md';
	}

	let { size = 'md' }: Props = $props();
</script>

<div
	class="from-primary-container border-secondary/40 flex items-center justify-center rounded border bg-gradient-to-br to-blue-700 {size ===
	'md'
		? 'h-8 w-8 shadow-sm shadow-blue-500/20'
		: 'h-6 w-6'}"
>
	<Icon name="layers" size={size === 'md' ? 19 : 16} class="text-secondary" />
</div>
