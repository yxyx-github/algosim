import type { GraphFormItemData } from '@/main/algorithms/search/graphForm/types'

export type SearchSimulationResultData = {
    steps: {
        grid: {
            itemData: GraphFormItemData,
        }[][],
        start: {
            itemData: GraphFormItemData,
        },
        end: {
            itemData: GraphFormItemData,
        },
    }[]
}
