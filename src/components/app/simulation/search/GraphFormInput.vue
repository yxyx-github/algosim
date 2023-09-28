<template>
    <div class="grid gap-2 max-w-fit max-h-min" :class="isEmpty ? 'grid-rows-[2rem_2rem_2rem] grid-cols-[2rem_2rem_2rem]' : 'grid-rows-[2rem_1fr_2rem] grid-cols-[2rem_1fr_2rem]'">
        <div></div>
        <Button @click="addFirstRow" class="w-full" icon="pi pi-plus" severity="secondary" aria-label="Add Row" v-tooltip.top="'Add Row'"/>
        <div></div>
        <Button @click="addFirstColumn" class="w-[2rem]" icon="pi pi-plus" severity="secondary" aria-label="Add Column" v-tooltip.top="'Add Column'"/>
        <div
            class="grid gap-0 max-w-fit max-h-min cursor-crosshair"
            :style="`grid-template-rows: repeat(${rows}, minmax(0, 1fr)); grid-template-columns: repeat(${cols}, minmax(0, 1fr));`"
        >
            <div v-if="isEmpty"></div>
            <template v-else>
                <template v-for="(row, index) in graphFormItemGrid" :key="index">
                    <GraphFormItemVisualization v-for="(item, index) in row" :key="index" class="w-full h-full" :class="{
                        'z-0 hover:z-10 hover:outline outline-indigo-600': canSelectItem(item),
                        'z-10 outline outline-green-600': isStartItem(item),
                        'z-10 outline outline-blue-600': isEndItem(item),
                        'opacity-20': props.enableSelect !== EnableSelect.NONE && !vertexItems.includes(item),
                    }" :item="item" @click="selectItem(item)" @update="props.graphForm.validateStartEnd()"/>
                </template>
            </template>
        </div>
        <Button @click="addColumn" class="w-[2rem]" icon="pi pi-plus" severity="secondary" aria-label="Add Column" v-tooltip.top="'Add Column'"/>
        <div></div>
        <Button @click="addRow" class="w-full" icon="pi pi-plus" severity="secondary" aria-label="Add Row" v-tooltip.top="'Add Row'"/>
        <Button @click="clear" class="w-full" icon="pi pi-trash" severity="danger" aria-label="Clear" v-tooltip.top="'Clear'"/>
    </div>
<!--    <div class="grid gap-2 max-w-fit max-h-min" :class="isEmpty ? 'grid-rows-[2rem_2rem_2rem] grid-cols-[2rem_2rem_2rem]' : 'grid-rows-[2rem_1fr_2rem] grid-cols-[2rem_1fr_2rem]'">
        <div></div>
        <Button @click="addFirstRow" class="w-[calc(100%-2rem)]" icon="pi pi-plus" severity="secondary" aria-label="Add Row" v-tooltip.top="'Add Row'"/>
        <div></div>
        <Button @click="addFirstColumn" class="w-[2rem] h-[calc(100%-2rem)]" icon="pi pi-plus" severity="secondary" aria-label="Add Column" v-tooltip.top="'Add Column'"/>
        <div
                class="grid gap-0 max-w-fit max-h-min cursor-crosshair"
                :style="`grid-template-rows: repeat(${rows}, minmax(0, 1fr)) 2rem; grid-template-columns: repeat(${cols}, minmax(0, 1fr)) 2rem;`"
        >
            <div v-if="isEmpty"></div>
            <template v-else>
                <template v-for="(row, index) in graphFormItemGrid" :key="index">
                    <GraphFormItemVisualization v-for="(item, index) in row" :key="index" class="w-full h-full" :item="item"/>
                    <FColumn justifyItems="around" :gap="0" class="w-[2rem] h-full">
                        <Button @click="" class="w-full max-h-[2rem] shrink" icon="pi pi-arrow-up" severity="secondary" aria-label="Move Up" v-tooltip.top="'Move Up'"/>
                        <Button @click="" class="w-full max-h-[2rem] shrink" icon="pi pi-minus" severity="danger" aria-label="Delete Row" v-tooltip.top="'Delete Row'"/>
                        <Button @click="" class="w-full max-h-[2rem] shrink" icon="pi pi-arrow-down" severity="secondary" aria-label="Move Down" v-tooltip.top="'Move Down'"/>
                    </FColumn>
                    <FRow v-if="index === graphFormItemGrid.length - 1" v-for="(item, index) in row" :key="index" justifyItems="around" :gap="0">
                        <Button @click="" class="w-[2rem]" icon="pi pi-arrow-left" severity="secondary" aria-label="Move Left" v-tooltip.top="'Move Left'"/>
                        <Button @click="" class="w-[2rem]" icon="pi pi-minus" severity="danger" aria-label="Delete Column" v-tooltip.top="'Delete Column'"/>
                        <Button @click="" class="w-[2rem]" icon="pi pi-arrow-right" severity="secondary" aria-label="Move Right" v-tooltip.top="'Move Right'"/>
                    </FRow>
                </template>
            </template>
        </div>
        <Button @click="addColumn" class="w-[2rem] h-[calc(100%-2rem)]" icon="pi pi-plus" severity="secondary" aria-label="Add Column" v-tooltip.top="'Add Column'"/>
        <div></div>
        <Button @click="addRow" class="w-[calc(100%-2rem)]" icon="pi pi-plus" severity="secondary" aria-label="Add Row" v-tooltip.top="'Add Row'"/>
        <Button @click="clear" class="w-full" icon="pi pi-trash" severity="danger" aria-label="Clear" v-tooltip.top="'Clear'"/>
    </div>-->
</template>

<script setup lang="ts">
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import Button from 'primevue/button'
import { computed } from 'vue'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { EnableSelect } from '@/main/algorithms/search/graphForm/types'
import type { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

const emit = defineEmits<{
    'update:enableSelect': [value: EnableSelect],
}>()

const props = withDefaults(defineProps<{
    graphForm: GraphForm
    enableSelect: EnableSelect
}>(), {
    enableSelect: EnableSelect.NONE,
})

// const graphFormItemGrid = computed(() => [])
const graphFormItemGrid = computed(() => props.graphForm.toGrid())
const vertexItems = computed(() => props.graphForm.vertexItems())

const rows = computed(() => props.graphForm.rows())
const cols = computed(() => props.graphForm.cols())
// const isEmpty = computed(() => true)
const isEmpty = computed(() => props.graphForm.isEmpty())

function addFirstRow() {
    props.graphForm.addRow(0)
}

function addFirstColumn() {
    props.graphForm.addColumn(0)
}

function addRow() {
    props.graphForm.addRow()
}

function addColumn() {
    props.graphForm.addColumn()
}

function clear() {
    props.graphForm.clear()
}

function canSelectItem(item: GraphFormItem) {
    return props.enableSelect !== EnableSelect.NONE && vertexItems.value.includes(item) && item.hasConnections()
}

function isStartItem(item: GraphFormItem) {
    return props.graphForm.getStartItem() === item
}

function isEndItem(item: GraphFormItem) {
    return props.graphForm.getEndItem() === item
}

function selectItem(item: GraphFormItem) {
    if (canSelectItem(item)) {
        if (props.enableSelect === EnableSelect.START) {
            props.graphForm.setStartItem(item)
        }
        if (props.enableSelect === EnableSelect.END) {
            props.graphForm.setEndItem(item)
        }
        emit('update:enableSelect', EnableSelect.NONE)
    }
}
</script>

<style scoped>
</style>
