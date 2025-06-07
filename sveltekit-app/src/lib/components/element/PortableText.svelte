<script>
// @ts-nocheck

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
			normal: ({ children }) => {
				return html`<p class="rich-text-p">${children}</p>`;
			},
			h2: ({ children }) => {
				return html`<h2 class="text-xl">${children}</h2>`;
			},
            h3: ({ children }) => {
				return html`<h2 class="text-xl">${children}</h2>`;
			}
		},

		marks: {
			link: ({ children, value }) => {
				const href = value.href || '';

				if (uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
					return html`<a href="${href}" rel="${rel}">${children}</a>`;
				}
				return children;
			}
		}
	};
</script>

{@html toHTML(data, { components })}

<style>
	:global(.rich-text-p:not(:last-of-type)) {
		padding-bottom: 2rem;
	}
</style>