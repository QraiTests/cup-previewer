<template>
	<div id="app">
		<MugPreview ref="preview" />

		<div class="mug-panel">
			<MugInput data-style-outline type="file" @change="onUpload" />
			<MugButton data-style-accent @click="onDownload">Download</MugButton>
		</div>
	</div>
</template>

<script>
import MugPreview from './components/MugPreview.vue'
import MugButton from './components/ui/MugButton.vue'
import MugInput from './components/ui/MugInput.vue'

export default {
    name: "App",
    components: {
		MugPreview,
		MugButton,
		MugInput
	},
	methods: {
		onUpload(e) {
			let file = e.target.files[0]
			
			this.$refs.preview.setUpper(URL.createObjectURL(file))
		},
		onDownload() {
			let url = this.$refs.preview.getURL()

			// Create link and emulate click for downloading
			let urlEl = document.createElement('a')
			urlEl.download = 'result.png'
			urlEl.href = url
			urlEl.click()

			console.log(url)
		}
	}
}
</script>

<style lang="scss">
#app {
	width: 100vw;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-color: var(--color-1);
}

.mug-panel {
	width: 100%;
	padding: 0 16px;
	margin-top: auto;
	margin-bottom: 60px;

	display: flex;
	flex-direction: column;
	align-items: center;

	input, button {
		margin: 8px 0;
	}
	button {
		width: 100%;
		height: 100%;
	}
}

@media screen and (min-width: 768px) {
	.mug-panel {
		max-width: 768px;
		margin: 0;

		flex-direction: row;

		input, button {
			margin: 0 8px;
		}
		button {
			width: max-content;
		}
	}
}
</style>