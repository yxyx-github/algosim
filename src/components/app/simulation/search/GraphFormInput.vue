<template>
    <div class="grid gap-2 max-w-fit max-h-min" :class="isEmpty ? 'grid-rows-[2rem_2rem] grid-cols-[2rem_2rem]' : 'grid-rows-[1fr_2rem] grid-cols-[1fr_2rem]'">
        <div
                class="grid gap-0 max-w-fit max-h-min cursor-crosshair"
                :style="`grid-template-columns: repeat(${cols}, minmax(0, 1fr));`"
        >
            <div v-if="isEmpty"></div>
            <GraphFormItemVisualization v-else v-for="(item, index) in graphFormItems" :key="index" class="w-full h-full" :item="item" @update:item="updateItem"/>
        </div>
        <Button @click="addColumn" class="w-[2rem]" icon="pi pi-plus" severity="secondary" aria-label="Add Column" v-tooltip.top="'Add Column'"/>
        <Button @click="addRow" class="w-full" icon="pi pi-plus" severity="secondary" aria-label="Add Row" v-tooltip.top="'Add Row'"/>
        <Button @click="clear" class="w-full" icon="pi pi-trash" severity="danger" aria-label="Clear" v-tooltip.top="'Clear'"/>
    </div>
</template>

<script setup lang="ts">
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import Button from 'primevue/button'
import { computed } from 'vue'
import type { ComputedRef, WritableComputedRef } from 'vue'
import type { GraphForm, GraphFormItem } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

const props = defineProps<{
    modelValue: GraphForm
}>()

const emit = defineEmits<{
    'update:modelValue': [modelValue: GraphForm]
}>()

const graphForm: WritableComputedRef<GraphForm> = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})

const graphFormItems: ComputedRef<GraphFormItem[]> = computed(() => {
    let items: GraphFormItem[] = []
    graphForm.value.forEach(row =>
        items = items.concat(row)
    )
    return items
})

const rows = computed(() => graphForm.value.length)
const cols = computed(() => graphForm.value[0]?.length ?? 0)
const isEmpty = computed(() => rows.value === 0 && cols.value === 0)

function addRow() {
    const oldCols = cols.value
    if (oldCols === 0) {
        clear()
    } else {
        const newRow: GraphFormItem[] = []
        for (let i = 0; i < oldCols; i++) {
            newRow.push({
                type: GraphFormItemType.NODE,
                label: '',
                coords: { x: i, y: rows.value },
                connections: { top: false, right: false, bottom: false, left: false },
                connect: { top: false, right: false, bottom: false, left: false },
                highlight: { top: false, right: false, bottom: false, left: false },
                isStart: false,
                isEnd: false,
            })
        }
        graphForm.value.push(newRow)
    }
}

function addColumn() {
    const oldCols = cols.value
    if (oldCols === 0) {
        clear()
    } else {
        graphForm.value.forEach((row, index) => row.push({
            type: GraphFormItemType.NODE,
            label: '',
            coords: { x: oldCols, y: index },
            connections: { top: false, right: false, bottom: false, left: false },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
            isStart: false,
            isEnd: false,
        }))
    }
}

function clear() {
    graphForm.value = [[{
        type: GraphFormItemType.NODE,
        label: '',
        coords: { x: 0, y: 0 },
        connections: { top: false, right: false, bottom: false, left: false },
        connect: { top: false, right: false, bottom: false, left: false },
        highlight: { top: false, right: false, bottom: false, left: false },
        isStart: false,
        isEnd: false,
    }]]
}

clear()

function updateItem(item: GraphFormItem) {
    graphForm.value[item.coords.y][item.coords.x] = item
}
</script>

<style scoped>
</style>
