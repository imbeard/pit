<script>
	import CloudShape_2 from '$lib/components/svg/CloudShape-2.svelte';
	import CloudShape_3 from '$lib/components/svg/CloudShape-3.svelte';
	import CloudShape_4 from '$lib/components/svg/CloudShape-4.svelte';
	import CloudShape_5 from '$lib/components/svg/CloudShape-5.svelte';
	import CloudShape_6 from '$lib/components/svg/CloudShape-6.svelte';
	import PortableText from './element/PortableText.svelte';

	export let coreValues;

	let activePopup = null;

	function showPopup(index) {
		activePopup = index;
	}

	function hidePopup() {
		activePopup = null;
	}
</script>

{#if coreValues && coreValues.length > 0}
	{#if coreValues[0]}
		<div class="relative z-20 ml-[20%] md:ml-0 rotate-3 md:absolute md:top-0 md:left-[15%]">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				class="relative flex justify-center items-center size-cloud max-w-32"
				on:mouseover={() => showPopup(0)}
				on:mouseleave={hidePopup}
			>
				<div class="artist-cloud flex justify-center items-center">
					<div class="w-full h-auto">
						<CloudShape_2 cloudBg="blue" cloudFg="blue" />
					</div>
					<div
						class="texts absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button pointer-events-none text-pink"
					>
						<div class="typo-lg text-center p-1">{coreValues[0]?.heading}</div>
					</div>
				</div>
			</div>
			{#if activePopup === 0}
				<div
					class="absolute top-full left-0 z-10 bg-blue text-pink -rotate-5 p-xs size-cloud max-w-30 typo-s"
				>
					<div class="flex w-full justify-end md:hidden">X</div>
					<PortableText data={coreValues[0]?.content} />
				</div>
			{/if}
		</div>
	{/if}

	{#if coreValues[1]}
		<div class="relative mr-[20%] md:mr-0 md:absolute md:top-18 md:left-[5%]">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				class="relative flex justify-center items-center size-cloud max-w-42"
				on:mouseover={() => showPopup(1)}
				on:mouseleave={hidePopup}
			>
				<div class="artist-cloud flex justify-center items-center">
					<div class="size-cloud-pink h-auto">
						<CloudShape_3 cloudBg="pink" cloudFg="pink" />
					</div>
					<div
						class="texts absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button pointer-events-none text-black"
					>
						<div class="typo-lg text-center p-1">{coreValues[1]?.heading}</div>
					</div>
				</div>
			</div>
			{#if activePopup === 1}
				<div
					class="absolute top-full left-0 z-10 bg-pink text-black -rotate-5 p-xs size-cloud max-w-30 typo-s"
				>
					<div class="flex w-full justify-end md:hidden">X</div>
					<PortableText data={coreValues[1]?.content} />
				</div>
			{/if}
		</div>
	{/if}

	{#if coreValues[2]}
		<div class="relative ml-[20%] md:ml-0 md:absolute md:top-14 md:left-[40%]">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				class="relative flex justify-center items-center size-cloud"
				on:mouseover={() => showPopup(2)}
				on:mouseleave={hidePopup}
			>
				<div class="artist-cloud flex justify-center items-center">
					<div class="w-full h-auto">
						<CloudShape_4 cloudBg="brown" cloudFg="brown" />
					</div>
					<div
						class="texts absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button pointer-events-none text-pink"
					>
						<div class="typo-lg text-center p-1">{coreValues[2]?.heading}</div>
					</div>
				</div>
			</div>
			{#if activePopup === 2}
				<div
					class="absolute top-full left-0 z-10 bg-brown text-pink -rotate-5 p-xs size-cloud max-w-30 typo-s"
				>
					<div class="flex w-full justify-end md:hidden">X</div>
					<PortableText data={coreValues[2]?.content} />
				</div>
			{/if}
		</div>
	{/if}

	{#if coreValues[3]}
		<div class="relative mr-[20%] md:mr-0 md:absolute md:top-0 md:right-[5%]">
			<div class="relative flex justify-center items-center size-cloud max-w-24">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<div
					class="artist-cloud flex justify-center items-center"
					on:mouseover={() => showPopup(3)}
					on:mouseleave={hidePopup}
				>
					<div class="w-full h-auto">
						<CloudShape_5 cloudBg="gray" cloudFg="gray" />
					</div>
					<div
						class="texts absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button pointer-events-none text-blue"
					>
						<div class="typo-lg text-center p-1">{coreValues[3]?.heading}</div>
					</div>
				</div>
			</div>
			{#if activePopup === 3}
				<div
					class="absolute top-full left-0 z-10 bg-gray text-blue -rotate-5 p-xs size-cloud max-w-30 typo-s"
				>
					<div class="flex w-full justify-end md:hidden">X</div>
					<PortableText data={coreValues[3]?.content} />
				</div>
			{/if}
		</div>
	{/if}

	{#if coreValues[4]}
		<div class="relative ml-[20%] md:ml-0 md:absolute md:right-[8%] md:mt-30">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				class="relative flex flex-col justify-center items-center"
				on:mouseover={() => showPopup(4)}
				on:mouseleave={hidePopup}
			>
				<div class="artist-cloud flex justify-center items-center">
					<div class="w-full h-auto size-cloud-red">
						<CloudShape_6 cloudBg="red" cloudFg="red" />
					</div>
					<div
						class="texts absolute top-xs bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button pointer-events-none"
					>
						<div class="typo-lg text-center p-1">{coreValues[4]?.heading}</div>
					</div>
				</div>
			</div>
			{#if activePopup === 4}
				<div
					class="absolute top-full left-0 z-10 bg-red text-black -rotate-5 p-xs size-cloud max-w-30 typo-s"
				>
					<div class="flex w-full justify-end md:hidden">X</div>
					<PortableText data={coreValues[4]?.content} />
				</div>
			{/if}
		</div>
	{/if}
{/if}

<style>
	.size-cloud-pink {
		width: clamp(240px, 36vw, 600px);
		height: auto;
	}

	.size-cloud-red {
		width: clamp(300px, 36vw, 600px);
		height: auto;
	}
</style>
