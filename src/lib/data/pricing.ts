import type { PricingTier } from '$lib/types';

export const pricingTiers: PricingTier[] = [
	{
		kicker: 'SPRINT DISCOVERY',
		duration: '1 WEEK',
		title: 'Rust Readiness Assessment',
		body: 'Complete diagnostic of your existing architecture. We identify bottlenecks, evaluate Rust ROI, and produce an incremental migration roadmap.',
		price: 'From $1,400',
		cadence: '/ one-time',
		features: [
			'Codebase profiling & feasibility assessment',
			'Strangler-fig migration blueprint & milestone plan',
			'Cloud compute cost savings model',
			'60-minute executive & tech lead readout session'
		],
		cta: 'Get Assessment Scope',
		utmContent: 'pricing-assessment'
	},
	{
		kicker: 'DEEP OPTIMIZATION',
		duration: '2 WEEKS',
		title: 'Performance Audit & Fix',
		body: 'Hands-on profiling, flamegraphs, memory layout restructuring, and actual turnkey Pull Requests that resolve your latency regressions directly.',
		price: 'From $3,500',
		cadence: '/ sprint',
		features: [
			'Everything in Assessment package',
			'Complete flamegraph and allocations profiling',
			'Production PRs implementing zero-copy hot paths',
			'Automated Criterion.rs benchmark harness',
			'Guaranteed p99 metric reduction threshold'
		],
		cta: 'Book Performance Sprint',
		utmContent: 'pricing-performance-sprint',
		featured: true,
		badge: 'Most Popular Sprint'
	},
	{
		kicker: 'EMBEDDED CAPACITY',
		duration: 'FLEXIBLE',
		title: 'Monthly Retainer',
		body: 'On-demand senior systems capacity embedded in your sprints. Ideal for continuous feature development, PR reviews, and team pairing.',
		price: 'From $900',
		cadence: '/ month',
		features: [
			'Reserved senior Rust engineering sprint hours',
			'Priority async GitHub code reviews under 12h',
			'Direct Slack / Discord / MS Teams channel access',
			'Weekly live pairing & architectural alignment'
		],
		cta: 'Inquire Retainer Slot',
		utmContent: 'pricing-retainer'
	}
];
