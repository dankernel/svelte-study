import { PUBLIC_DB_API_KEY } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	PUBLIC_DB_API_KEY;
};
