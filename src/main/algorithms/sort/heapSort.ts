import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { HighlightedIndex, SortAlgorithmImplementation, SortSimulation, SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'

export class HeapSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(1)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        pB.step({
            sortedValues: numbers,
            highlightedIndices: [],
        })
        return pB.build()
    }

    description(): string {
        return 'Heapsort description'
    }
}
