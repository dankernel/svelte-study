import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DB_API_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ fetch }) => {
	const supabaseUrl = 'https://nlcwryuhknbzyuntjcbz.supabase.co';
	const supabaseKey = DB_API_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);

	let { data: user, error } = await supabase.from('user').select('email');

	console.log(user);
	return { user };
};
