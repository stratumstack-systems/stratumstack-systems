import type { Problem } from '$lib/types';

export const problems: Problem[] = [
	{
		icon: 'memory',
		accent: 'cobalt',
		title: 'Python service pinned at 100% CPU',
		body: 'Global Interpreter Lock (GIL) stalls, asyncio thread serialization, and ballooning pod replicas that fail to scale throughput past 8k req/sec.',
		symptom: 'SYMPTOM: GIL BOTTLENECK',
		fix: 'FIX: PyO3 SIMD'
	},
	{
		icon: 'bug_report',
		accent: 'danger',
		title: 'Memory leaks & segfaults in prod',
		body: 'Elusive use-after-free conditions, silent buffer overruns in C++ libraries, and unpredictable OOM-killer terminations triggering 3 AM PagerDuty spirals.',
		symptom: 'SYMPTOM: SILENT CRASHES',
		fix: 'FIX: RAII & Ownership'
	},
	{
		icon: 'account_balance_wallet',
		accent: 'secondary',
		title: 'Cloud infrastructure outgrowing MRR',
		body: 'Paying six-figure AWS bills for high-RAM JVM/Go nodes merely to hold dead garbage collector heaps, instead of serving pure computational payloads.',
		symptom: 'SYMPTOM: 80GB HEAP ALLOC',
		fix: 'FIX: 60-80% CUT'
	},
	{
		icon: 'psychology',
		accent: 'primary',
		title: 'Team wants Rust, but fears curve',
		body: 'The steep borrow checker hurdle slows current roadmap commitments. You need senior architects to establish clean idiomatic patterns first.',
		symptom: 'SYMPTOM: VELOCITY STALL',
		fix: 'FIX: Co-Engineering'
	}
];
