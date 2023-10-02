<template>
    <Form @submit.prevent="submit">
        <FContainer :direction="{ mb: 'col', md: 'row' }" alignItems="start">
            <FColumn>
                <Input label="Algorithm:">
                    <Dropdown v-model="values.algorithm" optionLabel="label" optionValue="value" :options="algorithms" placeholder="Select an algorithm" size="small"/>
                </Input>
                <Input label="Start vertex:">
                    <ToggleButton v-model="enableSelectStart" onLabel="Select" offLabel="Select" onIcon="pi pi-plus" offIcon="pi pi-plus"/>
                </Input>
                <Input label="End vertex:">
                    <ToggleButton v-model="enableSelectEnd" onLabel="Select" offLabel="Select" onIcon="pi pi-plus" offIcon="pi pi-plus"/>
                </Input>
                <ButtonBar>
                    <Button label="Search" @click="submit"/>
                </ButtonBar>
            </FColumn>
            <GraphFormInput :graphForm="graphForm as any" v-model:enableSelect="values.enableSelect"/>
        </FContainer>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/lib/forms/Form.vue'
import Button from 'primevue/button'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import FColumn from '@/components/lib/layout/FColumn.vue'
import FContainer from '@/components/lib/layout/FContainer.vue'
import GraphFormInput from '@/components/app/simulation/search/GraphFormInput.vue'
import type { ComputedRef, WritableComputedRef } from 'vue'
import { computed, reactive, ref, watchEffect } from 'vue'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { EnableSelect } from '@/main/algorithms/search/graphForm/types'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { SearchFactory } from '@/main/algorithms/search/algorithms'
import Input from '@/components/lib/forms/Input.vue'
import Dropdown from 'primevue/dropdown'
import ToggleButton from 'primevue/togglebutton'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import { useToast } from 'primevue/usetoast'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

const toast = useToast()

const emit = defineEmits<{
    submit: [simulation: SearchSimulation],
    reset: [],
    updateDescription: [description: string[]],
}>()

const values = reactive<{
    algorithm: undefined | SearchAlgorithm
    enableSelect: EnableSelect
}>({
    algorithm: SearchAlgorithm.BREADTH_SEARCH/*undefined*/,
    enableSelect: EnableSelect.NONE,
})

const enableSelectStart: WritableComputedRef<boolean> = computed({
    get: () => values.enableSelect === EnableSelect.START,
    set: enable => values.enableSelect = enable ? EnableSelect.START : EnableSelect.NONE,
})

const enableSelectEnd: WritableComputedRef<boolean> = computed({
    get: () => values.enableSelect === EnableSelect.END,
    set: enable => values.enableSelect = enable ? EnableSelect.END : EnableSelect.NONE,
})

const algorithmDescription: ComputedRef<string[]> = computed(() => (values.algorithm === undefined ? [] : SearchFactory.create(values.algorithm).description()))
watchEffect(() => emit('updateDescription', algorithmDescription.value))

const algorithms = [
    {
        label: 'Breadthsearch',
        value: SearchAlgorithm.BREADTH_SEARCH,
    }
]

const gf = new GraphForm([
    [
        new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 0, 'y': 0 }, 'connections': { 'top': false, 'right': true, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 1, 'y': 0 }, 'connections': { 'top': false, 'right': true, 'bottom': true, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 2, 'y': 0 }, 'connections': { 'top': false, 'right': false, 'bottom': false, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
    ], [
        new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 0, 'y': 1 }, 'connections': { 'top': false, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 1, 'y': 1 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 2, 'y': 1 }, 'connections': { 'top': false, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
    ], [
        new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 0, 'y': 2 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 1, 'y': 2 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 2, 'y': 2 }, 'connections': { 'top': true, 'right': false, 'bottom': true, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
    ], [
        new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 0, 'y': 3 }, 'connections': { 'top': true, 'right': true, 'bottom': false, 'left': false }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 0, 'label': '', 'coords': { 'x': 1, 'y': 3 }, 'connections': { 'top': true, 'right': true, 'bottom': false, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
        new GraphFormItem({ 'type': 1, 'label': '', 'coords': { 'x': 2, 'y': 3 }, 'connections': { 'top': true, 'right': false, 'bottom': false, 'left': true }, 'connect': { 'top': false, 'right': false, 'bottom': false, 'left': false }, 'highlight': { 'top': false, 'right': false, 'bottom': false, 'left': false, 'center': false } }),
    ]
])
gf.setStartItem(gf.toItems()[0])
gf.setEndItem(gf.toItems()[5])

// const graphForm = ref(new GraphForm()) // typecasts due to TS issue with reactive values necessary
const graphForm = ref(gf) // typecasts due to TS issue with reactive values necessary

function reset() {
    emit('reset')
}

reset()

function submit() {
    (graphForm.value as GraphForm).validateStartEnd()
    if (values.algorithm === undefined) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'You must specify an algorithm', life: 4000 });
        return
    }
    if ((graphForm.value as GraphForm).getStartItem() === null || (graphForm.value as GraphForm).getEndItem() === null) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'You must specify a start and end vertex', life: 4000 });
        return
    }

    const converter = new GraphFormConverter(graphForm.value as GraphForm)
    const graph: Graph<VertexValue, EdgeValue> = converter.toGraph()
    const startVertex: Vertex<VertexValue> | undefined = graph.findVertex(v => v.getValue().item === (graphForm.value as GraphForm).getStartItem())
    const endVertex: Vertex<VertexValue> | undefined = graph.findVertex(v => v.getValue().item === (graphForm.value as GraphForm).getEndItem())

    if (startVertex !== undefined && endVertex !== undefined) {
        const searched = SearchFactory.create(values.algorithm).run(graph, (graphForm.value as GraphForm).toGrid(), startVertex, endVertex)
        emit('submit', searched)
        // TODO: hide GraphFormInput
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Start and end vertex are invalid', life: 4000 });
    }
}
</script>

<style scoped>
</style>
