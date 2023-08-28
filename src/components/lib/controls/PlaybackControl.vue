<template>
    <FRow>
        <FRow :gap="0" class="p-buttonset">
            <Button @click="play" size="small" :icon="`pi pi-${playback.status === 'running' ? 'pause' : 'play'}`" :aria-label="playButtonLabel" v-tooltip.top="playButtonLabel"/>
            <Button @click="stop" size="small" icon="pi pi-stop" aria-label="Stop" v-tooltip.top="'Stop'"/>
        </FRow>

<!--        <FRow :grow="true" :gap="3">
            <FRow :gap="0" class="p-buttonset">
                <Button @click="toBegin" size="small" icon="pi pi-fast-backward" aria-label="Begin" v-tooltip.top="'Begin'"/>
                <Button @click="backward" size="small" icon="pi pi-step-backward" aria-label="Backward" v-tooltip.top="'Backward'"/>
            </FRow>
            <FColumn class="mb-2" justifyItems="center" :gap="0" :grow="true">
                <div class="text-center">{{ labelText }}</div>
                <Slider :min="props.min" :max="props.max" v-model="value"/>
            </FColumn>
            <FRow :gap="0" class="p-buttonset">
                <Button @click="forward" size="small" icon="pi pi-step-forward" aria-label="Forward" v-tooltip.top="'Forward'"/>
                <Button @click="toEnd" size="small" icon="pi pi-fast-forward" aria-label="End" v-tooltip.top="'End'"/>
            </FRow>
        </FRow>-->
    </FRow>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import FRow from '@/components/lib/layout/FRow.vue'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import { computed, reactive } from 'vue'

type PlaybackStatus = 'stopped' | 'paused' | 'running'

interface Props {
    min?: number
    max?: number
    modelValue: number
    label?: (value: number) => string
}

const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 100,
    label: (value) => `${value}`,
})

const emit = defineEmits(['update:modelValue'])

const labelText = computed(() => props.label(value.value))

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const playback = reactive<{
    status: PlaybackStatus
    timeout: ReturnType<typeof setTimeout>
}>({
    status: 'stopped',
    timeout: null,
})

const playButtonLabel = computed(() => playback.status === 'running' ? 'Pause' : 'Play')

function play() {
    if (playback.status === 'running') {
        playback.status = 'paused'
        playback.timeout = null
    } else {
        if (playback.status === 'stopped' && value.value === props.max) {
            value.value = props.min
        }
        playback.status = 'running'
        initTimeout()
    }
}

function stop() {
    playback.status = 'stopped'
    value.value = props.min
}

function continuePlayback() {
    playback.timeout = null
    if (playback.status === 'running' && value.value < props.max) {
        value.value++
        initTimeout()
    } else {
        playback.status = 'stopped'
    }
}

function initTimeout() {
    if (playback.timeout === null) {
        playback.timeout = setTimeout(continuePlayback, 500)
    }
}

function toBegin() {
    value.value = props.min
}

function toEnd() {
    value.value = props.max
}

function backward() {
    if (value.value > props.min) {
        value.value--
    }
}

function forward() {
    if (value.value < props.max) {
        value.value++
    }
}
</script>

<style scoped>
</style>
