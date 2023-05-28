<script>
	import { PUBLIC_DB_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { createClient } from '@supabase/supabase-js';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_DB_API_KEY);

	let email = '';
	let password = '';

	const signUp = async () => {
		const { error } = await supabase.auth.signUp({
			email,
			password
		});
		if (error) console.error(error);
	};
</script>

<div>
	<input bind:value={email} type="email" placeholder="Email" />
	<input bind:value={password} type="password" placeholder="Password" />
	<button on:click={signUp}>Sign Up</button>
</div>
