<template>
    <component :is="is" class="p-2 bg-bg">
        <slot/>
    </component>
</template>

<script setup lang="ts">
import { h } from 'vue'

interface Props {
    is?: any
}

const props = withDefaults(defineProps<Props>(), {
    is: h('div'),
})
</script>

<style scoped>

</style>
