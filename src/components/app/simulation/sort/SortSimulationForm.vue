<template>
    <Form @submit.prevent="submit">
        <Input label="Algorithm:">
            <Dropdown v-model="values.algorithm" optionLabel="label" optionValue="value" :options="algorithms" placeholder="Select an algorithm" size="small"/>
        </Input>
        <template v-if="values.algorithm !== undefined">
            <Input label="Items to sort:">
                <SelectButton v-model="values.mode" optionLabel="label" optionValue="value" :options="sortInputModes" :pt="{ root: () => ({ class: 'flex flex-row' }), button: () => ({ class: 'flex-grow' }) }"/>
            </Input>
            <template v-if="values.mode === SortInputMode.GENERATE">
                <Input label="Number of items:">
                    <InputNumber inputClass="w-20" v-model="values.count" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0" :max="1000" :step="10"/>
                </Input>
                <Input label="Minimum value:">
                    <InputNumber inputClass="w-20" v-model="values.minVal" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0" :max="10000" :step="1"/>
                </Input>
                <Input label="Maximum value:">
                    <InputNumber inputClass="w-20" v-model="values.maxVal" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0" :max="10000" :step="1"/>
                </Input>
            </template>
            <template v-else>
                <Input label="Numbers to sort (comma separated):">
                    <Textarea v-model="values.customInput" placeholder="e.g.: 5, 3, 4, 0, 1, 2, ..." autoResize/>
                </Input>
            </template>
            <ButtonBar>
                <Button type="button" @click="reset" aria-label="Reset" label="Reset" severity="secondary"/>
                <Button type="submit" aria-label="Sort" label="Sort" :loading="sortWorker !== null"/>
                <Button v-if="sortWorker !== null" type="button" @click="terminate" aria-label="Cancel" label="Cancel" severity="danger"/>
            </ButtonBar>
            <FProgressBar v-if="sortWorker !== null" :value="progress.currentInterval">{{ progress.current }}/{{ progress.overall }}</FProgressBar>
        </template>
    </Form>
    <div>
        {{ algorithmDescription }}
    </div>
</template>

<script setup lang="ts">
import { SortAlgorithm, SortInputMode } from '@/algorithms/sort/types'
import type { SortSimulationStep } from '@/algorithms/sort/types'
import type { SortSimulation } from '@/algorithms/sort/types'
import Dropdown from 'primevue/dropdown'
import { computed, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import type { ComputedRef } from 'vue'
import Form from '@/components/lib/forms/Form.vue'
import InputNumber from 'primevue/inputnumber'
import Input from '@/components/lib/forms/Input.vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import Button from 'primevue/button'
import { generateNumbers, SortFactory } from '@/algorithms/sort'
import SelectButton from 'primevue/selectbutton'
import Textarea from 'primevue/textarea'
import SortWorker from '@/algorithms/sort/sortWorker?worker'
import type { ProgressProvider } from '@/progressTracker/types'
import { Progress } from '@/progressTracker/progress'
import FProgressBar from '@/components/lib/controls/FProgressBar.vue'

const emit = defineEmits<{
    (event: 'submit', simulation: SortSimulation): void
    (event: 'reset'): void
}>()

const values = reactive<{
    algorithm: undefined | SortAlgorithm
    mode: SortInputMode
    count: number
    minVal: number
    maxVal: number
    customInput: string
}>({
    algorithm: undefined,
    mode: SortInputMode.GENERATE,
    count: 0,
    minVal: 0,
    maxVal: 0,
    customInput: '',
})

const algorithmDescription: ComputedRef<string> = computed(() => (values.algorithm === undefined ? '' : SortFactory.create(values.algorithm).description()))

const algorithms = [
    {
        label: 'Bubblesort',
        value: SortAlgorithm.BUBBLE,
    }, {
        label: 'Selectionsort',
        value: SortAlgorithm.SELECTION,
    }
]

const sortInputModes = [
    {
        label: 'Generate',
        value: SortInputMode.GENERATE,
    }, {
        label: 'Custom',
        value: SortInputMode.CUSTOM,
    }
]

const progress: Ref<ProgressProvider> = ref(new Progress(0, 0))

const sortWorker: Ref<Worker | null> = ref(null)

function terminate() {
    if (sortWorker.value !== null) {
        sortWorker.value.terminate()
        sortWorker.value = null
    }
}

function reset() {
    values.count = 100
    values.minVal = 0
    values.maxVal = 100
    values.customInput = ''
    emit('reset')
}
reset()

function submit() {
    if (values.algorithm === undefined) return
    let numbersToSort = []
    if (values.mode === SortInputMode.GENERATE) {
        numbersToSort = generateNumbers(values.count, values.minVal, values.maxVal)
    } else {
        numbersToSort = values.customInput
            .split(',')
            .map(part => part.replace(/[^0-9]/g, ''))
            .filter(part => part !== '')
            .map(number => parseInt(number))
        if (numbersToSort.length === 0) return
    }

    sortWorker.value = new SortWorker()
    /*sortWorker.value.onmessage = (e: { data: { name: 'sorted', value: any } | { name: 'progress', value: ProgressProvider } }) => {
        if (e.data.name === 'sorted') {
            emit('submit', { steps: e.data.value } as SortSimulation)
            terminate()
            progress.value = new Progress(0, 0)
        } else {
            progress.value = e.data.value
        }
    }*/
    sortWorker.value.onmessage = (e: { data: { name: 'sorted', value: SortSimulation } /*any*/ | { name: 'progress', value: ProgressProvider } }) => {
        if (e.data.name === 'progress') {
            progress.value = e.data.value
        } else {
            // emit('submit', { steps: e.data } as SortSimulation)
            emit('submit', e.data.value)
            terminate()
            progress.value = new Progress(0, 0)
        }
    }
    sortWorker.value.postMessage({ algorithm: values.algorithm, numbersToSort: numbersToSort, intervalCount: 100 })
}
</script>

<style scoped>
</style>
