<script>
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
</script>

<SvelteToast />
<button on:click={() => toast.push('Hello world!')}>SHOW TOAST</button>
