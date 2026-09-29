import type { Action } from 'svelte/action';

/**
 * Feeds pointer position into the `.spotlight-card` radial highlight.
 *
 * Only the two custom properties are written — the gradient itself lives in
 * CSS, so with no pointer (touch, keyboard, no JS) the card simply renders
 * without a highlight.
 */
export const spotlight: Action<HTMLElement> = (node) => {
	// A coarse pointer never hovers, so skip the listener entirely.
	if (window.matchMedia('(hover: none)').matches) return;

	const onMove = (event: PointerEvent) => {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
		node.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
	};

	node.addEventListener('pointermove', onMove);

	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
		}
	};
};
