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
import type { ComputedRef, WritableComputedRef } from 'vue'
import { computed } from 'vue'
import type { GraphForm, GraphFormItem } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import { getBlankGraphFormItem, graphFormToItems } from '@/main/algorithms/search/graphForm'

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

const graphFormItems: ComputedRef<GraphFormItem[]> = computed(() => graphFormToItems(graphForm.value))

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
            newRow.push(getBlankGraphFormItem(i, rows.value))
        }
        graphForm.value.push(newRow)
    }
}

function addColumn() {
    const oldCols = cols.value
    if (oldCols === 0) {
        clear()
    } else {
        graphForm.value.forEach((row, index) => row.push(getBlankGraphFormItem(oldCols, index)))
    }
}

function clear() {
    graphForm.value = [[getBlankGraphFormItem(0, 0)]]
}

clear()

function updateItem(item: GraphFormItem) {
    graphForm.value[item.coords.y][item.coords.x] = {
        ...item,
        type: Object.values(item.connections)
            .filter(v => v)
            .length === 2
            ? GraphFormItemType.EDGE
            : GraphFormItemType.VERTEX }
}
</script>

<style scoped>
</style>
