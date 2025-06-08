<script>
	import { browser } from '$app/environment';

	let moveElements = false;

	$: scrollPosition = 0;

	$: if (browser) {
		document.addEventListener('scroll', (event) => {
			scrollPosition = window.scrollY;

			if (scrollPosition > 0) {
				moveElements = true;
			} else {
				moveElements = false;
			}
		});
	}
</script>

<div class="fixed overflow-hidden z-99 top-0 left-0 w-full h-screen pointer-events-none">
	<div
		class="logo-p absolute right-xs top-[28%] transition-all duration-400"
		class:moveout={moveElements}
	>
		<img src="/images/logo-p.svg" alt="" />
	</div>
	<div class="logo-i absolute bottom-xs right-[15%]" class:moveout={moveElements}>
		<img src="/images/logo-i.svg" alt="" />
	</div>
	<div class="logo-t absolute bottom-[35%] left-xs" class:moveout={moveElements}>
		<img src="/images/logo-t.svg" alt="" />
	</div>
</div>

<style>
	.logo-p {
		transform: translateX(0);
		opacity: 1;
		transition: transform 400ms 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.logo-p.moveout {
		opacity: 0;
		transform: translateX(200%);
		transition:
			transform 400ms cubic-bezier(0.215, 0.61, 0.355, 1),
			opacity 100ms 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.logo-i {
		transform: translateY(0);
		opacity: 1;
		transition: transform 400ms 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.logo-i.moveout {
		transform: translateY(200%);
		opacity: 0;
		transition:
			transform 400ms cubic-bezier(0.215, 0.61, 0.355, 1),
			opacity 100ms 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.logo-t {
		transform: translateX(0);
		opacity: 1;
		transition: transform 400ms 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.logo-t.moveout {
		opacity: 0;
		transform: translateX(-200%);
		transition:
			transform 400ms cubic-bezier(0.215, 0.61, 0.355, 1),
			opacity 100ms 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}
</style>
