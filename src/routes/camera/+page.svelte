<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { afterUpdate, onMount } from 'svelte';

	let apiEndpoint = 'https://vhi44p15j3.execute-api.ap-northeast-2.amazonaws.com/test/momp-od';
	let buttonText = 'Capture and Send Image';
	let data: any = null;

	let cameraView: HTMLVideoElement | null = null;
	let overlay: HTMLCanvasElement;

	onMount(() => {
		mainInit();
	});

	afterUpdate(drawBoundingBoxes);

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
					width: 1280,
					height: 720,
					facingMode: 'environment'
				}
			});
			camInit(stream);
		} catch (error) {
			camInitFailed(error);
		}
	}

	function drawBoundingBoxes() {
		if (!data || !overlay) {
			console.log('pass');
			return;
		}

		const context = overlay.getContext('2d');
		context.clearRect(0, 0, overlay.width, overlay.height);
		context.strokeStyle = '#FF0000';
		context.lineWidth = 5;

		data.boxes.forEach(([x1, y1, x2, y2]) => {
			console.log(x1, y1, x2 - x1, y2 - y1);
			context.strokeRect(x1, y1, x2 - x1, y2 - y1);
		});
	}

	async function captureAndSendImage(): Promise<void> {
		if (!cameraView) return;

		if (!cameraView.paused) {
			cameraView.pause();
		} else {
			cameraView.play();
			const context = overlay.getContext('2d');
			context.clearRect(0, 0, overlay.width, overlay.height);
			return;
		}

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
			body: JSON.stringify({ data: base64Image })
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
	<div style="position: relative; width: 480px; height: 320px; object-fit: contain;">
		<video
			id="cameraview"
			width="1280"
			height="720"
			autoplay
			playsinline
			bind:this={cameraView}
			style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;"
		/>

		<canvas
			id="overlay"
			width="1280"
			height="700"
			bind:this={overlay}
			style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;"
		/>
	</div>

	<input bind:value={apiEndpoint} type="text" placeholder="Enter API Endpoint" />
	<button on:click={captureAndSendImage}>{buttonText}</button>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
