<script lang="ts">
	import type { IconName } from '$lib/types';

	interface Props {
		/** Material Symbols Outlined ligature name. */
		name: IconName;
		/** Pixel size; the font renders at whatever font-size it inherits. */
		size?: number;
		class?: string;
	}

	let { name, size = 20, class: className = '' }: Props = $props();
</script>

<span
	class="material-symbols-outlined {className}"
	style="font-size: {size}px"
	aria-hidden="true">{name}</span
>
