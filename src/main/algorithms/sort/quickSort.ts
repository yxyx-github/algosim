import type {
    SortAlgorithmImplementation,
    SortSimulation,
    SortSimulationStep
} from '@/main/algorithms/sort/types'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

export class QuickSort implements SortAlgorithmImplementation {

    run(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        const pB = new ProtocolBuilder<SortSimulationStep>()
        progressTracker?.init(numbers.length)

        pB.step(SortSimulationStepFactory.create(numbers))
        this.quickSort(numbers, 0, numbers.length - 1, pB, progressTracker)
        pB.step(SortSimulationStepFactory.create(numbers))

        return pB.build()
    }

    description(): string[] {
        return [`Quicksort ist ein rekursiver Sortieralgorithmus, der auf dem Divide-and-Conquer-Prinzip basiert. Die
        Funktionsweise von Quicksort basiert auf dem Unterteilen der Liste in Teillisten. Diese Unterteilung wird mit
        einem Pivotelement vorgenommen. Als Pivotelement wird klassischerweise das letzte Element der Liste gewählt.
        Es gibt allerdings auch alternative Ansätze bei der Wahl des Pivots. Ein anderes Vorgehen bei der Pivotwahl wäre
        zum Beispiel den Median aus einer Teilmenge der Liste zu wählen. Anschließend müssen alle Elemente, welche
        kleiner sind als der Pivot, links vom Pivot stehen. Alle Elemente, die größer sind, müssen rechts stehen. Die
        Elemente mit dem gleichen Wert wie der Pivot haben keine vorgeschriebene Position. Nachdem diese
        Vorsortierung durchgeführt wurde, müssen nur noch die Teillisten sortiert werden. Diese Sortierung wird durch
        einen rekursiven Aufruf von Quicksort erreicht. Leere Listen und Listen mit der Länge 1 werden als bereits sortiert
        gewertet und fungieren somit als Abbruchbedingung. Die Laufzeitkomplexität von Quicksort hängt maßgeblich mit
        der Wahl des Pivotelements zusammen. Im Worst-Case hat Quicksort eine Laufzeitkomplexität von O(n²), während der
        durchschnittliche Aufwand O(n*log(n)) ist. Ein Vorteil von Quicksort ist allerdings, dass kein zusätzlicher
        Speicherplatz benötigt wird, da es sich um ein In-Place-Verfahren handelt. Außerdem lässt es sich sehr
        einfach parallelisieren.`]
    }

    private quickSort(numbers: number[], begin: number, end: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        if (begin >= end) {
            if (begin === end) {
                progressTracker?.trackNext()
            }
            return
        }
        let partitionIndex = this.partition(numbers, begin, end, pB, progressTracker);

        this.quickSort(numbers, begin, partitionIndex - 1, pB, progressTracker);
        this.quickSort(numbers, partitionIndex + 1, end, pB, progressTracker);
    }

    private partition(numbers: number[], begin: number, end: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        progressTracker?.trackNext()
        let pivot: number = numbers[end];
        let i = (begin - 1);

        for (let j = begin; j < end; j++) {
            pB.step(this.createCompareStep(numbers, end, j, i))

            if (numbers[j] <= pivot) {
                i++;
                let temp = numbers[i];
                numbers[i] = numbers[j];
                numbers[j] = temp;
                pB.step(this.createSwapStep(numbers, j, i))
            }
        }

        pB.step(this.createPivotPositionStep(numbers, end, i))
        let temp = numbers[i + 1];
        numbers[i + 1] = numbers[end];
        numbers[end] = temp;
        pB.step(this.createPivotPositionStep(numbers, end, i))

        return i + 1;
    }

    private createSwapStep(numbers: number[], j: number, i: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: j },
                ...(i === j ? [] : [{ color: SortColor.CURRENT, index: i }]),
            ])
    }

    private createCompareStep(numbers: number[], end: number, j: number, i: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: end },
                { color: SortColor.CURRENT, index: j },
                ...(i + 1 === j ? [] : [{ color: SortColor.THRESHOLD, index: i + 1 }]),
            ])
    }

    private createPivotPositionStep(numbers: number[], end: number, i: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: end },
                ...(i + 1 === end ? [] : [{ color: SortColor.CURRENT, index: i + 1 }]),
            ])
    }
}
