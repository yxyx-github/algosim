<template>
    <FRow :grow="true">
        <FColumn>
            <slot name="form"/>
        </FColumn>
        <FColumn :grow="true">
            <slot name="simulation"/>
        </FColumn>
    </FRow>
</template>

<script setup lang="ts">
import FRow from '@/components/lib/layout/FRow.vue'
import FColumn from '@/components/lib/layout/FColumn.vue'
</script>

<style scoped>
</style>
