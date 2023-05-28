<script lang="ts">
	import { PUBLIC_DB_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { createClient } from '@supabase/supabase-js';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { toast } from '@zerodevx/svelte-toast';

	const SUPABASE_URL = PUBLIC_SUPABASE_URL;
	const SUPABASE_ANON_KEY = PUBLIC_DB_API_KEY;

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	let subscriptionType = '';
	let user;
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
		return data.session;
	};

	const getEmail = async () => {
		const { data, error } = await supabase.auth.getSession();
		return data.session?.user.email;
	};

	const logOut = async (): Promise<void> => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		location.reload();
	};

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const navigateToSignup = (): void => {
		goto('/sign-up');
	};

	function gotoLogin() {
		location.href = 'login';
	}

	onMount(async () => {
		user = supabase.auth.user();
		if (!user) {
			console.log('User is not logged in');
			// Handle the case when user is not logged in.
			return;
		}
	});

	const handleSubscription = async () => {
		const { data, error } = await supabase
			.from('subscriptions')
			.insert([{ user_id: user.id, subscription_type: subscriptionType }]);

		if (error) {
			console.error('Error inserting subscription: ', error);
			// Handle the error.
		} else {
			console.log('Subscription inserted: ', data);
			// Handle the success.
		}
	};
</script>

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session.user.email}!</p>
		<button on:click={logOut}>Log out</button>
	{:else}
		<h1>wrong approach</h1>
		<button on:click={gotoLogin}>login</button>
	{/if}
{/await}

<SvelteToast />

<div>
	<h2>Select your subscription</h2>
	<select bind:value={subscriptionType}>
		<option value="">Select a subscription</option>
		<option value="type1">Type 1</option>
		<option value="type2">Type 2</option>
		<!-- Add more options as needed -->
	</select>
	<button on:click={handleSubscription}>Subscribe</button>
</div>

<style lang="scss">
	@import '/src/styles.scss';
</style>
