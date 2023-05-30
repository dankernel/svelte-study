<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.postcss';
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />
<div class="container">
	<slot />
</div>

<SvelteToast />
