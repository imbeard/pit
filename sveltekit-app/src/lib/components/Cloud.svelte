<script>
	export let rotation = '';
	export let link;
	export let entry;
	export let category;
	export let cloudFg = '';
	export let cloudBg = '';

	$: textColor = 'text-' + cloudFg;
	$: hoverColor = `var(--color-${cloudBg})`;
	$: rotate = rotation.startsWith('-') ? `-rotate${rotation}` : `rotate-${rotation}`;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="relative flex justify-center items-center size-cloud {rotate} hover:-rotate-8 transition-rotation duration-150"
	style="--hover-color: {hoverColor}"
>
	<div class="w-full max-w-lg h-auto">
		<slot name="shape"></slot>
	</div>
	<a
		href={entry?.slug && entry?.category ? `/${entry.category}/${entry?.slug}` : link}
		class="texts absolute top-0 bottom-0 left-0 right-0 text-center flex flex-col justify-center items-center h-full w-full button {textColor} pointer-events-none"
	>
		<div class="typo-cloud-s">
			<slot name="title"></slot>
		</div>
		<div class="typo-cloud-base px-2 leading-[1.3rem]">{entry?.title || entry?.name}</div>
	</a>
</div>

<style>
	.size-cloud:hover .texts {
		color: var(--hover-color);
	}
</style>
