<template>
    <FColumn>
        <slot name="step" :data="[]"/>
        <PlaybackControl v-model="playbackValue" :max="10"/>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'
import PlaybackControl from '@/components/lib/controls/PlaybackControl.vue'
import { ref } from 'vue'

const playbackValue = ref(0)
</script>

<style scoped>
</style>
