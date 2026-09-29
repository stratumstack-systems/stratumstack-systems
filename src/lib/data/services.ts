import type { EditorialQuote, Service } from '$lib/types';

export const services: Service[] = [
	{
		icon: 'dns',
		tag: 'Microservices',
		title: 'Core Rust Backend Engineering',
		body: 'Ultra-low latency web backends, message queues, and ingestion pipelines engineered with Tokio, Axum, Tower, and Tonic gRPC for high-throughput concurrency.',
		deliverables: [
			'Lock-free queues & atomic state transitions',
			'Zero-copy byte deserialization pipelines'
		],
		stack: ['tokio', 'axum', 'grpc']
	},
	{
		icon: 'swap_horizontal_circle',
		tag: 'Incremental',
		title: 'Safe Strangler Migrations',
		body: 'Port legacy C/C++, Go, or Python engines incrementally without risky Big Bang rewrites. Canary routing and transparent FFI adapters maintain continuous uptime.',
		deliverables: [
			'Shadow traffic replay & bitwise verification',
			'Safe rollback proxies with 0ms cutovers'
		],
		stack: ['strangler-fig', 'c-ffi', 'zero-downtime']
	},
	{
		icon: 'speed',
		tag: 'Diagnostics',
		title: 'Code Audits & Flamegraphs',
		body: 'Deep bytecode profiling, heap layout alignment, lock contention removal, unsafe block fuzzing with Miri, and supply-chain dependency audits (cargo-audit).',
		deliverables: [
			'Perf c2c cache line false-sharing audit',
			'Criterion.rs micro-benchmarks with CI gating'
		],
		stack: ['flamegraph', 'miri-fuzz', 'perf-stat']
	},
	{
		icon: 'rocket_launch',
		tag: 'FFI Acceleration',
		title: 'Python & Node.js Acceleration',
		body: 'Keep your high-level Django, FastAPI, or Express APIs while offloading CPU-intensive loops, parsers, and crypto calculations to native Rust via PyO3 and Napi-rs.',
		deliverables: [
			'GIL bypass using Rayon parallel iterators',
			'Zero-copy NumPy and PyArrow tensor sharing'
		],
		stack: ['pyo3', 'napi-rs', 'simd-json']
	},
	{
		icon: 'developer_board',
		tag: 'Edge & Wasm',
		title: 'WebAssembly & Embedded',
		body: 'Ultra-fast in-browser compute modules, zero-cold-start edge workers (Cloudflare Workers, Fastly Compute), and strict no_std embedded firmware for robotics.',
		deliverables: [
			'Sub-millisecond cold start WASI sandboxes',
			'Real-time static interrupt handling in no_std'
		],
		stack: ['wasm32-wasi', 'no_std', 'embedded']
	},
	{
		icon: 'groups',
		tag: 'Team Upskill',
		title: 'Team Training & Mentorship',
		body: 'Pair programming, async PR reviews, and practical hands-on workshops that turn C++, Go, and Python developers into confident, productive Rust contributors in 30 days.',
		deliverables: [
			'Idiomatic borrow checker ergonomics playbook',
			'Strict custom Clippy CI configuration rules'
		],
		stack: ['pairing', 'async-review', 'workshops']
	}
];

export const editorialQuote: EditorialQuote = {
	eyebrow: 'Architectural Creed',
	lead: 'Safe abstractions are not an accident of good intentions; they are a ',
	emphasis: 'mathematical discipline',
	tail: ' executed at compile time.',
	attribution: 'Stratumstack Core Systems Doctrine'
};
