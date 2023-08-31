<template>
    <Form @submit.prevent="submit">
        <Input label="Algorithm:">
            <Dropdown v-model="values.algorithm" optionLabel="label" optionValue="value" :options="algorithms" placeholder="Select an algorithm" size="small"/>
        </Input>
        <template v-if="values.algorithm !== undefined">
            <SelectButton v-model="values.mode" optionLabel="label" optionValue="value" :options="sortInputModes" :pt="{ root: () => ({ class: 'flex flex-row' }), button: () => ({ class: 'flex-grow' }) }"/>
            <template v-if="values.mode === SortInputMode.GENERATE">
                <Input label="Number of items:">
                    <InputNumber inputClass="w-20" v-model="values.count" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0" :max="10000" :step="10"/>
                </Input>
                <Input label="Minimum value:">
                    <InputNumber inputClass="w-20" v-model="values.minVal" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0" :max="10000" :step="1"/>
                </Input>
                <Input label="Maximum value:">
                    <InputNumber inputClass="w-20" v-model="values.maxVal" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0" :max="10000" :step="1"/>
                </Input>
                <ButtonBar>
                    <Button type="button" @click="reset" aria-label="Reset" label="Reset" severity="secondary"/>
                    <Button type="submit" aria-label="Sort" label="Sort"/>
                </ButtonBar>
            </template>
            <template v-else>
                custom
            </template>
        </template>
    </Form>
</template>

<script setup lang="ts">
import { SortAlgorithms, SortInputMode, SortSimulation } from '@/algorithms/sort/types'
import Dropdown from 'primevue/dropdown'
import { reactive } from 'vue'
import Form from '@/components/lib/forms/Form.vue'
import InputNumber from 'primevue/inputnumber'
import Input from '@/components/lib/forms/Input.vue'
import ButtonBar from '@/components/lib/controls/ButtonBar.vue'
import Button from 'primevue/button'
import { generateNumbers, SortFactory } from '@/algorithms/sort'
import SelectButton from 'primevue/selectbutton'

const emit = defineEmits<{
    (event: 'submit', simulation: SortSimulation): void
    (event: 'reset'): void
}>()

const values = reactive<{
    algorithm: undefined | SortAlgorithms,
    mode: SortInputMode,
    count: number
    minVal: number
    maxVal: number
}>({
    algorithm: undefined,
    mode: SortInputMode.GENERATE,
    count: undefined,
    minVal: undefined,
    maxVal: undefined,
})

const algorithms = [
    {
        label: 'Bubblesort',
        value: SortAlgorithms.BUBBLE,
    }, {
        label: 'Selectionsort',
        value: SortAlgorithms.SELECTION,
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

function reset() {
    values.count = 100
    values.minVal = 0
    values.maxVal = 100
    emit('reset')
}
reset()

function submit() {
    const sorted = SortFactory.create(values.algorithm).sort(generateNumbers(values.count, values.minVal, values.maxVal))
    emit('submit', sorted)
}
</script>

<style scoped>
</style>
