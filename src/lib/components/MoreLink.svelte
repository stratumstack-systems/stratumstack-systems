<script lang="ts">
	import Icon from './Icon.svelte';
	import type { IconName } from '$lib/types';

	interface Props {
		label: string;
		icon?: IconName;
		/** Omitted while the destination does not exist yet — the affordance
		 *  then renders as plain text rather than a link to nowhere. */
		href?: string;
	}

	let { label, icon = 'arrow_forward', href }: Props = $props();
</script>

{#if href}
	<a class="glide-link text-secondary group flex items-center gap-1 hover:text-white" {href}>
		<span>{label}</span>
		<Icon
			name={icon}
			size={14}
			class={icon === 'open_in_new'
				? 'transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
				: 'transition-transform group-hover:translate-x-1'}
		/>
	</a>
{:else}
	<span class="text-secondary flex items-center gap-1">
		<span>{label}</span>
		<Icon name={icon} size={14} />
	</span>
{/if}
