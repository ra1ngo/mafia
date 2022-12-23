<script>
	import { fade } from 'svelte/transition';
	import DebugInfo from './blocks/debug-info.svelte';

	const w = document.querySelector('#game canvas').offsetWidth + 'px';
	const h = document.querySelector('#game canvas').offsetHeight + 'px';
</script>

<div class="gui-container" style="--w:{w}; --h:{h};" transition:fade>
	<DebugInfo />
</div>

<style>
	.gui-container {
		width: var(--w);
		height: var(--h);
	}
</style>