<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let apiEndpoint = 'http://192.168.10.17:31258';
	let buttonText = 'Capture and Send Image';
	let data: any = null;

	let cameraView: HTMLVideoElement | null = null;

	onMount(() => {
		mainInit();
	});

	function camInit(stream: MediaStream): void {
		cameraView = document.getElementById('cameraview') as HTMLVideoElement;
		cameraView.srcObject = stream;
		cameraView.onloadedmetadata = function () {
			cameraView!.play();
		};
	}

	function camInitFailed(error: any): void {
		console.error('get camera permission failed : ', error);
		alert('get camera permission failed');
	}

	async function mainInit(): Promise<void> {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			alert('Media Device not supported');
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: 640,
					height: 480,
					facingMode: 'environment'
				}
			});
			camInit(stream);
		} catch (error) {
			camInitFailed(error);
		}
	}

	async function captureAndSendImage(): Promise<void> {
		if (!cameraView) return;

		const canvas = document.createElement('canvas');
		canvas.width = cameraView.videoWidth;
		canvas.height = cameraView.videoHeight;

		const ctx = canvas.getContext('2d');
		ctx!.drawImage(cameraView, 0, 0);

		const imageBase64 = canvas.toDataURL('image/jpeg');
		const base64Image = imageBase64.split(',')[1];

		const response = await fetch(apiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ image: base64Image })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		data = await response.json();
	}
</script>

<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
	>Camera</Heading
>

<div>
	<video id="cameraview" autoplay playsinline />
	<input bind:value={apiEndpoint} type="text" placeholder="Enter API Endpoint" />
	<button on:click={captureAndSendImage}>{buttonText}</button>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
