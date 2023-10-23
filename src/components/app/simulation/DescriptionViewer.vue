<template>
    <TextViewer :class="`mb:mx-0 md:mx-[5%] p-2 ${props.text.length > 0 ? 'border-8' : 'border-0'} rounded-lg border-primary`" :text="text"/>
</template>

<script setup lang="ts">
import TextViewer from '@/components/lib/TextViewer.vue'

const props = defineProps<{
    text: string[]
}>()
</script>

<style scoped>
</style>
