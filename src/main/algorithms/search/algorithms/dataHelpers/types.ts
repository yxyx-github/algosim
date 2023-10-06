import type { GraphFormItemData } from '@/main/algorithms/search/graphForm/types'

export type RawGraphForm = {
    grid: RawGraphFormGrid,
    startItem: {
        itemData: GraphFormItemData,
    } | null,
    endItem: {
        itemData: GraphFormItemData,
    } | null,
}

export type RawSearchSimulation = {
    steps: {
        grid: RawGraphFormGrid,
        start: {
            itemData: GraphFormItemData,
        } | null,
        end: {
            itemData: GraphFormItemData,
        } | null,
    }[]
}

export type RawGraphFormGrid = {
    itemData: GraphFormItemData,
}[][]
