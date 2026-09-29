import type { BookingSlot, Guarantee } from '$lib/types';

export const guarantees: Guarantee[] = [
	{
		icon: 'assignment_turned_in',
		title: 'Strict Bilateral NDA',
		body: 'Standard Delaware, UK, or EU governing law NDA executed prior to discussing architecture or receiving repository access.',
		tag: 'PRE-ENGAGEMENT'
	},
	{
		icon: 'copyright',
		title: '100% IP Transfer',
		body: 'All code, automated test harnesses, benchmarks, and technical docs become your exclusive property upon invoice payment.',
		tag: 'EXCLUSIVE OWNERSHIP'
	},
	{
		icon: 'cloud_sync',
		title: 'Zero-Downtime Rollout',
		body: 'We never perform high-risk cutovers. Canary rollouts, parallel run verifications, and instant rollback kill switches protect production.',
		tag: 'ZERO IMPACT'
	},
	{
		icon: 'key',
		title: 'Secure Workstations',
		body: 'Hardware FIDO2 YubiKey enforced access, encrypted LUKS disk drives, zero telemetry storage on unapproved personal devices.',
		tag: 'SOC2 PROTOCOLS'
	},
	{
		icon: 'verified_user',
		title: 'Clean Rust CI/CD',
		body: 'Every deliverable strictly conforms to zero compiler warnings, 100% Clippy pedantic compliance, and verified Miri memory passes.',
		tag: 'VERIFIED CODEBASE'
	}
];

export const bookingSlots: BookingSlot[] = [
	{ label: 'Tomorrow · 15:30 IST' },
	{ label: 'Tomorrow · 18:00 IST' },
	{ label: 'Thu · 16:00 IST' },
	{ label: 'Thu · 19:30 IST' }
];
