import type { Article, Crate, CounterSpec, Talk } from '$lib/types';

/**
 * Destinations for the three "see more" links. Each is undefined until the
 * real page exists; `MoreLink` then renders plain text instead of a dead link.
 */
export const proofLinks: {
	github?: string;
	articles?: string;
	sessions?: string;
} = {};

export const crateTotal: CounterSpec = { target: 2419000, suffix: '+' };

export const crates: Crate[] = [
	{ name: 'fast-stratum', description: 'Zero-alloc binary framing toolkit', downloads: '680k dl' },
	{
		name: 'tokio-rate-limiter',
		description: 'Lock-free token bucket algorithm',
		downloads: '520k dl'
	},
	{
		name: 'pyo3-arrow-bridge',
		description: 'Direct Arrow memory sharing for PyO3',
		downloads: '410k dl'
	}
];

export const articles: Article[] = [
	{
		meta: '8 MIN READ · SYSTEMS FFI',
		title: 'Migrating a Python Hot Path to Rust Without a Full Rewrite (Using PyO3)',
		excerpt:
			'Avoid costly copies by establishing memory alignment across the Python runtime and Rust binaries using shared memory Arrow tensors.',
		href: '#'
	},
	{
		meta: '12 MIN READ · ASYNC INTERNALS',
		title: "Demystifying Rust's Pin & Unpin in Custom Tokio Future Implementations",
		excerpt:
			'A structural walkthrough of why self-referential async futures require heap pinning, and how to safely write cancellation-safe drivers.',
		href: '#'
	}
];

export const talks: Talk[] = [
	{
		event: 'RUSTCONF · USA',
		location: 'SAN JOSE, CA',
		title: 'Zero-Copy Network Protocols in Practice',
		body: 'Architectural breakdown of eliminating userspace buffer copies using io_uring and Tokio.'
	},
	{
		event: 'COMMUNITY LEAD & HOST',
		location: '1,200+ MEMBERS',
		title: 'Rust India Community Chapter',
		body: 'Founding organizer hosting monthly virtual hackathons, compiler workshops, and mentoring high-potential systems developers.',
		highlight: true
	}
];
