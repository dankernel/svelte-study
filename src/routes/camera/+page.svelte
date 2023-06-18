<script lang="ts">
	import { Heading } from 'flowbite-svelte';

	import { onMount } from 'svelte';

	onMount(async () => {
		mainInit();
	});

	let apiEndpoint = 'http://192.168.10.17:31258';
	let buttonText = 'Capture and Send Image';
	let data = null;

	// Init camera
	function camInit(stream) {
		var cameraView = document.getElementById('cameraview');
		cameraView.srcObject = stream;
		cameraView.play();
	}

	function camInitFailed(error) {
		console.log('get camera permission failed : ', error);
		alert('get camera permission failed', error);
	}

	// Main init

	function mainInit() {
		// Check navigator media device available
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			// Navigator mediaDevices not supported
			alert('Media Device not supported');
			return;
		}

		navigator.mediaDevices.getUserMedia({ video: true }).then(camInit).catch(camInitFailed);
	}

	async function captureAndSendImage() {
		const cameraView = document.getElementById('cameraview') as HTMLVideoElement;
		const canvas = document.createElement('canvas');
		canvas.width = cameraView.videoWidth;
		canvas.height = cameraView.videoHeight;
		canvas.getContext('2d').drawImage(cameraView, 0, 0);

		const imageBase64 = canvas.toDataURL('image/jpeg');
		// Remove data:image/jpeg;base64, from the string
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
		} else {
			data = await response.json();
			console.log(data);
		}
	}
</script>

<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
	>Camera</Heading
>

<div>
	<video id="cameraview" width="320" height="240" />

	<input bind:value={apiEndpoint} type="text" placeholder="Enter API Endpoint" />

	<button on:click={captureAndSendImage}>{buttonText}</button>

	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
