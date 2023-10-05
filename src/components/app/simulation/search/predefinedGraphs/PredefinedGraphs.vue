<template>
    <Dialog v-model:visible="visible" modal header="Select a graph" :style="{ 'min-width': '80vw' }" contentClass="mb:w-screen md:w-full">
        PredefinedGraphs
    </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'

const emit = defineEmits<{
    'update:show': [value: boolean],
}>()

const props = defineProps<{
    show: boolean
}>()

const visible = computed({
    get: () => props.show,
    set: val => emit('update:show', val),
})
</script>

<style scoped>
</style>
