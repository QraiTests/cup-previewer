<template>
	<button v-bind="$props" @click="$emit('click', $event)">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'MugButton'
}
</script>

<style lang="scss" scoped>
button {
	padding: 20px 16px;

	cursor: pointer;
	transition: var(--transition);

	font-size: 20px;

	background-color: var(--color-1);
	color: var(--color-text);

	border-radius: var(--border-radius);

	&:hover {
		background-color: var(--color-2);
	}

	&[data-style-accent] {
		background: #fff6a1;
		color: black;

		&:hover {
			background: #f2e785;
		}
	}

	@media screen and (min-width: 768px) {
		padding: 8px 16px;

		font-size: 16px;
	}
}
</style>