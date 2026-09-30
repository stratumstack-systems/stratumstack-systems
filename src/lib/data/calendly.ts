import type { CalendlyConfig } from '$lib/types';

/**
 * ⚠️ Set this to your real Calendly scheduling link before going live.
 *
 * Find it in Calendly under the event type → "Copy link". It looks like
 * `https://calendly.com/<your-handle>/<event-slug>`. Either edit the fallback
 * below or set `VITE_CALENDLY_URL` in the build environment (Netlify → Site
 * settings → Environment variables, or `.env.local` when running `npm run dev`)
 * — the env var wins, so staging and production can point at different events.
 */
const FALLBACK_URL = 'https://calendly.com/stratumstack/30min';

const fromEnv = (import.meta.env.VITE_CALENDLY_URL as string | undefined)?.trim();

export const calendly: CalendlyConfig = {
	url: fromEnv || FALLBACK_URL,

	/** Shown on the embed's header strip, mirroring how the event is configured. */
	eventLabel: 'Technical Triage Call',
	eventDuration: '30 Min · Google Meet',

	/**
	 * Calendly renders the booking UI in an iframe we cannot style with our own
	 * CSS, so we pass the palette through its query parameters instead. Hex
	 * values are sent without the leading `#`.
	 *
	 * Note: colour customisation is a paid Calendly feature. On the free plan
	 * these parameters are ignored and the widget renders in Calendly's default
	 * light theme — the embed still works, it just won't match the dark UI.
	 */
	theme: {
		background: '0b0e18',
		text: 'e0e2f0',
		primary: '2563eb'
	},

	/**
	 * Hides the duplicate event blurb (we already sell the call in our own copy)
	 * and the cookie banner Calendly stacks on top of the calendar.
	 */
	hideEventTypeDetails: true,
	hideGdprBanner: true
};

/**
 * Campaign tagging so Calendly's "Booking page" analytics can attribute a
 * booking to the CTA that produced it. `utm_content` is set per call site.
 */
export const calendlyUtm = {
	utmSource: 'stratumstack-site',
	utmMedium: 'website',
	utmCampaign: 'technical-triage-call'
} as const;
