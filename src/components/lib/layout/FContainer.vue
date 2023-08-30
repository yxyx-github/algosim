<template>
    <component :is="props.is" class="flex" :class="containerClass">
        <slot/>
    </component>
</template>

<script lang="ts" setup>
import { computed, h } from 'vue'

type Threshold = 'mobile' | '2sm' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type Direction = 'row' | 'col'
type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type JustifyItems = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export interface FlexProps {
    direction?: { [key in Threshold]: Direction } | Direction
    alignItems?: { [key in Threshold]: AlignItems } | AlignItems
    justifyItems?: { [key in Threshold]: JustifyItems } | JustifyItems
    gap?: { [key in Threshold]: number } | number
    wrap?: { [key in Threshold]: boolean } | boolean
    grow?: { [key in Threshold]: boolean } | boolean
    is?: any
}

const props = withDefaults(defineProps<FlexProps>(), {
    direction: 'row',
    alignItems: 'stretch',
    justifyItems: 'start',
    gap: 2,
    wrap: false,
    grow: false,
    is: h('div'),
})

const containerClass = computed(() => `
        ${buildClass(props.direction, value => `flex-${value}`)}
        ${buildClass(props.alignItems, value => `items-${value}`)}
        ${buildClass(props.justifyItems, value => `justify-${value}`)}
        ${buildClass(props.gap, value => `gap-${value}`)}
        ${buildClass(props.wrap, value => `${value ? 'flex-wrap' : 'flex-nowrap'}`)}
        ${buildClass(props.grow, value => `${value ? 'grow' : 'grow-0'}`)}
    `)

function buildClass(data: { [key in Threshold]: any } | any, buildSingle: (value: any) => string) {
    if (typeof data === 'object') {
        console.log(typeof data)
        let className = ''
        for (const [key, value] of Object.entries(data)) {
            className += ` ${key}:${buildSingle(value)}`
        }
        console.log(className.trim())
        return className.trim()
    } else {
        return buildSingle(data)
    }
}
</script>

<style scoped>
</style>
