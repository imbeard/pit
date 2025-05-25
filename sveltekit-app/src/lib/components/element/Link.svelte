<script>
	export let to;
	export let target = 'auto';

	let label = to.label;
	let href = to.url;
	let category = to.category;

	if (to.source === 'linkEmail') {
		href = 'mailto:' + to.url;
	}

	if (to.source === 'linkInternal') {
		href = `${category}/` + to.url;
	}
</script>

<a {href} {target} rel="noopener noreferrer">{label}</a>
