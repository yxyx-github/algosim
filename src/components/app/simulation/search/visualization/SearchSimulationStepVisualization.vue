<template>
    <GraphFormVisualization :graphForm="graphForm"/>
</template>

<script setup lang="ts">
import type { SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import GraphFormVisualization from '@/components/app/simulation/search/visualization/GraphFormVisualization.vue'
import { computed } from 'vue'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'

const props = defineProps<{ step: SearchSimulationStep }>()

const graphForm = computed(() => new GraphForm(props.step.grid))
</script>

<style scoped>
</style>
