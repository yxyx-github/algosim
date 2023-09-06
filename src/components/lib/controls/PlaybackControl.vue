<template>
    <ButtonBar>
        <ButtonGroup>
            <Button @click="play" :icon="`pi pi-${playback.status === 'running' ? 'pause' : 'play'}`" :aria-label="playButtonLabel" v-tooltip.top="playButtonLabel"/>
            <Button @click="stop" icon="pi pi-stop" aria-label="Stop" v-tooltip.top="'Stop'"/>
        </ButtonGroup>

        <FRow :grow="true" :gap="3">
            <ButtonGroup>
                <Button @click="toBegin" icon="pi pi-fast-backward" aria-label="Begin" v-tooltip.top="'Begin'"/>
                <Button @click="backward" icon="pi pi-step-backward" aria-label="Backward" v-tooltip.top="'Backward'"/>
            </ButtonGroup>
            <FColumn class="mb-2" justifyItems="around" :gap="0" :grow="true">
                <div class="text-center">{{ labelText }}</div>
                <Slider :min="props.min" :max="props.max" v-model="value"/>
            </FColumn>
            <ButtonGroup>
                <Button @click="forward" icon="pi pi-step-forward" aria-label="Forward" v-tooltip.top="'Forward'"/>
                <Button @click="toEnd" icon="pi pi-fast-forward" aria-label="End" v-tooltip.top="'End'"/>
            </ButtonGroup>
        </FRow>
    </ButtonBar>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import FRow from '@/components/lib/layout/FRow.vue'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import { computed, reactive } from 'vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import ButtonGroup from '@/components/lib/controls/ButtonGroup.vue'

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
    label: (value: number) => `${value}`,
})

const emit = defineEmits(['update:modelValue'])

const labelText = computed(() => props.label(value.value))

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const playback = reactive<{
    status: PlaybackStatus
    animationFrame: ReturnType<typeof requestAnimationFrame> | null
    previousTimeStamp: DOMHighResTimeStamp | null,
}>({
    status: 'stopped',
    animationFrame: null,
    previousTimeStamp: null,
})

const playButtonLabel = computed(() => playback.status === 'running' ? 'Pause' : 'Play')

function play() {
    if (playback.status === 'running') {
        playback.status = 'paused'
    } else {
        if (playback.status === 'stopped' && value.value === props.max) {
            value.value = props.min
        }
        playback.status = 'running'
        startAnimation()
    }
}

function stop() {
    playback.status = 'stopped'
    value.value = props.min
    stopAnimation()
}

function startAnimation() {
    if (playback.animationFrame === null) {
        playback.animationFrame = requestAnimationFrame(continuePlayback)
    }
}

function stopAnimation() {
    cancelAnimationFrame(playback.animationFrame)
    playback.animationFrame = null
    playback.previousTimeStamp = null
}

function nextAnimationStep() {
    if (playback.status === 'running') {
        playback.animationFrame = requestAnimationFrame(continuePlayback)
    } else {
        stopAnimation()
    }
}

function continuePlayback(timeStamp: DOMHighResTimeStamp) {
    if (value.value < props.max) {
        if (playback.previousTimeStamp === null) {
            playback.previousTimeStamp = timeStamp
        } else if (timeStamp - playback.previousTimeStamp >= 500) {
            value.value++
            playback.previousTimeStamp = timeStamp
        }
        nextAnimationStep()
    } else {
        playback.status = 'stopped'
        stopAnimation()
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
