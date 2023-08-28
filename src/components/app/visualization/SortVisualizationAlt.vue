<template>
    <div class="w-full h-full" ref="sim"></div>
</template>

<script setup lang="ts">
import type { SortSimulation } from '@/algorithms/sort'
import { SortVisualiser } from '@/visualisation/sortVisualiser'
import { onMounted, Ref, ref, watch } from 'vue'

const props = defineProps<{
    simulation: SortSimulation
    step: number
}>()

const sim = ref(null)

const visualizationSteps: Ref<SVGElement[]> = ref([])

function prepareVisualizations() {
    const sortVisualizer = new SortVisualiser(400, 300, 40)
    const visualization = sortVisualizer.visualise(props.simulation)
    visualizationSteps.value = visualization.steps
}

function renderStep() {
    while (sim.value.hasChildNodes()) {
        sim.value.removeChild(sim.value.firstChild)
    }
    sim.value.appendChild(visualizationSteps.value[props.step])
}

onMounted(() => {
    prepareVisualizations()
    renderStep()
})
watch(() => props.simulation, () => {
    prepareVisualizations()
    renderStep()
})
watch(() => props.step, renderStep)
</script>

<style scoped>
</style>
