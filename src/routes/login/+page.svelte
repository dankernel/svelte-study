<script lang="ts">
	import { getSession, logOut, signIn } from '$lib/authenticate';
	import { toast } from '@zerodevx/svelte-toast';
	import { Button, Input, Label } from 'flowbite-svelte';

	let email = '';
	let password = '';

	function togo_sign_up() {
		location.href = 'sign-up';
	}
</script>

{#await getSession() then session}
	{#if session}
		<p>Welcome, {session.user.user_metadata['user_name']}</p>
		<a href="/mypage">My Page</a>

		<br />
		<Button color="green" on:click={logOut}>Log out</Button>
	{:else}
		<div class="container">
			<h1>Login</h1>
			<div class="mb-6">
				<Label for="email" class="mb-2">Email address</Label>
				<Input bind:value={email} type="email" placeholder="Email" />
			</div>
			<div class="mb-6">
				<Label for="password" class="mb-2">Password</Label>
				<Input bind:value={password} type="password" placeholder="Password" />
			</div>
			<Button color="green" on:click={() => signIn({ email, password, toast })}>Sign In</Button>
			<Button color="green" on:click={() => togo_sign_up()}>Sign Up</Button>
		</div>
	{/if}
{/await}
