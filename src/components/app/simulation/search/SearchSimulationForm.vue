<template>
    <Form @submit.prevent="submit">
        <FContainer :direction="{ mb: 'col', md: 'row' }">
            <FColumn>
                <Input label="Algorithm:">
                    <Dropdown v-model="values.algorithm" optionLabel="label" optionValue="value" :options="algorithms" placeholder="Select an algorithm" size="small"/>
                </Input>
                <ButtonBar>
                    <Button label="Search" @click="submit"/>
                </ButtonBar>
            </FColumn>
            <GraphFormInput :graphForm="graphForm as any"/>
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
import { ref } from 'vue'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import { reactive } from 'vue'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import type { ComputedRef } from 'vue'
import { computed, watchEffect } from 'vue'
import { SearchFactory } from '@/main/algorithms/search/algorithms'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import Input from '@/components/lib/forms/Input.vue'
import Dropdown from 'primevue/dropdown'

const emit = defineEmits<{
    submit: [simulation: SearchSimulation],
    reset: [],
    updateDescription: [description: string[]],
}>()

const values = reactive<{
    algorithm: undefined | SearchAlgorithm
    startVertex: Vertex<VertexValue> | null
    endVertex: Vertex<VertexValue> | null
}>({
    algorithm: undefined,
    startVertex: null,
    endVertex: null,
})

const algorithmDescription: ComputedRef<string[]> = computed(() => (values.algorithm === undefined ? [] : SearchFactory.create(values.algorithm).description()))
watchEffect(() => emit('updateDescription', algorithmDescription.value))

const algorithms = [
    {
        label: 'Breadthsearch',
        value: SearchAlgorithm.BREADTH_SEARCH,
    }
]

const graphForm = ref(new GraphForm())

function reset() {
    emit('reset')
}
reset()

function submit() {
    const converter = new GraphFormConverter(graphForm.value as any) // typecast due to TS issue with reactive values
    const graph: Graph<VertexValue, EdgeValue> = converter.toGraph()
}
</script>

<style scoped>
</style>
