<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	let user_name: string = '';
	let email: string = '';
	let password: string = '';

	supabase.auth.onAuthStateChange((session) => {
		session = session;
	});

	const signUp = async (): Promise<void> => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { user_name: user_name }
			}
		});

		if (error) {
			console.error(error);
			toast.push(error.message, {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(187,72,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
		} else {
			console.log(data);
			location.replace('login');
		}
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
			<input bind:value={user_name} type="text" placeholder="Name" />
			<input bind:value={email} type="email" placeholder="Email" />
			<input bind:value={password} type="password" placeholder="Password" />
			<button on:click={signUp}>Sign Up</button>
		</div>
	{/if}
{/await}

<SvelteToast />
