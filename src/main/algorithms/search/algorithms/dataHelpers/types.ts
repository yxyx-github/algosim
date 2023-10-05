import type { GraphFormItemData } from '@/main/algorithms/search/graphForm/types'

export type RawGraphForm = {
    grid: RawGraphFormGrid,
    startItem: {
        itemData: GraphFormItemData,
    },
    endItem: {
        itemData: GraphFormItemData,
    }
}

export type RawSearchSimulation = {
    steps: {
        grid: RawGraphFormGrid,
        start: {
            itemData: GraphFormItemData,
        },
        end: {
            itemData: GraphFormItemData,
        },
    }[]
}

export type RawGraphFormGrid = {
    itemData: GraphFormItemData,
}[][]
