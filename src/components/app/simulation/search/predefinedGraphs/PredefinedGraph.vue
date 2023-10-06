<template>
    <div class="max-w-72 h-72 cursor-pointer outline-4 outline-offset-4 outline-indigo-600 focus:outline hover:outline" tabindex="0">
        <GraphFormVisualization class="w-72 h-72" :graphForm="props.graphForm"/>
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
