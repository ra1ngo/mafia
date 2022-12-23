<script>
import { fps, ping, x, y } from '../store';
</script>

<div class="debug_info">
	fps: {parseInt($fps)} ping: {parseInt($ping)} x: {parseInt($x)} y: {parseInt($y)}
</div>

<style type="text/css">
	.debug_info {
		position: absolute;
		right: 0;
		top: 0;
		margin: 10px;
	}
</style>