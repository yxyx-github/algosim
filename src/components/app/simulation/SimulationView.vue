<template>
    <FColumn :grow="true">
        <slot v-if="currentSimulationStep !== null" name="step" :index="playbackValue - 1" :stepData="currentSimulationStep"/>
        <PlaybackControl v-model="playbackValue" :min="1" :max="numberOfSteps" :label="createPlaybackLabel"/>
    </FColumn>
</template>

<script setup lang="ts" generic="S extends SimulationStep">
import FColumn from '@/components/lib/layout/FColumn.vue'
import PlaybackControl from '@/components/lib/controls/PlaybackControl.vue'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import type { Simulation, SimulationStep } from '@/main/simulation/types'

const props = defineProps<{
    simulation: Simulation<S>
}>()

const playbackValue = ref(1)

const numberOfSteps = computed(() => props.simulation.steps.length)

function createPlaybackLabel(value: number) {
    return `Step: ${value}/${numberOfSteps.value}`
}

const currentSimulationStep: ComputedRef<S | null> = computed(() => props.simulation.steps[playbackValue.value - 1] ?? null)
</script>

<style scoped>
</style>
