<template>
    <ButtonBar>
        <ButtonGroup>
            <Button @click="play" :icon="`pi pi-${playback.status === 'running' ? 'pause' : 'play'}`" :aria-label="playButtonLabel" v-tooltip.top="playButtonLabel"/>
            <Button @click="stop" icon="pi pi-stop" aria-label="Stop" v-tooltip.top="'Stop'"/>
            <Button @click="($refs.timeoutLengthSlider as any).toggle($event)" icon="pi pi-clock" aria-label="Delay" v-tooltip.top="'Delay'"/>
        </ButtonGroup>

        <FRow :grow="true" :gap="3">
            <ButtonGroup>
                <Button @click="toBegin" icon="pi pi-fast-backward" aria-label="Begin" v-tooltip.top="'Begin'"/>
                <Button @click="backward" icon="pi pi-step-backward" aria-label="Backward" v-tooltip.top="'Backward'"/>
            </ButtonGroup>
            <LabeledSlider :label="labelText" class="self-center">
                <Slider :min="props.min" :max="props.max" v-model="value"/>
            </LabeledSlider>
            <ButtonGroup>
                <Button @click="forward" icon="pi pi-step-forward" aria-label="Forward" v-tooltip.top="'Forward'"/>
                <Button @click="toEnd" icon="pi pi-fast-forward" aria-label="End" v-tooltip.top="'End'"/>
            </ButtonGroup>
        </FRow>
        <OverlayPanel ref="timeoutLengthSlider" class="w-96 max-w-full">
            <LabeledSlider class="" :label="`Playback delay: ${playback.timeoutLength} ms`">
                <Slider :min="0" :max="500" v-model="playback.timeoutLength"/>
            </LabeledSlider>
        </OverlayPanel>
    </ButtonBar>
</template>

<script setup lang="ts">
import FRow from '@/components/lib/layout/FRow.vue'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import { computed, reactive } from 'vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import ButtonGroup from '@/components/lib/controls/ButtonGroup.vue'
import LabeledSlider from '@/components/lib/forms/LabeledSlider.vue'
import OverlayPanel from 'primevue/overlaypanel'

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
    timeout: ReturnType<typeof setTimeout> | null
    // animationFrame: ReturnType<typeof requestAnimationFrame> | null
    // previousTimeStamp: DOMHighResTimeStamp | null,
    timeoutLength: number
}>({
    status: 'stopped',
    timeout: null,
    // animationFrame: null,
    // previousTimeStamp: null,
    timeoutLength: 100,
})

const playButtonLabel = computed(() => playback.status === 'running' ? 'Pause' : 'Play')

function play() {
    if (playback.status === 'running') {
        playback.status = 'paused'
        stopAnimation()
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
    /*if (playback.animationFrame === null) {
        playback.animationFrame = requestAnimationFrame(continuePlayback)
    }*/

    if (playback.timeout === null) {
        playback.timeout = setTimeout(continuePlayback, playback.timeoutLength)
    }
}

function stopAnimation() {
    /*if (playback.animationFrame !== null) {
        cancelAnimationFrame(playback.animationFrame)
    }
    playback.animationFrame = null
    playback.previousTimeStamp = null*/

    if (playback.timeout !== null) {
        clearTimeout(playback.timeout)
        playback.timeout = null
    }
}

function nextAnimationStep() {
    // playback.animationFrame = requestAnimationFrame(continuePlayback)

    playback.timeout = setTimeout(continuePlayback, playback.timeoutLength)
}

function continuePlayback(timeStamp?: DOMHighResTimeStamp) {
    if (value.value < props.max) {
        /*if (playback.previousTimeStamp === null) {
            playback.previousTimeStamp = timeStamp
        } else if (timeStamp - playback.previousTimeStamp >= playback.timeoutLength) {
            value.value++
            playback.previousTimeStamp = timeStamp
        }*/

        value.value++

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
