<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import '../app.postcss';
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />
<div class="container">
	<slot />
	<br />

	<SvelteToast />
</div>
<br />
<div class="container">
	<Footer>
		<FooterCopyright href="/" by="dkdk" year={2023} />
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<FooterLink href="/">About</FooterLink>
			<FooterLink href="/">Privacy Policy</FooterLink>
			<FooterLink href="/">Licensing</FooterLink>
			<FooterLink href="/">Contact</FooterLink>
		</FooterLinkGroup>
	</Footer>
</div>

