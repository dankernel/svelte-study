<script lang="ts">
	// location.replace('login');

	function gotoLogin() {
		location.href = 'login';
	}
</script>

<h1>Hello</h1>
<button on:click={gotoLogin}>login</button>

<style lang="scss">
	@import '/src/styles.scss';
</style>
