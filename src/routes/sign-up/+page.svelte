<script lang="ts">
	import { getSession, logOut, signUp } from '$lib/authenticate';
	import { supabase } from '$lib/supabase';
	import { toast } from '@zerodevx/svelte-toast';
	import { Button, Input, Label } from 'flowbite-svelte';

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
			<div class="mb-6">
				<Label for="text" class="mb-2">Name</Label>
				<Input bind:value={user_name} type="text" placeholder="Name" />
			</div>
			<div class="mb-6">
				<Label for="email" class="mb-2">Email address</Label>
				<Input bind:value={email} type="email" placeholder="Email" />
			</div>
			<div class="mb-6">
				<Label for="email" class="mb-2">password</Label>
				<Input bind:value={password} type="password" placeholder="Password" />
			</div>
			<Button color="green" on:click={() => signUp({ user_name, email, password, toast })}
				>Sign Up</Button
			>
		</div>
	{/if}
{/await}
