import type { GraphFormItemData } from '@/main/algorithms/search/graphForm/types'

export type RawGraphForm = {
    grid: RawGraphFormGrid,
    startItem: RawItem | null,
    endItem: RawItem | null,
}

export type RawSearchSimulation = {
    steps: {
        grid: RawGraphFormGrid,
        start: RawItem | null,
        end: RawItem | null,
    }[]
}

export type RawGraphFormGrid = {
    itemData: GraphFormItemData,
}[][]

export type RawItem = {
    itemData: GraphFormItemData,
}
