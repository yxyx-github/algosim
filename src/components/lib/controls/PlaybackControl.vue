<template>
    <ButtonBar>
        <ButtonGroup>
            <Button @click="onPlay" :icon="`pi pi-${playback.status === 'running' ? 'pause' : 'play'}`" :aria-label="playButtonLabel" v-tooltip.top="playButtonLabel"/>
            <Button @click="onStop" icon="pi pi-stop" aria-label="Stop" v-tooltip.top="'Stop'"/>
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
import { useAnimationInterval } from '@/composables/animations/animationInterval'

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
    timeoutLength: number
}>({
    status: 'stopped',
    timeoutLength: 100,
})

const playButtonLabel = computed(() => playback.status === 'running' ? 'Pause' : 'Play')

const animationInterval = useAnimationInterval(
    () => value.value++,
    () => {
        const next = value.value < props.max
        if (!next) {
            playback.status = 'stopped'
        }
        return next
    },
    () => playback.timeoutLength,
)

function onPlay() {
    if (playback.status === 'running') {
        playback.status = 'paused'
        animationInterval.stop()
    } else {
        if (playback.status === 'stopped' && value.value === props.max) {
            value.value = props.min
        }
        playback.status = 'running'
        animationInterval.start()
    }
}

function onStop() {
    playback.status = 'stopped'
    value.value = props.min
    animationInterval.stop()
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
