<template>
    <FColumn>
        <FContainer :direction="{ mb: 'col', md: 'row' }">
            <FColumn>
                <slot name="form"/>
            </FColumn>
            <FColumn :grow="true">
                <slot name="simulation"/>
            </FColumn>
        </FContainer>
        <FColumn :gap="0">
            <slot name="description"/>
        </FColumn>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import FContainer from '@/components/lib/layout/FContainer.vue'
</script>

<style scoped>
</style>
