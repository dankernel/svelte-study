<script lang="ts">
	import { DeviceMockup, Heading } from 'flowbite-svelte';
</script>

<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
	>services</Heading
>
<DeviceMockup device="ios">
	<img
		src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-light.png"
		class="dark:hidden w-[272px] h-[572px]"
		alt="ios example 1"
	/>
	<img
		src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-dark.png"
		class="hidden dark:block w-[272px] h-[572px]"
		alt="ios example 2"
	/>
</DeviceMockup>
