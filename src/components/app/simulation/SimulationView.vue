<template>
    <FColumn :grow="true" class="bg-white" :class="{ 'fixed top-0 left-0 bottom-0 right-0 p-1': fullScreen }" :justifyItems="fullScreen ? 'end' : 'start'" @keydown.esc="fullScreen = false">
        <slot v-if="currentSimulationStep !== null" name="step" :index="playbackValue - 1" :stepData="currentSimulationStep"/>
        <PlaybackControl v-model="playbackValue" :min="1" :max="numberOfSteps" :label="createPlaybackLabel">
            <Button @click="toggleFullScreen" :icon="`pi pi-window-${fullScreen ? 'min' : 'max'}imize`" :aria-label="fullScreenButtonLabel" v-tooltip.top="fullScreenButtonLabel"/>
        </PlaybackControl>
    </FColumn>
</template>

<script setup lang="ts" generic="S extends SimulationStep">
import FColumn from '@/components/lib/layout/FColumn.vue'
import PlaybackControl from '@/components/lib/controls/PlaybackControl.vue'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import type { Simulation, SimulationStep } from '@/main/simulation/types'
import Button from 'primevue/button'

const props = defineProps<{
    simulation: Simulation<S>
}>()

const playbackValue = ref(1)

const numberOfSteps = computed(() => props.simulation.steps.length)

function createPlaybackLabel(value: number) {
    return `Step: ${value}/${numberOfSteps.value}`
}

const currentSimulationStep: ComputedRef<S | null> = computed(() => props.simulation.steps[playbackValue.value - 1] ?? null)

const fullScreen = ref<boolean>(false)

const fullScreenButtonLabel = computed(() => fullScreen ? 'Minimize' : 'Maximize')

function toggleFullScreen() {
    fullScreen.value = !fullScreen.value
}
</script>

<style scoped>
</style>
