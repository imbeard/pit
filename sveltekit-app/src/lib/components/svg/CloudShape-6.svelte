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
		viewBox="0 0 323 143"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M107.838 13.9158L116.415 26.2288L128.465 29.0171L149.552 33.8966L206.632 56.0556L253.806 35.9856L275.51 24.4822L302.467 36.9169L303.653 59.2253L321.267 73.6296L322.15 97.2452L287.949 99.6598L275.887 110.64L267.145 115.503L248.138 142.779L215.022 110.328L203.569 113.186L199.335 131.486L186.079 128.419L180.054 127.025L150.829 124.394L86.6657 105.416L31.8375 92.7293L27.1807 77.1919L14.6937 57.0884L0.540819 46.9279L2.52369 19.1555L6.75812 0.855498L26.6409 5.45616L57.3688 12.5663L78.315 7.08451L107.838 13.9158Z"
			fill={themeColor}
		/>
	</svg>
</a>

<style>
	.hover-svg:hover path {
		fill: var(--hover-color);
	}
</style>
