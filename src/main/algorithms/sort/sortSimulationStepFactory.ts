import type { HighlightedIndex, SortSimulationStep } from '@/main/algorithms/sort/types'
import { SortColor } from '@/main/algorithms/sort/types'

export class SortSimulationStepFactory {

    static create(sortedValues: number[], highlightedIndices?: HighlightedIndex[]) : SortSimulationStep {
        return {
            sortedValues: sortedValues.map((value, index) => {
                return { value: value, displayColor: highlightedIndices?.find(highlightedIndex => highlightedIndex.index === index)?.color ?? SortColor.NEUTRAL }
            })
        }
    }
}
