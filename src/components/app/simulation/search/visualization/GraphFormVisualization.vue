<template>
    <div
            class="grid gap-0 max-w-fit max-h-min"
            :style="`grid-template-rows: repeat(${rows}, minmax(0, 1fr)); grid-template-columns: repeat(${cols}, minmax(0, 1fr));`"
    >
        <GraphFormItemVisualization v-for="(item, index) in graphFormItems" :key="index" class="w-full h-full" :item="item" :readOnly="true"/>
    </div>
</template>

<script setup lang="ts">
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'
import { computed } from 'vue'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'

const props = defineProps<{
    graphForm: GraphForm
}>()

const graphFormItems = computed(() => props.graphForm.toItems())

const rows = computed(() => props.graphForm.rows())
const cols = computed(() => props.graphForm.cols())
</script>

<style scoped>
</style>
