<script>
	import { createClient } from '@supabase/supabase-js';

	const SUPABASE_URL = 'https://nlcwryuhknbzyuntjcbz.supabase.co';
	const SUPABASE_ANON_KEY =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sY3dyeXVoa25ienl1bnRqY2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMjg1MzcsImV4cCI6MjAwMDYwNDUzN30.UH0hAccWzbWFarnFY3jyn-7miGL65NeSHKGe3AZqAKg';

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
