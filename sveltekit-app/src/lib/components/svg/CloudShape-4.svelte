<script>
	export let cloudBg = 'black';
	export let cloudFg = 'white';
	export let link;

	$: themeColor = `var(--color-${cloudBg})`;
	$: hoverColor = `var(--color-${cloudFg})`;
</script>

<a href={link} class="hover-svg cursor-pointer" style="--hover-color: {hoverColor}">
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 300 118"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M119.311 14.5892C131.31 13.78 167.617 -10.2089 180.5 5.08916C188.5 14.5892 217.312 5.58917 241.312 5.08916C265.312 4.58916 290.812 57.089 298.812 75.0892C303.235 85.0403 281.526 91.6278 259.199 96.6292L223 110.322L216.5 107.586L201 115.586C194.5 113.831 179.9 111.375 173.5 115.586C167.1 119.797 156.166 117.341 151.5 115.586L133 110.322L127 115.586H111L104 110.322L99.4998 112.086L91.4998 113.586L76.4998 115.586L47.9998 110.322L42.4998 107.586L24.4998 97.5862L15.116 85.7894C10.169 81.6375 6.04452 77.8224 3.31131 75.0892C-7.1884 64.589 8.81143 30.5892 29.8113 22.5892C50.8113 14.5892 65.8114 18.5891 119.311 14.5892Z"
			fill={themeColor}
		/>
	</svg>
</a>

<style>
	.hover-svg:hover path {
		fill: var(--hover-color);
	}
</style>
