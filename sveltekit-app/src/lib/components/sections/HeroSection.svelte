<script>
	import Image from '../element/Image.svelte';
	import Video from '../element/Video.svelte';
	import PortableText from '../element/PortableText.svelte';

	export let section;
	$: video = section?.video;
	$: image = section?.image;
</script>

<div>
	{#if video.url}
		<Video src={video.url} alt={video.alt} poster={video.poster} />
		{#if video.caption}
			<div class="typo-s pt-xs">
				<PortableText data={video.caption} />
			</div>
		{/if}
	{:else if image}
		<Image {image} alt={image.alt} showCaption={true} />
	{/if}
</div>
