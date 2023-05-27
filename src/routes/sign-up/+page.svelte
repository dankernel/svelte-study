<script lang="ts">
	import { PUBLIC_DB_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { createClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';

	const SUPABASE_URL = PUBLIC_SUPABASE_URL;
	const SUPABASE_ANON_KEY = PUBLIC_DB_API_KEY;

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	let email: string = '';
	let password: string = '';

	supabase.auth.onAuthStateChange((event, session) => {
		session = session;
	});

	const signUp = async (): Promise<void> => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});
		if (error) console.error(error);
		else console.log(data);
	};

	const getSession = async () => {
		const { data, error } = await supabase.auth.getSession();
		return data.session?.user.email;
	};
	getSession().then((session) => {
		console.log(session);
	});

	const logOut = async (): Promise<void> => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
	};
</script>

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session}!</p>
		<button on:click={logOut}>Log out</button>
	{:else}
		<div class="container">
			<h1>sign-up</h1>
			<input bind:value={email} type="email" placeholder="Email" />
			<input bind:value={password} type="password" placeholder="Password" />
			<button on:click={signUp}>Sign Up</button>
		</div>
	{/if}
{/await}

<style lang="scss">
	@import '/src/styles.scss';
</style>
