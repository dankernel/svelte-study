<script lang="ts">
	import { PUBLIC_DB_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { createClient } from '@supabase/supabase-js';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	const SUPABASE_URL = PUBLIC_SUPABASE_URL;
	const SUPABASE_ANON_KEY = PUBLIC_DB_API_KEY;

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	let email = '';
	let password = '';

	const signIn = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			console.error('Error : ' + error.message);
			toast.push('Sign in fail' + error.message, {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(187,72,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
		} else {
			console.log(data);
			location.reload();
		}
	};

	const getSession = async () => {
		const { data, error } = await supabase.auth.getSession();
		return data.session?.user.email;
	};

	const logOut = async (): Promise<void> => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		location.reload();
	};

	import { goto } from '$app/navigation';

	const navigateToSignup = (): void => {
		goto('/sign-up');
	};

	function gotoMypage() {
		location.href = 'mypage';
	}
</script>

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session}!</p>
		<button on:click={gotoMypage}>My Page</button>
		<br />
		<button on:click={logOut}>Log out</button>
	{:else}
		<div class="container">
			<h1>Login</h1>
			<input bind:value={email} type="email" placeholder="Email" />
			<input bind:value={password} type="password" placeholder="Password" />
			<button on:click={signIn}>Sign In</button>
			<button on:click={navigateToSignup}>Sign-up</button>
		</div>
	{/if}
{/await}

<SvelteToast />
