<template>
    <FColumn :is="h('form')" :gap="2" class="w-full">
        <slot/>
    </FColumn>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import FColumn from '@/components/lib/layout/FColumn.vue'
</script>

<style scoped>

</style>
