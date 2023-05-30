<script lang="ts">
	import { getSession, logOut, signIn } from '$lib/authenticate';
	import { toast } from '@zerodevx/svelte-toast';

	let email = '';
	let password = '';
</script>

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session}!</p>
		<a href="/mypage">My Page</a>

		<br />
		<button on:click={logOut}>Log out</button>
	{:else}
		<div class="container">
			<h1>Login</h1>
			<input bind:value={email} type="email" placeholder="Email" />
			<input bind:value={password} type="password" placeholder="Password" />
			<button on:click={() => signIn({ email, password, toast })}>Sign In</button>
			<a href="/sign-up">Sign-up</a>
		</div>
	{/if}
{/await}
