<script>
	// @ts-nocheck
	import htm from 'htm';
	import vhtml from 'vhtml';
	import { toHTML, uriLooksSafe } from '@portabletext/to-html';

	export let data;
	export let theme = '';

	$: html = htm.bind(vhtml);
	$: components = {
		listItem: ({ children }) =>
			html`<li class="list-checkbox">
				<div class="tick"></div>
				<span>${children}</span>
			</li>`,

		block: {
			h2: ({ children }) => {
				return html`<h2 class="text-xl">${children}</h2>`;
			},
			h3: ({ children }) => {
				return html`<h2 class="text-xl">${children}</h2>`;
			}
		},

		marks: {
			linkInternal: ({ children, value }) => {
				const slug = value.url.slug || '';

				let category = '';


				if (value.url.category === 'performance') {
					category = 'performances';
				}

				if (value.url.category === 'partner') {
					category = 'partners';
				}

				if (value.url.category === 'people') {
					category = 'people';
				}

				if (value.url.category === 'event') {
					category = 'events';
				}

				if (value.url.category === 'resource') {
					category = 'resources';
				}

				if (slug) {
					return html`<a
						class="leading-0 cursor-pointer px-[2px] theme-pink-blue hover:theme-blue-pink ${theme}"
						href="/${category}/${slug}"
						>${children}</a
					>`;
				}
				return children;
			},
			linkExternal: ({ children, value }) => {
				const href = value.url || '';

				if (uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
					return html`<a
						class="leading-0 cursor-pointer px-[2px] theme-pink-blue hover:theme-blue-pink ${theme}"
						href="${href}"
						rel="${rel}"
						target="_blank"
						>${children}</a
					>`;
				}
				return children;
			},
			linkEmail: ({ children, value }) => {
				const href = value.url || '';

				if (uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
					return html`<a
						class="leading-0 cursor-pointer px-[2px] ${theme}"
						href="mailto:${href}"
						rel="${rel}"
						>${children}</a
					>`;
				}
				return children;
			},
			// em: ({ children }) => html`<em>${children}</em>`,
			
		}
	};
</script>

<div class="rich-text">
	{@html toHTML(data, { components })}
</div>

<style>
:global(.rich-text p:not(:last-child)) {
	padding-bottom: var(--spacing-s);
}
</style>