<script>
	import htm from 'htm';
	import vhtml from 'vhtml';
	import { toHTML, uriLooksSafe } from '@portabletext/to-html';

	export let data;

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
			link: ({ children, value }) => {
				const href = value.url.slug || '';

				if (uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
					return html`<a
						class="leading-0 cursor-pointer px-xs theme-pink-blue hover:theme-blue-pink"
						href="/partners/${href}"
						rel="${rel}"
						>${children}</a
					>`;
				}
				return children;
			},
			linkInternal: ({ children, value }) => {
				const slug = value.url.slug || '';
				const category = value.url.category || '';
				if (slug) {
					return html`<a
						class="leading-0 cursor-pointer px-xs theme-pink-blue hover:theme-blue-pink"
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
						class="leading-0 cursor-pointer px-xs theme-pink-blue hover:theme-blue-pink"
						href="${href}"
						rel="${rel}"
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
						class="leading-0 cursor-pointer px-xs theme-pink-blue hover:theme-blue-pink"
						href="mailto:${href}"
						rel="${rel}"
						>${children}</a
					>`;
				}
				return children;
			},
			ol: ({ children }) =>
				html`<ol>
					${children}
				</ol>`,
			ul: ({ children }) =>
				html`<ul>
					${children}
				</ul>`
		}
	};
</script>

{@html toHTML(data, { components })}
