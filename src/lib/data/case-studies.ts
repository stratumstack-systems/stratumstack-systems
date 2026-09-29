import type { CaseFilter, CaseStudy } from '$lib/types';

export const caseFilters: CaseFilter[] = [
	{ id: 'all', label: 'All Engagements (3)' },
	{ id: 'fintech', label: 'High-Frequency FinTech' },
	{ id: 'observability', label: 'Cloud Memory & Cost' },
	{ id: 'robotics', label: 'Robotics & Autonomous' }
];

export const caseStudies: CaseStudy[] = [
	{
		id: 'fintech',
		sector: 'FinTech · San Francisco',
		qualifier: '• Zero-downtime cutover',
		title: 'Order-Routing Engine Microsecond Migration',
		challenge:
			'A Python/asyncio websocket order routing engine experienced severe p99 jitter (240ms spikes) during market open liquidity surges, triggering message dropping and dropped client connections.',
		approach:
			'Extracted the hot network ingest and order matching core into a decoupled Rust service using Tokio, lock-free ring buffers (crossbeam), and zero-copy JSON parsing with SIMD-json.',
		quote:
			'Stratumstack delivered the migration with zero downtime. Our ingestion queue lag vanished overnight, and our system sailed through extreme volatility days without breaking a sweat.',
		attribution: 'Marcus Vance — VP of Engineering, US Trading Platform',
		metricsTitle: 'BENCHMARK METRICS',
		metricsTag: 'CRITERION_V2',
		metrics: [
			{
				label: 'P99 Order Latency',
				counter: { target: 4.2, decimals: 1, suffix: 'ms' },
				numeralAccent: 'secondary',
				fill: 4,
				barAccent: 'secondary',
				note: 'Was 240ms in Python (98.2% reduction)'
			},
			{
				label: 'Throughput Capacity',
				counter: { target: 15, suffix: 'x' },
				numeralAccent: 'bright',
				fill: 100,
				barAccent: 'secondary',
				gradient: true,
				note: 'Scaled from 6.2k to 94k msgs/sec per instance'
			}
		]
	},
	{
		id: 'observability',
		sector: 'Observability SaaS · London',
		qualifier: '• AWS Cost Optimization',
		title: '50TB Telemetry Pipeline Memory Squeeze',
		challenge:
			'A log parsing service implemented in Go and Java was consuming huge RAM heaps for garbage collection, running 120 memory-optimized EC2 instances and burning $62k monthly.',
		approach:
			'Replaced the filtering daemon with an event-driven Rust service utilizing manual memory arena allocation, zero allocations during parsing, and AVX-512 vectorization.',
		quote:
			'They didn’t just write code; their memory profiling and systems architecture expertise literally saved our runway. We reduced our AWS fleet by nearly 70%.',
		attribution: 'Helena Croft — CTO, Observability SaaS (London)',
		metricsTitle: 'INFRASTRUCTURE REDUCTION',
		metricsTag: 'COST_AUDIT_PASS',
		metrics: [
			{
				label: 'Monthly AWS Compute',
				counter: { target: 42000, prefix: '-$', suffix: ' / mo' },
				numeralAccent: 'secondary',
				fill: 32,
				barAccent: 'secondary',
				note: '68% overall reduction in EC2 instances'
			},
			{
				label: 'Per-Node Memory Footprint',
				counter: { target: 380, suffix: ' MB' },
				numeralAccent: 'bright',
				fill: 3,
				barAccent: 'cobalt',
				note: 'Down from 12.4 GB JVM Heap (97% memory saved)'
			}
		]
	},
	{
		id: 'robotics',
		sector: 'Robotics & AI · Munich',
		qualifier: '• Safety Critical no_std',
		title: 'Zero-Crash Autonomous Sensor Fusion',
		challenge:
			'Sporadic memory corruption in a multithreaded C++ LiDAR/IMU sensor pipeline caused random micro-crashes during field validation runs, risking autonomous safety certification.',
		approach:
			'Ported the sensor fusion layer to safe, verifiable Rust with strict static compile-time lifetimes and zero unsafe blocks, integrating seamlessly with ROS2 via custom bindings.',
		quote:
			'Absolute precision and seamless collaboration across timezones. Stratumstack eliminated memory safety issues from our embedded edge units entirely.',
		attribution: 'Dr. Stefan Weber — Head of Robotics, Munich',
		metricsTitle: 'SAFETY RELIABILITY',
		metricsTag: 'ISO_26262_READY',
		metrics: [
			{
				label: 'Memory Corruption Faults',
				counter: { target: 0, suffix: ' Faults' },
				numeralAccent: 'secondary',
				fill: 100,
				barAccent: 'secondary',
				note: 'Across 180,000 continuous operating hours'
			},
			{
				label: 'Deterministic Cycle Time',
				counter: { target: 40, prefix: '± ', suffix: 'ns' },
				numeralAccent: 'bright',
				fill: 95,
				barAccent: 'cobalt',
				note: 'Zero GC pauses / fully predictable hard real-time loop'
			}
		]
	}
];
