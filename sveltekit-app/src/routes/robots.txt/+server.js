export async function GET({ url }) {
	const isProduction = url.hostname === 'pitperform.eu';

	const robots = isProduction
		? `# robots.txt for pitperform.eu

User-agent: *
Allow: /

Sitemap: https://pitperform.eu/sitemap.xml`
		: `# Disallow all crawling on preview/staging deployments

User-agent: *
Disallow: /`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
