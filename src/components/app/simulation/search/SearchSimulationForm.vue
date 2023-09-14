<template>
    <Form @submit.prevent="submit">
        <div class="grid grid-cols-3 gap-0 max-w-fit max-h-min" style="grid-template-columns: repeat(2, minmax(0, 1fr)) 3rem;grid-template-rows: repeat(3, minmax(0, 1fr)) 3rem;">
            <GraphFormItemVisualization v-for="x in [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12]" :key="x"
                class="w-full h-full" :item="{
                    type: GraphFormItemType.NODE,
                    label: 'node',
                    connections: { top: false, right: true, bottom: true, left: true },
                    connect: { top: false, right: true, bottom: true, left: false },
                    highlight: { top: false, right: true, bottom: true, left: true },
                }"
            />
        </div>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/lib/forms/Form.vue'
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import type { GraphFormItem } from '@/main/algorithms/search/graphForm/types'
import type { Ref } from 'vue'
import { ref } from 'vue'

const items: Ref<GraphFormItem[][]> = ref([
    [
        {
            type: GraphFormItemType.NODE,
            label: 'node',
            connections: { top: false, right: true, bottom: true, left: true },
            connect: { top: false, right: true, bottom: true, left: false },
            highlight: { top: false, right: true, bottom: true, left: true },
        }, {
            type: GraphFormItemType.NODE,
            label: 'node',
            connections: { top: true, right: true, bottom: false, left: true },
            connect: { top: true, right: true, bottom: false, left: false },
            highlight: { top: true, right: true, bottom: false, left: true },
        },
    ],
])

function submit() {

}
</script>

<style scoped>
</style>
