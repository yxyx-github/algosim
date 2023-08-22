<template>
    <SimulationLayout>
        <template #form>
            Form to configure algorithm
        </template>
        <template #simulation>
            <SimulationView>
                <template #step="{ data }">
                    Visual simulation
                </template>
            </SimulationView>
        </template>
    </SimulationLayout>
</template>

<script setup lang="ts">
import SimulationLayout from '@/components/app/SimulationLayout.vue'
import SimulationView from '@/components/app/simulationView/SimulationView.vue'
</script>

<style scoped>
</style>
