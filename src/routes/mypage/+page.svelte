<script lang="ts">
	import { PUBLIC_DB_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { createClient } from '@supabase/supabase-js';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { toast } from '@zerodevx/svelte-toast';
	import Navbar from '../../components/Navbar.svelte';

	const SUPABASE_URL = PUBLIC_SUPABASE_URL;
	const SUPABASE_ANON_KEY = PUBLIC_DB_API_KEY;

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	let subscriptionType = 'basic';
	let user_name = '';
	let user;
	let email = '';
	let password = '';
	let session;
	let my_subscriptions: any[] = [];

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

	const update = async () => {
		const { data, error } = await supabase.auth.updateUser({
			data: { user_name: user_name }
		});
		session = getSession();
	};

	const logOut = async (): Promise<void> => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		location.reload();
	};

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { json } from '@sveltejs/kit';

	const navigateToSignup = (): void => {
		goto('/sign-up');
	};

	function gotoLogin() {
		location.href = 'login';
	}

	onMount(async () => {
		user = (await supabase.auth.getSession()).data.session?.user;
		if (!user) {
			// Handle the case when user is not logged in.
			return;
		}
		user_name = user.user_metadata['user_name'];
		readSubscribe();
	});

	const handleSubscription = async () => {
		session = await getSession();

		const { data, error } = await supabase
			.from('subscriptions')
			.insert([{ user_id: session?.user.id, subscription_type: subscriptionType }]);

		if (error) {
			console.error('Error inserting subscription: ', error);
			toast.push(error.message, {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(187,72,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			// Handle the error.
		} else {
			// Handle the success.

			toast.push('subscription!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			readSubscribe();
		}
	};

	const readSubscribe = async () => {
		const currentDate = new Date().toISOString(); // 현재 시간을 타임스탬프로 변환

		let { data: subscriptions, error } = await supabase
			.from('subscriptions')
			.select('*')
			.gte('expiration_date', currentDate)
			.order('created_at');

		if (subscriptions == null) {
			return;
		}
		my_subscriptions = subscriptions;
		return subscriptions;
	};

	// 구독 취소 로직
	const cancelSubscription = async (id: string) => {
		// 여기에 구독 취소에 필요한 로직을 구현합니다.
		// Supabase의 업데이트 또는 삭제 작업 등을 수행할 수 있습니다.

		const { data, error } = await supabase.from('subscriptions').delete().eq('id', id);

		readSubscribe();
	};
</script>

<Navbar />

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session.user.user_metadata['user_name']}!</p>

		<div>
			<h1>Subscription</h1>

			{#if my_subscriptions.length > 0}
				<table>
					<thead>
						<tr>
							{#each Object.keys(my_subscriptions[0]) as key}
								<th>{key}</th>
							{/each}
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{#each my_subscriptions as item}
							<tr>
								{#each Object.values(item) as value}
									<td>{value}</td>
								{/each}
								<td><button on:click={() => cancelSubscription(item.id)}>구독 취소</button></td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<p><center>No data</center></p>
			{/if}

			<h2>Select your subscription</h2>
			<select bind:value={subscriptionType}>
				<option value="basic">basic</option>
				<option value="premium">premium</option>
				<!-- Add more options as needed -->
			</select>
			<button on:click={handleSubscription}>Subscribe</button>
			<button on:click={readSubscribe}>Update Subscribe</button>

			<br />
			<div class="container">
				<h1>Update</h1>
				<input bind:value={user_name} type="text" placeholder="user_name" />
				<button on:click={update}>Update</button>
			</div>
		</div>

		<button on:click={logOut}>Log out</button>
	{:else}
		<h1>wrong approach</h1>
		<button on:click={gotoLogin}>login</button>
	{/if}
{/await}

<SvelteToast />

<style lang="scss">
	@import '/src/styles.scss';
</style>
