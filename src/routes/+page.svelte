<script lang="ts">
	import CallToAction from '$lib/components/CallToAction.svelte';
	import CaseStudies from '$lib/components/CaseStudies.svelte';
	import EditorialQuote from '$lib/components/EditorialQuote.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Problems from '$lib/components/Problems.svelte';
	import Process from '$lib/components/Process.svelte';
	import Proof from '$lib/components/Proof.svelte';
	import Services from '$lib/components/Services.svelte';
	import Trust from '$lib/components/Trust.svelte';
	import { site } from '$lib/data/site';

	const title = `${site.fullName} — High-Integrity Rust Engineering`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<Header />

<main class="pt-16">
	<Hero />
	<Problems />
	<Services />
	<EditorialQuote />
	<Pricing />
	<CaseStudies />
	<Proof />
	<Process />
	<Trust />
	<CallToAction />
</main>

<Footer />
