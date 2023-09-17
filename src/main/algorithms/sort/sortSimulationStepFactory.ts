import type { SortSimulationStep } from '@/main/algorithms/sort/types'
import { SortColor } from '@/main/algorithms/sort/sortColor'

export class SortSimulationStepFactory {

    static createHighlightedSimulationStep(sortedValues: number[], highlightedIndices: {color: string, index: number}[]): SortSimulationStep  {
        return {
            sortedValues: sortedValues.map((value, index) => {
                return {value: value, displayColor: highlightedIndices.find(highlightedIndex => highlightedIndex.index === index)?.color ?? SortColor.NEUTRAL}
            })
        }
    }

    static createSimulationStep(sortedValues: number[]): SortSimulationStep  {
        return {
            sortedValues: sortedValues.map(value => {
                return {value: value, displayColor: SortColor.NEUTRAL}
            })
        }
    }
}
