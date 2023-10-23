<template>
    <section class="p-[8%] rounded-[3.125rem]" :class="{ 'bg-primary': props.highlight }">
        <slot/>
    </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    highlight?: boolean
}>(), {
    highlight: false,
})
</script>

<style scoped>
</style>
