import type { PageServerLoad } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_DB_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_DB_API_KEY);

	let { data: user, error } = await supabase.from('user').select('email');

	console.log(user);
	return { user };
};
