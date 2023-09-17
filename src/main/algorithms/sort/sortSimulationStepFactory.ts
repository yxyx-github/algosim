import type { SortSimulationStep } from '@/main/algorithms/sort/types'
import { SortColor } from '@/main/algorithms/sort/types'

export class SortSimulationStepFactory {

    static create(sortedValues: number[], highlightedIndices?: { color: string, index: number }[]) : SortSimulationStep {
        if (highlightedIndices === undefined) {
            return {
                sortedValues: sortedValues.map(value => {
                    return { value: value, displayColor: SortColor.NEUTRAL }
                })
            }
        }

        return {
            sortedValues: sortedValues.map((value, index) => {
                return { value: value, displayColor: highlightedIndices.find(highlightedIndex => highlightedIndex.index === index)?.color ?? SortColor.NEUTRAL }
            })
        }
    }
}
