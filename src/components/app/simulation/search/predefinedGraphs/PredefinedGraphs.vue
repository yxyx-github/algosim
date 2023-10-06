<template>
    <Dialog v-model:visible="visible" modal maximizable header="Select a graph" :style="{ 'min-width': '80vw' }" contentClass="mb:w-screen md:w-full">
        <FRow wrap class="p-2">
            <PredefinedGraph v-for="(graphForm, index) in (graphForms as GraphForm[])" :key="index" :graphForm="graphForm" @click="select(graphForm)"/>
        </FRow>
    </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import { importRawGraphForm } from '@/main/algorithms/search/algorithms/dataHelpers'
import { rawGraphFormInputs } from '@/main/algorithms/search/predefinedGraphs'
import FRow from '@/components/lib/layout/FRow.vue'
import PredefinedGraph from '@/components/app/simulation/search/predefinedGraphs/PredefinedGraph.vue'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'

const emit = defineEmits<{
    'update:show': [value: boolean],
    'select': [graphForm: GraphForm],
}>()

const props = defineProps<{
    show: boolean
}>()

const visible = computed({
    get: () => props.show,
    set: val => emit('update:show', val),
})

const graphForms = computed(() => rawGraphFormInputs.map(rawGraphForm => importRawGraphForm(rawGraphForm)))

function select(graphForm: GraphForm) {
    visible.value = false
    emit('select', graphForm)
}
</script>

<style scoped>
</style>
