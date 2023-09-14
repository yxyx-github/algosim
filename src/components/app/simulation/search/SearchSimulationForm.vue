<template>
    <Form @submit.prevent="submit">
        <div :class="`grid grid-rows-[1fr_2rem] grid-cols-[1fr_2rem] gap-2 max-w-fit max-h-min`">
            <div
                    class="grid gap-0 max-w-fit max-h-min cursor-crosshair"
                    :style="`grid-template-columns: repeat(${cols}, minmax(0, 1fr));`"
            >
                <GraphFormItemVisualization v-for="(item, index) in graphFormItems" :key="index" class="w-full h-full" :item="item"/>
            </div>
            <Button @click="addColumn" class="w-[2rem]" icon="pi pi-plus" severity="secondary"/>
            <Button @click="addRow" class="w-full" icon="pi pi-plus" severity="secondary"/>
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
const cols = computed(() => graphForm.value[0].length)

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

function submit() {

}
</script>

<style scoped>
</style>
