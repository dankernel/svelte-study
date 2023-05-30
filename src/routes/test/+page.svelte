<script>
	import { toast } from '@zerodevx/svelte-toast';
</script>

<button on:click={() => toast.push('Hello world!')}>SHOW TOAST</button>
