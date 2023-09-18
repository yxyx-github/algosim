<template>
    <div class="grid gap-2 max-w-fit max-h-min" :class="isEmpty ? 'grid-rows-[2rem_2rem] grid-cols-[2rem_2rem]' : 'grid-rows-[1fr_2rem] grid-cols-[1fr_2rem]'">
        <div
                class="grid gap-0 max-w-fit max-h-min cursor-crosshair"
                :style="`grid-template-columns: repeat(${cols}, minmax(0, 1fr));`"
        >
            <div v-if="isEmpty"></div>
            <GraphFormItemVisualization v-else v-for="(item, index) in graphFormItems" :key="index" class="w-full h-full" :item="item.data()" @update:item="updateItem"/>
        </div>
        <Button @click="addColumn" class="w-[2rem]" icon="pi pi-plus" severity="secondary" aria-label="Add Column" v-tooltip.top="'Add Column'"/>
        <Button @click="addRow" class="w-full" icon="pi pi-plus" severity="secondary" aria-label="Add Row" v-tooltip.top="'Add Row'"/>
        <Button @click="clear" class="w-full" icon="pi pi-trash" severity="danger" aria-label="Clear" v-tooltip.top="'Clear'"/>
    </div>
</template>

<script setup lang="ts">
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import Button from 'primevue/button'
import type { WritableComputedRef } from 'vue'
import { computed } from 'vue'
import type { GraphFormItemData } from '@/main/algorithms/search/graphForm/types'
import type { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

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

const graphFormItems = computed(() => graphForm.value.toItems())

const cols = computed(() => graphForm.value.cols())
const isEmpty = computed(() => graphForm.value.isEmpty())

function addRow() {
    graphForm.value.addRow()
}

function addColumn() {
    graphForm.value.addColumn()
}

function clear() {
    graphForm.value.clear()
}

function updateItem(item: GraphFormItemData) {
    // TODO: change arg type to GraphFormItem
    graphForm.value.updateItem(new GraphFormItem(item))
}
</script>

<style scoped>
</style>
