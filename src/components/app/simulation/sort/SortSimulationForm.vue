<template>
    <Form @submit.prevent>
        <Dropdown v-model="values.algorithm" optionLabel="label" optionValue="value" :options="algorithms" placeholder="Select an algorithm"/>
<!--        TODO: remove "true ||"-->
        <template v-if="true || values.algorithm !== undefined">
            <Input label="Number of items:">
                <InputNumber v-model="values.count" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
            </Input>
        </template>
    </Form>
</template>

<script setup lang="ts">
import { SortAlgorithms } from '@/algorithms/sort/types'
import Dropdown from 'primevue/dropdown'
import { reactive } from 'vue'
import Form from '@/components/lib/forms/Form.vue'
import InputNumber from 'primevue/inputnumber'
import Input from '@/components/lib/forms/Input.vue'

const emit = defineEmits(['submit'])

const values = reactive<{
    algorithm: undefined | SortAlgorithms,
    count: number
}>({
    algorithm: undefined,
    count: 100,
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
</script>

<style scoped>
</style>
