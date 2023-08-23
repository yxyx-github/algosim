<template>
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
                <div class="text-center">{{ value }}</div>
                <Slider :min="0" :max="100" v-model="value"/>
            </FColumn>
            <FRow :gap="0" class="p-buttonset">
                <Button size="small" icon="pi pi-step-forward" aria-label="Step Forward" v-tooltip.top="'Step Forward'"/>
                <Button size="small" icon="pi pi-fast-forward" aria-label="Fast Forward" v-tooltip.top="'Fast Forward'"/>
            </FRow>
        </FRow>
    </FRow>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import FRow from '@/components/lib/layout/FRow.vue'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

type PlaybackStatus = 'stopped' | 'paused' | 'running'

interface Props {
    min?: number
    max?: number
    modelValue: number
}

const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 100,
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})
const status: Ref<PlaybackStatus> = ref('stopped')
const timeout: Ref<ReturnType<typeof setTimeout> | null> = ref(null)

const playButtonLabel = computed(() => status.value === 'running' ? 'Pause' : 'Play')

function play() {
    if (status.value === 'running') {
        status.value = 'paused'
        timeout.value = null
    } else {
        status.value = 'running'
        initTimeout()
    }
}

function stop() {
    status.value = 'stopped'
    value.value = props.min
}

function continuePlayback() {
    timeout.value = null
    if (status.value === 'running') {
        value.value++
        initTimeout()
    }
}

function initTimeout() {
    if (timeout.value === null) {
        timeout.value = setTimeout(continuePlayback, 500)
    }
}
</script>

<style scoped>
</style>
