/**
 * Thin wrapper around Calendly's embed widget.
 *
 * The widget is a ~50KB third-party script plus its own stylesheet, so it is
 * deliberately kept out of the bundle and out of the initial page load. Nothing
 * is fetched until a visitor actually needs it: the inline embed asks for it
 * when it scrolls into view, a popup button asks for it on click. `loadWidget`
 * is idempotent — the first caller injects the tags, everyone else awaits the
 * same promise.
 */

import { browser } from '$app/environment';
import { calendly, calendlyUtm } from '$lib/data/calendly';
import type { CalendlyPrefill, CalendlyUtm } from '$lib/types';

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';

/** Calendly posts its lifecycle events from this origin and no other. */
const CALENDLY_ORIGIN = 'https://calendly.com';

interface CalendlyWidgetOptions {
	url: string;
	parentElement?: HTMLElement;
	prefill?: CalendlyPrefill;
	utm?: CalendlyUtm;
}

interface CalendlyApi {
	initInlineWidget(options: CalendlyWidgetOptions): void;
	initPopupWidget(options: CalendlyWidgetOptions): void;
	closePopupWidget(): void;
}

declare global {
	interface Window {
		Calendly?: CalendlyApi;
	}
}

let pending: Promise<CalendlyApi> | null = null;

/**
 * Injects the Calendly stylesheet and script once, resolving with the global
 * API object. Rejects if the script fails to load (offline, blocked by a
 * tracker blocker, CSP) so callers can fall back to a plain link.
 */
export function loadWidget(): Promise<CalendlyApi> {
	if (!browser) return Promise.reject(new Error('Calendly is browser-only'));
	if (window.Calendly) return Promise.resolve(window.Calendly);
	if (pending) return pending;

	pending = new Promise<CalendlyApi>((resolve, reject) => {
		if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = WIDGET_CSS;
			document.head.appendChild(link);
		}

		const settle = () => {
			if (window.Calendly) resolve(window.Calendly);
			else reject(new Error('Calendly widget loaded without exposing its API'));
		};

		const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_JS}"]`);
		if (existing) {
			existing.addEventListener('load', settle, { once: true });
			existing.addEventListener('error', () => reject(new Error('Calendly script failed')), {
				once: true
			});
			return;
		}

		const script = document.createElement('script');
		script.src = WIDGET_JS;
		script.async = true;
		script.addEventListener('load', settle, { once: true });
		script.addEventListener('error', () => reject(new Error('Calendly script failed')), {
			once: true
		});
		document.head.appendChild(script);
	});

	// Let a later attempt retry after a transient network failure.
	pending.catch(() => {
		pending = null;
	});

	return pending;
}

/**
 * Builds the scheduling URL with our palette and campaign parameters baked in.
 * Calendly reads these from the query string of the embedded page, so they have
 * to travel on the URL rather than through `initInlineWidget` options.
 */
export function schedulingUrl(url: string = calendly.url, utmContent?: string): string {
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		// A malformed link is a config mistake; hand it back untouched so the
		// broken value is visible rather than silently swallowed.
		return url;
	}

	const { theme, hideEventTypeDetails, hideGdprBanner } = calendly;

	if (theme) {
		parsed.searchParams.set('background_color', theme.background);
		parsed.searchParams.set('text_color', theme.text);
		parsed.searchParams.set('primary_color', theme.primary);
	}
	if (hideEventTypeDetails) parsed.searchParams.set('hide_event_type_details', '1');
	if (hideGdprBanner) parsed.searchParams.set('hide_gdpr_banner', '1');

	parsed.searchParams.set('utm_source', calendlyUtm.utmSource);
	parsed.searchParams.set('utm_medium', calendlyUtm.utmMedium);
	parsed.searchParams.set('utm_campaign', calendlyUtm.utmCampaign);
	if (utmContent) parsed.searchParams.set('utm_content', utmContent);

	return parsed.toString();
}

/** UTM payload in the shape `initInlineWidget`/`initPopupWidget` expect. */
export function utmFor(utmContent?: string): CalendlyUtm {
	return { ...calendlyUtm, utmContent };
}

/** Opens the Calendly overlay, loading the widget first if needed. */
export async function openPopup(utmContent?: string, prefill?: CalendlyPrefill): Promise<void> {
	const api = await loadWidget();
	api.initPopupWidget({
		url: schedulingUrl(calendly.url, utmContent),
		prefill,
		utm: utmFor(utmContent)
	});
}

/** The lifecycle events Calendly broadcasts to the parent page. */
export type CalendlyEventName =
	| 'calendly.profile_page_viewed'
	| 'calendly.event_type_viewed'
	| 'calendly.date_and_time_selected'
	| 'calendly.event_scheduled';

/**
 * Subscribes to Calendly's `postMessage` events. Returns an unsubscribe
 * function suitable for returning from a `$effect`.
 *
 * The origin check matters: any page can post a message shaped like Calendly's,
 * so an unguarded listener would let a third party fake a booking confirmation.
 */
export function onCalendlyEvent(handler: (event: CalendlyEventName) => void): () => void {
	if (!browser) return () => {};

	const listener = (message: MessageEvent) => {
		if (message.origin !== CALENDLY_ORIGIN) return;

		const name = (message.data as { event?: unknown } | null)?.event;
		if (typeof name === 'string' && name.startsWith('calendly.')) {
			handler(name as CalendlyEventName);
		}
	};

	window.addEventListener('message', listener);
	return () => window.removeEventListener('message', listener);
}
