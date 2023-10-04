<template>
    <Form @submit.prevent="submit">
        <FContainer :direction="{ mb: 'col', md: 'row' }" :alignItems="{ mb: 'stretch', md: 'start' }">
            <FColumn>
                <Input label="Algorithm:">
                    <Dropdown v-model="values.algorithm" optionLabel="label" optionValue="value" :options="algorithms" placeholder="Select an algorithm" size="small"/>
                </Input>
                <Input label="Start vertex:">
                    <ToggleButton v-model="enableSelectStart" v-tooltip.bottom="enableSelectStart ? 'Click any labyrinth item to select' : ''" onLabel="Select" :offLabel="`Selected: ${startItemLabel}`" onIcon="pi pi-plus" offIcon="pi pi-plus"/>
                </Input>
                <Input label="End vertex:">
                    <ToggleButton v-model="enableSelectEnd" v-tooltip.bottom="enableSelectEnd ? 'Click any labyrinth item to select' : ''" onLabel="Select" :offLabel="`Selected: ${endItemLabel}`" onIcon="pi pi-plus" offIcon="pi pi-plus"/>
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
import { EnableSelect, GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
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
    algorithm: undefined,
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

const startItemLabel = computed(() => (graphForm.value as GraphForm).getStartItem() === null ? '-' : generateItemLabel((graphForm.value as GraphForm).getStartItem() as GraphFormItem))
const endItemLabel = computed(() => (graphForm.value as GraphForm).getEndItem() === null ? '-' : generateItemLabel((graphForm.value as GraphForm).getEndItem() as GraphFormItem))

function generateItemLabel(item: GraphFormItem) {
    return `${item.data().type === GraphFormItemType.VERTEX ? 'v' : 'e'}: ${item.data().coords.x} | ${item.data().coords.y}`
}

const algorithmDescription: ComputedRef<string[]> = computed(() => (values.algorithm === undefined ? [] : SearchFactory.create(values.algorithm).description()))
watchEffect(() => emit('updateDescription', algorithmDescription.value))

const algorithms = [
    {
        label: 'Breadthsearch',
        value: SearchAlgorithm.BREADTH_SEARCH,
    }
]

const graphForm = ref(new GraphForm()) // typecasts due to TS issue with reactive values necessary

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
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Start and end vertex are invalid', life: 4000 });
    }
}
</script>

<style scoped>
</style>
