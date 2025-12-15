<script>
	import { page } from '$app/state';

	export let data;
	export let pageTitle;

	// Default values
	const defaults = {
		ogType: 'website',
		ogImage: '/images/ogImage.png',
		siteName: 'PIT',
		locale: 'en_US'
	};

	// Computed values
	const title = data?.title
		? `${defaults.siteName} | ${data?.title}`
		: !data?.title && pageTitle
			? `${defaults.siteName} | ${pageTitle}`
			: defaults.siteName;
	const description = data?.description || '';
	const image = data?.imageUrl || '';
	const ogType = data?.ogType || defaults.ogType;
	const twitterCard = data?.imageUrl || '';
	const siteName = data?.siteName || defaults.siteName;
	const locale = data?.locale || defaults.locale;
	const canonical = data?.canonical || page?.url?.href;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="image" content={image} />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content={siteName} />
	<!-- <meta property="og:locale" content={locale} /> -->

	<!-- Twitter -->
	<meta property="twitter:card" content={twitterCard} />
	<meta property="twitter:url" content={canonical} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Additional Meta Tags -->
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="utf-8" /> -->
</svelte:head>
