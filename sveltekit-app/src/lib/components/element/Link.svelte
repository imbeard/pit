<script>
	export let to;
	export let target;

	let label;
	let href;
	let category;

	if (to?.source === 'linkEmail') {
		href = 'mailto:' + to?.linkEmail?.url;
		label = to?.linkEmail?.label;
	}

	if (to?.source === 'linkInternal') {
		href = `${category}/` + to?.linkInternal?.url;
		label = to?.linkInternal?.label;
		target = '_self';

		if (to?.category === 'about' || to?.category === 'homepage' || to?.category === 'contact') {
			href = `/${to?.category}`;
		}

		if (to?.category === 'archive') {
			if(to?.url == 'performances') {
				href = '/performances';
			}
			if(to?.url == 'events') {
				href = '/events';
			}
			if(to?.url == 'people') {
				href = '/people';
			}
			if(to?.url == 'partners') {
				href = '/partners';
			}
		}
	}

	if (to?.source === 'linkExternal') {
		href = to?.linkExternal?.url;
		label = to?.linkExternal?.label;
		target = '_blank';
	}

	if (to?.source === 'linkPhone') {
		href = 'tel:' + to?.linkPhone?.url;
		label = to?.linkPhone?.label;
	}

	if (to?.source === 'linkDownload') {
		href = to?.linkDownload?.url;
		label = to?.linkDownload?.label;
	}
</script>

<a {href} {target} rel="noopener noreferrer">{label}</a>
