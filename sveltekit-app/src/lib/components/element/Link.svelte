<script>
	export let to;
	export let target = 'auto';

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
	}

	if (to?.source === 'linkExternal') {
		href = to?.linkExternal?.url;
		label = to?.linkExternal?.label;
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
