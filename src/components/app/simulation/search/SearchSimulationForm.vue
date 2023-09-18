<template>
    <Form @submit.prevent="submit">
        <FContainer :direction="{ mb: 'col', md: 'row' }">
            <FColumn>
                <ButtonBar>
                    <Button label="Search" @click="submit"/>
                </ButtonBar>
            </FColumn>
            <GraphFormInput v-model="graphForm"/>
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
import { ref, Ref } from 'vue'
import type { GraphForm } from '@/main/algorithms/search/graphForm/types'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import type { Graph } from '@/main/algorithms/search/graph/graph'

const graphForm: Ref<GraphForm> = ref([])

function submit() {
    const converter = new GraphFormConverter()
    const graph: Graph = converter.graphFromForm(graphForm.value)
}
</script>

<style scoped>
</style>
