<script lang="ts">
	import { Button } from 'flowbite-svelte';
	function gotoLogin() {
		location.href = 'login';
	}
</script>

<div class="container">
	<h1>Hello</h1>
	<Button color="green" on:click={gotoLogin}>login</Button>
</div>
