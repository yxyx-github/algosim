<template>
    <Form @submit.prevent="submit">
        <div class="grid gap-2 max-w-fit max-h-min" :class="isEmpty ? 'grid-rows-[2rem_2rem] grid-cols-[2rem_2rem]' : 'grid-rows-[1fr_2rem] grid-cols-[1fr_2rem]'">
            <div
                    class="grid gap-0 max-w-fit max-h-min cursor-crosshair"
                    :style="`grid-template-columns: repeat(${cols}, minmax(0, 1fr));`"
            >
                <div v-if="isEmpty"></div>
                <GraphFormItemVisualization v-else v-for="(item, index) in graphFormItems" :key="index" class="w-full h-full" :item="item"/>
            </div>
            <Button @click="addColumn" class="w-[2rem]" icon="pi pi-plus" severity="secondary" aria-label="Add Column" v-tooltip.top="'Add Column'"/>
            <Button @click="addRow" class="w-full" icon="pi pi-plus" severity="secondary" aria-label="Add Row" v-tooltip.top="'Add Row'"/>
            <Button @click="clear" class="w-full" icon="pi pi-trash" severity="danger" aria-label="Clear" v-tooltip.top="'Clear'"/>
        </div>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/lib/forms/Form.vue'
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import type { GraphForm, GraphFormItem } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import Button from 'primevue/button'

const graphForm: Ref<GraphForm> = ref([
    [
        {
            type: GraphFormItemType.NODE,
            label: 'node',
            coords: { x: 0, y: 0 },
            connections: { top: false, right: true, bottom: true, left: true },
            connect: { top: false, right: true, bottom: true, left: false },
            highlight: { top: false, right: true, bottom: true, left: true },
        }, {
            type: GraphFormItemType.NODE,
            label: 'node',
            coords: { x: 1, y: 0 },
            connections: { top: false, right: false, bottom: false, left: false },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
        }, {
            type: GraphFormItemType.NODE,
            label: 'node',
            coords: { x: 2, y: 0 },
            connections: { top: false, right: true, bottom: true, left: true },
            connect: { top: false, right: true, bottom: true, left: false },
            highlight: { top: false, right: true, bottom: true, left: true },
        },
    ], [
        {
            type: GraphFormItemType.NODE,
            label: 'node',
            coords: { x: 0, y: 1 },
            connections: { top: true, right: true, bottom: false, left: true },
            connect: { top: true, right: true, bottom: false, left: false },
            highlight: { top: true, right: true, bottom: false, left: true },
        }, {
            type: GraphFormItemType.NODE,
            label: 'node',
            coords: { x: 1, y: 1 },
            connections: { top: false, right: false, bottom: false, left: false },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
        }, {
            type: GraphFormItemType.NODE,
            label: 'node',
            coords: { x: 2, y: 1 },
            connections: { top: true, right: true, bottom: false, left: true },
            connect: { top: true, right: true, bottom: false, left: false },
            highlight: { top: true, right: true, bottom: false, left: true },
        },
    ],
])

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
    console.log('oC:', oldCols)
    const newRow: GraphFormItem[] = []
    for (let i = 0; i < oldCols; i++) {
        newRow.push({
            type: GraphFormItemType.NODE,
            label: '',
            coords: { x: i, y: rows.value },
            connections: { top: false, right: false, bottom: false, left: false },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
        })
    }
    graphForm.value.push(newRow)
}

function addColumn() {
    const oldCols = cols.value
    graphForm.value.forEach((row, index) => row.push({
        type: GraphFormItemType.NODE,
        label: '',
        coords: { x: oldCols, y: index },
        connections: { top: false, right: false, bottom: false, left: false },
        connect: { top: false, right: false, bottom: false, left: false },
        highlight: { top: false, right: false, bottom: false, left: false },
    }))
}

function clear() {
    graphForm.value = []
}

function submit() {

}
</script>

<style scoped>
</style>
