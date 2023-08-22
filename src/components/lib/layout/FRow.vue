<template>
    <component :is="props.is" class="flex flex-row" :class="rowClass">
        <slot/>
    </component>
</template>

<script lang="ts" setup>
import { computed, h } from 'vue'

interface Props {
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    justifyItems?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    gap?: number
    wrap?: boolean
    grow?: boolean
    is?: any
}

const props = withDefaults(defineProps<Props>(), {
    alignItems: 'stretch',
    justifyItems: 'start',
    gap: 2,
    wrap: false,
    grow: false,
    is: h('div'),
})

const rowClass = computed(() => `
        items-${props.alignItems}
        justify-${props.justifyItems}
        gap-${props.gap}
        ${props.wrap ? 'flex-wrap' : 'flex-nowrap'}
        ${props.grow ? 'grow' : 'grow-0'}
    `)
</script>

<style scoped>
</style>
