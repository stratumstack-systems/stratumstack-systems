import type { ClockRow, ProcessStep } from '$lib/types';

export const processSteps: ProcessStep[] = [
	{
		number: '01',
		title: 'Discovery Triage',
		body: '30-minute deep technical review of your bottlenecks, repo architecture, and goals.',
		emphasis: 'start'
	},
	{
		number: '02',
		title: 'Proposal & Scope',
		body: 'Fixed milestone deliverables, risk mitigation plan, and fixed budget with zero overruns.'
	},
	{
		number: '03',
		title: 'Sprint Kickoff',
		body: 'Access setup, dev container initialization, and Criterion baseline benchmarks established.'
	},
	{
		number: '04',
		title: 'Weekly Demos',
		body: 'Clean compilable PRs, flamegraph progression readouts, and recorded video demos.'
	},
	{
		number: '05',
		title: 'Handover & CI',
		body: 'Full IP transfer, documented architecture, CI/CD linters locked, and team pairing.',
		emphasis: 'end'
	}
];

export const clockRows: ClockRow[] = [
	{ city: 'San Francisco (PST)', time: '08:00 AM (Sync)' },
	{ city: 'London (GMT)', time: '01:00 PM (Overlap)' },
	{ city: 'Bengaluru (IST)', time: '06:30 PM (Active)', active: true }
];

export const standupLines: string[] = [
	'• Benchmark PR #142: Ingestion latency down 44%',
	'• Clippy pass: 0 warnings, MIRI memory verified',
	'• Ready for Canary deployment review'
];

export const engagementModels: string[] = [
	'Fixed-Price Milestone Deliverables',
	'Monthly Embedded Retainers',
	'Specialized Advisory & PR Review Blocks'
];
