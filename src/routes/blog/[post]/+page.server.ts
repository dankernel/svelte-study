import { PUBLIC_DB_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_DB_API_KEY);

	const { data: user } = await supabase.from('user').select('email');

	console.log(user);
	return { user };
};
