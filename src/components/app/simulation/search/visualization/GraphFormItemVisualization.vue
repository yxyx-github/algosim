<template>
    <svg :width="size" :height="size" viewBox="0 0 90 90">
        <rect x="0" y="0" width="90" height="90" :class="hasConnections ? 'wrapper' : 'none stroke'"/>

        <rect v-if="hasConnections" x="0" y="0" width="20" height="20" class="corner"/>
        <rect x="20" y="0" width="50" height="20" class="selectable" :class="hasConnections ? (!props.item.data().connections.top ? 'border' : 'blank') : 'none' + (props.readOnly ? '' : ' hoverable')" @click="toggleConnection(Side.TOP)"/>
        <rect v-if="props.item.data().highlight.top" x="40" y="0" width="10" height="20" class="highlighted"/>
        <rect v-if="props.item.data().connect.top" x="40" y="0" width="10" height="50" class="connected"/>

        <rect v-if="hasConnections" x="70" y="0" width="20" height="20" class="corner"/>
        <rect x="70" y="20" width="20" height="50" class="selectable" :class="hasConnections ? (!props.item.data().connections.right ? 'border' : 'blank') : 'none' + (props.readOnly ? '' : ' hoverable')" @click="toggleConnection(Side.RIGHT)"/>
        <rect v-if="props.item.data().highlight.right" x="70" y="40" width="20" height="10" class="highlighted"/>
        <rect v-if="props.item.data().connect.right" x="40" y="40" width="50" height="10" class="connected"/>

        <rect v-if="hasConnections" x="70" y="70" width="20" height="20" class="corner"/>
        <rect x="20" y="70" width="50" height="20" class="selectable" :class="hasConnections ? (!props.item.data().connections.bottom ? 'border' : 'blank') : 'none' + (props.readOnly ? '' : ' hoverable')" @click="toggleConnection(Side.BOTTOM)"/>
        <rect v-if="props.item.data().highlight.bottom" x="40" y="70" width="10" height="20" class="highlighted"/>
        <rect v-if="props.item.data().connect.bottom" x="40" y="40" width="10" height="50" class="connected"/>

        <rect v-if="hasConnections" x="0" y="70" width="20" height="20" class="corner"/>
        <rect x="0" y="20" width="20" height="50" class="selectable" :class="hasConnections ? (!props.item.data().connections.left ? 'border' : 'blank') : 'none' + (props.readOnly ? '' : ' hoverable')" @click="toggleConnection(Side.LEFT)"/>
        <rect v-if="props.item.data().highlight.left" x="0" y="40" width="20" height="10" class="highlighted"/>
        <rect v-if="props.item.data().connect.left" x="0" y="40" width="50" height="10" class="connected"/>

        <rect v-if="props.item.data().highlight.center" x="40" y="40" width="10" height="10" class="highlighted"/>
        <text x="45" y="45" class="label">{{ props.item.data().label }}</text>
<!--        <text x="45" y="60" class="label">{{ props.item.data().type === GraphFormItemType.VERTEX ? 'v' : 'e' }}: {{ props.item.data().coords.x }} | {{ props.item.data().coords.y }}</text>-->
    </svg>
</template>

<script setup lang="ts">
import { Side } from '@/main/algorithms/search/graphForm/types'
import { computed } from 'vue'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

const emit = defineEmits(['update'])

const props = withDefaults(defineProps<{
    item: GraphFormItem,
    scale?: number,
    readOnly?: boolean,
}>(), {
    scale: 1,
    readOnly: true,
})

const size = computed(() => `${props.scale * 9}rem`)

const hasConnections = computed(() => props.item.hasConnections())

function toggleConnection(side: Side) {
    if (!props.readOnly) {
        props.item.toggleConnection(side)
        emit('update')
    }
}
</script>

<style scoped>
.wrapper, .blank {
    fill: #dddddd;
}
.stroke {
    stroke: #000000;
    stroke-width: 1px;
}
.none {
    fill: #ffffff;
}
.stripe {
    fill: #999999;
}
.corner, .border {
    fill: #000000;
}
.highlighted, .connected {
    fill: #ff0000;
}
.label {
    dominant-baseline: middle;
    text-anchor: middle;
    font-size: 10px;
    font-weight: bold;
}
.selectable {
    stroke: #ff0000;
    stroke-width: 0px;
}
.hoverable.selectable:hover {
    stroke-width: 1px;
}
</style>
