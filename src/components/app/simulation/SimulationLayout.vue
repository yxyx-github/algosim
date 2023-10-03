<template>
    <FColumn>
        <FContainer :direction="{ mb: 'col', md: 'row' }">
            <FColumn :grow="!$slots.simulation">
                <slot name="form"/>
            </FColumn>
            <FColumn v-if="$slots.simulation" :grow="true">
                <slot name="simulation"/>
            </FColumn>
        </FContainer>
        <slot name="description"/>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import FContainer from '@/components/lib/layout/FContainer.vue'
</script>

<style scoped>
</style>
