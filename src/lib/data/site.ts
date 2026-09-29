import type {
	CodeTab,
	FooterLink,
	HeroAssurance,
	HeroBadge,
	LatencyBadge,
	NavLink,
	Stat,
	TrustChip
} from '$lib/types';

export const site = {
	name: 'Stratumstack',
	fullName: 'Stratumstack Systems',
	tag: 'SYSTEMS // RUST',
	email: 'hello@stratumstack.com',
	description:
		'High-integrity Rust systems architecture, zero-cost runtime abstractions, and enterprise concurrency engineering for mission-critical infrastructure.',
	availability: 'Available for Q2/Q3 engagements'
} as const;

export const nav: NavLink[] = [
	{ label: 'Services', href: '#services' },
	{ label: 'Problems', href: '#problems' },
	{ label: 'Case Studies', href: '#case-studies' },
	{ label: 'Pricing', href: '#pricing' },
	{ label: 'Proof', href: '#proof' },
	{ label: 'Process', href: '#process' },
	{ label: 'Trust', href: '#trust' }
];

export const heroBadge: HeroBadge = {
	eyebrow: 'High-Integrity Systems Engineering',
	region: 'US · UK · EU Overlap'
};

export const heroAssurances: HeroAssurance[] = [
	{ icon: 'verified', label: 'Zero unsafe blocks in business logic' },
	{ icon: 'speed', label: 'Deterministic sub-10ms P99' }
];

/** The three switchable tabs of the hero terminal. */
export const codeTabs: CodeTab[] = [
	{
		id: 'pipeline',
		filename: 'pipeline.rs',
		icon: 'code',
		lines: [
			{ comment: true, spans: [{ text: '// Zero-alloc async telemetry batch processor' }] },
			{ spans: [{ text: 'use', accent: 'secondary', bold: true }, { text: ' tokio::sync::mpsc;' }] },
			{ spans: [{ text: 'use', accent: 'secondary', bold: true }, { text: ' rayon::prelude::*;' }] },
			{
				spans: [
					{ text: 'use', accent: 'secondary', bold: true },
					{ text: ' bytes::{Bytes, BytesMut};' }
				]
			},
			{ spacer: true },
			{ spans: [{ text: '#[inline(always)]', accent: 'primary' }] },
			{
				spans: [
					{ text: 'pub async fn', accent: 'secondary', bold: true },
					{ text: ' ' },
					{ text: 'process_stream', accent: 'bright', bold: true },
					{ text: '(' }
				]
			},
			{
				indent: 1,
				spans: [{ text: 'mut', accent: 'muted' }, { text: ' rx: mpsc::Receiver<Bytes>,' }]
			},
			{ indent: 1, spans: [{ text: 'sink: &AtomicBufferPool,' }] },
			{ spans: [{ text: ') -> Result<BatchReport, CoreError> {' }] },
			{
				indent: 1,
				comment: true,
				spans: [{ text: '// SIMD-accelerated vectorization without GIL' }]
			},
			{ indent: 1, spans: [{ text: 'rx.par_bridge()' }] },
			{ indent: 2, spans: [{ text: '.filter_map(|pkt| parse_simd_header(&pkt))' }] },
			{ indent: 2, spans: [{ text: '.for_each_with(sink, |buf, frame| {' }] },
			{ indent: 3, spans: [{ text: 'buf.commit_zero_copy(frame);', accent: 'bright' }] },
			{ indent: 2, spans: [{ text: '});' }] },
			{ indent: 1, spans: [{ text: 'Ok(BatchReport::synced())', accent: 'secondary', bold: true }] },
			{ spans: [{ text: '}' }] }
		]
	},
	{
		id: 'alloc',
		filename: 'zero_copy.rs',
		lines: [
			{
				comment: true,
				spans: [{ text: '// Lock-free Single-Producer Single-Consumer ring buffer' }]
			},
			{
				spans: [
					{ text: 'use', accent: 'secondary', bold: true },
					{ text: ' core::sync::atomic::{AtomicUsize, Ordering};' }
				]
			},
			{
				spans: [
					{ text: 'pub struct', accent: 'secondary', bold: true },
					{ text: ' SpscRing<T, ' },
					{ text: 'const N: usize', accent: 'primary' },
					{ text: '> {' }
				]
			},
			{
				indent: 1,
				spans: [
					{ text: 'head: ' },
					{ text: 'CachePadded', accent: 'primary' },
					{ text: '<AtomicUsize>,' }
				]
			},
			{
				indent: 1,
				spans: [
					{ text: 'tail: ' },
					{ text: 'CachePadded', accent: 'primary' },
					{ text: '<AtomicUsize>,' }
				]
			},
			{ indent: 1, spans: [{ text: 'buffer: [MaybeUninit<T>; N],' }] },
			{ spans: [{ text: '}' }] },
			{ spacer: true },
			{ spans: [{ text: '#[inline(always)]', accent: 'primary' }] },
			{
				spans: [
					{ text: 'pub fn', accent: 'secondary', bold: true },
					{ text: ' ' },
					{ text: 'push_nonblocking', accent: 'bright', bold: true },
					{ text: '(&self, val: T) -> bool {' }
				]
			},
			{ indent: 1, spans: [{ text: 'let h = self.head.load(Ordering::Relaxed);' }] },
			{ indent: 1, spans: [{ text: 'let t = self.tail.load(Ordering::Acquire);' }] },
			{
				indent: 1,
				spans: [
					{ text: 'if', accent: 'secondary', bold: true },
					{ text: ' (h + 1) % N == t { ' },
					{ text: 'return false;', accent: 'secondary', bold: true },
					{ text: ' }' }
				]
			},
			{ indent: 1, spans: [{ text: 'self.commit_slot(h, val);', accent: 'bright' }] },
			{ indent: 1, spans: [{ text: 'true', accent: 'secondary', bold: true }] },
			{ spans: [{ text: '}' }] }
		]
	},
	{
		id: 'bench',
		filename: 'bench.rs',
		lines: [
			{ comment: true, spans: [{ text: '// Criterion Micro-Benchmark: SIMD vs C++ Baseline' }] },
			{
				spans: [
					{ text: 'use', accent: 'secondary', bold: true },
					{ text: ' criterion::{black_box, criterion_group, Criterion};' }
				]
			},
			{ spacer: true },
			{
				spans: [
					{ text: 'pub fn', accent: 'secondary', bold: true },
					{ text: ' ' },
					{ text: 'bench_simd_vs_json', accent: 'bright', bold: true },
					{ text: '(c: &mut Criterion) {' }
				]
			},
			{
				indent: 1,
				spans: [
					{ text: 'let payload = include_bytes!(' },
					{ text: '"fixtures/order_100k.json"', accent: 'primary' },
					{ text: ');' }
				]
			},
			{
				indent: 1,
				spans: [
					{ text: 'c.bench_function(' },
					{ text: '"simd_fast_path"', accent: 'primary' },
					{ text: ', |b| {' }
				]
			},
			{ indent: 2, spans: [{ text: 'b.iter(|| parse_order_simd(black_box(payload)))' }] },
			{ indent: 1, spans: [{ text: '});' }] },
			{ spans: [{ text: '}' }] },
			{ spacer: true },
			{
				comment: true,
				spans: [{ text: '// Result: 4.2ms P99 · 0 memory allocations verified', accent: 'secondary' }]
			}
		]
	}
];

