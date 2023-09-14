import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { HighlightedIndex, SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'

export class CombSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(this.calculateGapSteps(numbers.length))
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })

        let gap = numbers.length
        let swapped = false

        while (gap != 1 || swapped) {
            gap = Math.floor((gap*10)/13) < 1 ? 1 : Math.floor((gap*10)/13)
            swapped = false;
            if (gap > 1) {
                progressTracker?.trackNext()
            }

            for (let i = 0; i < numbers.length-gap; i++) {
                pB.step(this.createStep(numbers, i, gap))
                if (numbers[i] <= numbers[i+gap]) {
                    continue
                }
                let temp = numbers[i];
                numbers[i] = numbers[i+gap];
                numbers[i+gap] = temp;
                swapped = true;
                pB.step(this.createStep(numbers, i, gap))
            }
        }
        progressTracker?.trackNext()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        return pB.build()
    }

    description(): string[] {
        return ['Combsort description']
    }

    private createStep(numbers: number[], pointer: number, gap: number): SortSimulationStep {
        return {
            sortedValues: numbers,
            highlightedIndices: [
                { type: 'current', index: pointer },
                { type: 'current', index: pointer + gap },
            ] as HighlightedIndex[],
        }
    }

    private calculateGapSteps(n: number) : number {
        let count = 0;
        while (n > 1) {
            count++
            n = Math.floor((n*10)/13)
        }
        return count
    }
}
