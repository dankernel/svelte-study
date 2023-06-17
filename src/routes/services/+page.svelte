<script lang="ts">
	import { DeviceMockup, Heading } from 'flowbite-svelte';

	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { onMount } from 'svelte';

	let file: FileList;
	let image: ArrayBuffer;

	const ffmpeg = createFFmpeg({ log: true });

	onMount(async () => {
		await ffmpeg.load();
	});

	const convertToImage = async () => {
		let temp_file = file[0];
		console.log(temp_file);
		console.log(temp_file);
		console.log(temp_file);
		// 파일을 메모리에 쓴다.
		ffmpeg.FS('writeFile', temp_file.name, await fetchFile(temp_file));

		// 첫번째 프레임을 추출한다.
		// await ffmpeg.run('-i', temp_file.name, '-frames:v', '1', 'output.png');

		// 인코딩
		await ffmpeg.run('-i', temp_file.name, 'output.mp4');

		// 결과물을 가져온다.
		image = ffmpeg.FS('readFile', 'output.mp4');

		// 메모리를 정리한다.
		ffmpeg.FS('unlink', temp_file.name);
		ffmpeg.FS('unlink', 'output.mp4');
	};
</script>

<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
	>services</Heading
>

<div>
	<input type="file" bind:files={file} on:change={convertToImage} />
	{#if image}
		<video src={URL.createObjectURL(new Blob([image], { type: 'video/mp4' }))} />
	{/if}
</div>

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
