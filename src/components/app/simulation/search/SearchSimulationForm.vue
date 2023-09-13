<template>
    <Form @submit.prevent="submit">
        SearchSimulationForm
        <GraphFormItemVisualization class="w-56" :item="{
            type: GraphFormItemType.NODE,
            label: 'node',
            connections: { top: false, right: true, bottom: true, left: true },
            connect: { top: false, right: true, bottom: true, left: false },
            highlight: { top: false, right: true, bottom: true, left: true },
        }"/>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/lib/forms/Form.vue'
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

function submit() {

}
</script>

<style scoped>
</style>
