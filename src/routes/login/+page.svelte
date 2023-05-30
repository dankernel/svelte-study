<script lang="ts">
	import { getSession, logOut, signIn } from '$lib/authenticate';
	import { toast } from '@zerodevx/svelte-toast';
	import { Button, Heading, Input, Label } from 'flowbite-svelte';

	let email = '';
	let password = '';
</script>

{#await getSession() then session}
	{#if session}
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
			>Welcome, {session.user.user_metadata['user_name']}</Heading
		>
		<a href="/mypage">My Page</a>

		<br />
		<Button color="green" on:click={logOut}>Log out</Button>
	{:else}
		<div class="container">
			<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
				>Login</Heading
			>
			<div class="mb-6">
				<Label for="email" class="mb-2">Email address</Label>
				<Input bind:value={email} type="email" placeholder="Email" />
			</div>
			<div class="mb-6">
				<Label for="password" class="mb-2">Password</Label>
				<Input bind:value={password} type="password" placeholder="Password" />
			</div>
			<Button color="green" on:click={() => signIn({ email, password, toast })}>Sign In</Button>
			<Button color="green"><a href="/sign-up">Sign Up</a></Button>
		</div>
	{/if}
{/await}
