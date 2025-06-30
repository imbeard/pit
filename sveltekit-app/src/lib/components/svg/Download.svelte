<script>
	export let cloudBg = 'pink';
	export let cloudFg = 'blue';

	$: themeColor = `var(--color-${cloudBg})`;
	$: hoverColor = `var(--color-${cloudFg})`;
</script>

<div class="hover-svg cursor-pointer" style="--bg-hover-color: {hoverColor}; --fg-hover-color: {themeColor}">
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 204 204"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
        class="arrow"
			d="M0 102C0 45.667 45.667 0 102 0C158.333 0 204 45.667 204 102C204 158.333 158.333 204 102 204C45.667 204 0 158.333 0 102Z"
			fill={themeColor}
		/>
		<path
         class="circle"
			d="M104.968 108.208C104.968 110.224 104.968 112.528 104.896 114.688C106.192 113.104 107.416 111.736 108.712 110.44L118.288 100.504V111.304L101.152 128.44L84.016 111.304V100.504L93.088 110.008C94.456 111.448 96.04 113.032 97.408 114.688C97.336 112.528 97.336 110.224 97.336 108.136V76.456H104.968V108.208Z"
			fill={hoverColor}
		/>
	</svg>
</div>

<style>
	.hover-svg:hover .arrow {
		fill: var(--bg-hover-color);
	}

    .hover-svg:hover .circle {
		fill: var(--fg-hover-color);
	}
</style>
