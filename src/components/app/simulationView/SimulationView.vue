<template>
    <FColumn>
        <slot name="step" :data="[]"/>
        <FRow>
            <FRow :gap="0" class="p-buttonset">
                <Button size="small" @click="play" :icon="`pi pi-${status === 'running' ? 'pause' : 'play'}`" :aria-label="playButtonLabel" v-tooltip.top="playButtonLabel"/>
                <Button size="small" @click="stop" icon="pi pi-stop" aria-label="Stop" v-tooltip.top="'Stop'"/>
            </FRow>

            <FRow :grow="true" :gap="3">
                <FRow :gap="0" class="p-buttonset">
                    <Button size="small" icon="pi pi-fast-backward" aria-label="Fast Backward" v-tooltip.top="'Fast Backward'"/>
                    <Button size="small" icon="pi pi-step-backward" aria-label="Step Backward" v-tooltip.top="'Step Backward'"/>
                </FRow>
                <FColumn class="mb-2" justifyItems="center" :gap="0" :grow="true">
                    <div class="text-center">{{ sliderValue }}</div>
                    <Slider :min="0" :max="100" v-model="sliderValue"/>
                </FColumn>
                <FRow :gap="0" class="p-buttonset">
                    <Button size="small" icon="pi pi-step-forward" aria-label="Step Forward" v-tooltip.top="'Step Forward'"/>
                    <Button size="small" icon="pi pi-fast-forward" aria-label="Fast Forward" v-tooltip.top="'Fast Forward'"/>
                </FRow>
            </FRow>
        </FRow>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import FRow from '@/components/lib/layout/FRow.vue'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import { computed, Ref, ref } from 'vue'

type PlaybackStatus = 'stopped' | 'paused' | 'running'

const sliderValue = ref(0)
const status: Ref<PlaybackStatus> = ref('stopped')

const playButtonLabel = computed(() => status.value === 'running' ? 'Pause' : 'Play')

function play() {
    status.value = status.value === 'running' ? 'paused' : 'running'
}

function stop() {
    status.value = 'stopped'
}
</script>

<style scoped>
</style>