export const latencyBadge: LatencyBadge = {
	label: 'P99 Ingestion Latency',
	before: '180ms',
	after: '12.1ms',
	delta: '93% FASTER'
};

export const trustChips: TrustChip[] = [
	{ label: 'FinTech EU', icon: 'token', accent: 'secondary' },
	{ label: 'DataFlow US', icon: 'waves', accent: 'secondary' },
	{ label: 'Robotics UK', icon: 'precision_manufacturing', accent: 'secondary' },
	{ label: 'QuantScale', icon: 'hub', accent: 'primary' }
];

export const heroStats: Stat[] = [
	{
		counter: { target: 8, suffix: '+' },
		unit: 'Years',
		unitAccent: 'secondary',
		numeralAccent: 'bright',
		label: 'Continuous production Rust deployment'
	},
	{
		counter: { target: 14 },
		unit: 'Countries',
		unitAccent: 'default',
		numeralAccent: 'secondary',
		label: 'US, UK, DACH, Nordics remote overlap'
	},
	{
		counter: { target: 2.4, decimals: 1, suffix: 'M+' },
		numeralAccent: 'primary',
		label: 'Crates.io package downloads'
	}
];

export const footerLinks: FooterLink[] = [
	{ label: 'Services & Architecture', href: '#services' },
	{ label: 'Enterprise Case Studies', href: '#case-studies' },
	{ label: 'Advisory & Sprint Pricing', href: '#pricing' },
	{ label: 'Security & Formal Verification', href: '#trust' }
];
