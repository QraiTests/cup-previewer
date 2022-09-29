<template>
	<input v-bind="$props" @change="$emit('change', $event)">
</template>

<script>
export default {
	name: 'MugInput'
}
</script>

<style lang="scss" scoped>
input {
	padding: 8px 16px;

	cursor: pointer;
	transition: var(--transition);

	font-size: 16px;

	background-color: var(--color-1);
	color: var(--color-text);
	
	border-radius: var(--border-radius);
}
</style>