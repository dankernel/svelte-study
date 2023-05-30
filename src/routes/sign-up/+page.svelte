<script lang="ts">
	import { getSession, logOut, signUp } from '$lib/authenticate';
	import { supabase } from '$lib/supabase';
	import { toast } from '@zerodevx/svelte-toast';

	let user_name: string = '';
	let email: string = '';
	let password: string = '';

	supabase.auth.onAuthStateChange((session) => {
		session = session;
	});
</script>

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session}!</p>
		<button on:click={logOut}>Log out</button>
	{:else}
		<div class="container">
			<h1>sign-up</h1>
			<input bind:value={user_name} type="text" placeholder="Name" />
			<input bind:value={email} type="email" placeholder="Email" />
			<input bind:value={password} type="password" placeholder="Password" />
			<button on:click={() => signUp({ user_name, email, password, toast })}>Sign Up</button>
		</div>
	{/if}
{/await}
