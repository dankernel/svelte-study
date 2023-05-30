<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import Card from '../../components/Card.svelte';
</script>

<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
	>pricing</Heading
>

<div class="container">
	<center>
		<div style="white-space: nowrap;">
			<div style="display: inline-block;">
				<Card />
			</div>
			<div style="display: inline-block;">
				<Card />
			</div>
			<div style="display: inline-block;">
				<Card />
			</div>
		</div>
	</center>
</div>
