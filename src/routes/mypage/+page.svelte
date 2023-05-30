<script lang="ts">
	import { getSession, logOut } from '$lib/authenticate';
	import { supabase } from '$lib/supabase';
	import {
		Button,
		Heading,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let subscriptionType = 'basic';
	let user_name = '';
	let user;
	let session;
	let my_subscriptions: any[] = [];

	const update = async () => {
		await supabase.auth.updateUser({
			data: { user_name }
		});
		session = getSession();
	};

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

<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
	>My Page
</Heading>

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session.user.user_metadata['user_name']}</p>

		<div>
			<h1>Subscription</h1>

			{#if my_subscriptions.length > 0}
				<Table striped={true}>
					<TableHead>
						{#each Object.keys(my_subscriptions[0]) as key}
							<TableHeadCell>{key}</TableHeadCell>
						{/each}
						<TableHeadCell>Action</TableHeadCell>
					</TableHead>
					<TableBody class="divide-y">
						{#each my_subscriptions as item}
							<TableBodyRow>
								{#each Object.values(item) as value}
									<TableBodyCell>{value}</TableBodyCell>
								{/each}
								<TableBodyCell
									><Button color="red" on:click={() => cancelSubscription(item.id)}
										>구독 취소</Button
									></TableBodyCell
								>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			{:else}
				<p><center>No data</center></p>
			{/if}

			<h2>Select your subscription</h2>
			<select bind:value={subscriptionType}>
				<option value="basic">basic</option>
				<option value="premium">premium</option>
				<!-- Add more options as needed -->
			</select>
			<Button color="green" on:click={handleSubscription}>Subscribe</Button>
			<Button on:click={readSubscribe}>Update Subscribe</Button>

			<br />

			<div class="container">
				<h1>Update</h1>
				<input bind:value={user_name} type="text" placeholder="user_name" />
				<Button color="green" on:click={update}>Update</Button>
			</div>
		</div>

		<Button color="green" on:click={logOut}>Log out</Button>
	{:else}
		<h1>wrong approach</h1>
		<Button color="green"><a href="/login">Login</a></Button>
	{/if}
{/await}
