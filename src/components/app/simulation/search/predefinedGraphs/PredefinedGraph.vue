<template>
    <div class="max-w-72 h-72 border-4 border-red-500">
        <GraphFormVisualization class="w-72 h-72 border-4 border-yellow-500" :graphForm="props.graphForm"/>
    </div>
</template>

<script setup lang="ts">
import type { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import GraphFormVisualization from '@/components/app/simulation/search/visualization/GraphFormVisualization.vue'

const props = defineProps<{
    graphForm: GraphForm
}>()
</script>

<style scoped>
</style>
