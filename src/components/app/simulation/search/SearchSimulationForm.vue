<template>
    <Form @submit.prevent="submit">
        SearchSimulationForm
        <GraphFormItemVisualization class="w-56" :item="{

        }"/>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/lib/forms/Form.vue'
import GraphFormItemVisualization from '@/components/app/simulation/search/visualization/GraphFormItemVisualization.vue'

function submit() {

}
</script>

<style scoped>
</style>
