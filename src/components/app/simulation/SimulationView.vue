<template>
    <FColumn :grow="true">
        <FRow :grow="true" alignItems="end" class="max-h-[calc(100%-18px)]">
            <slot v-if="currentSimulationStep !== null" name="step" :index="playbackValue - 1" :stepData="currentSimulationStep"/>
        </FRow>
        <PlaybackControl v-model="playbackValue" :min="1" :max="numberOfSteps" :label="createPlaybackLabel"/>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import PlaybackControl from '@/components/lib/controls/PlaybackControl.vue'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import type { Simulation, SimulationResult, SimulationStep } from '@/simulation'
import FRow from '@/components/lib/layout/FRow.vue'

interface Props {
    simulation: Simulation<SimulationStep, SimulationResult>
}

const props = defineProps<Props>()

const playbackValue = ref(1)

const numberOfSteps = computed(() => props.simulation.steps.length)

function createPlaybackLabel(value: number) {
    return `Step: ${value}/${numberOfSteps.value}`
}

const currentSimulationStep: ComputedRef<SimulationStep | null> = computed(() => props.simulation.steps[playbackValue.value - 1] ?? null)
</script>

<style scoped>
</style>
