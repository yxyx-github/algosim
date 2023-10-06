<template>
    <div
            class="grid gap-0 max-w-fit max-h-min"
            :style="`grid-template-rows: repeat(${rows}, minmax(0, 1fr)); grid-template-columns: repeat(${cols}, minmax(0, 1fr)); aspect-ratio: ${cols} / ${rows};`"
    >
        <GraphFormItemVisualization v-for="(item, index) in graphFormItems" :key="index" class="w-full h-full" :class="{
                        'z-10 outline outline-green-600': isStartItem(item),
                        'z-10 outline outline-blue-600': isEndItem(item),
                    }" :item="item" :readOnly="true" :scale="props.scale"/>
    </div>
</template>

<script setup lang="ts">
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import { computed } from 'vue'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

const props = withDefaults(defineProps<{
    graphForm: GraphForm,
    scale?: number,
}>(), {
    scale: 1,
})

const graphFormItems = computed(() => props.graphForm.toItems())

const rows = computed(() => props.graphForm.rows())
const cols = computed(() => props.graphForm.cols())

function isStartItem(item: GraphFormItem) {
    return props.graphForm.getStartItem() === item
}

function isEndItem(item: GraphFormItem) {
    return props.graphForm.getEndItem() === item
}
</script>

<style scoped>
</style>
