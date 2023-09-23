import type {
    SortAlgorithmImplementation,
    SortSimulation,
    SortSimulationStep
} from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

export class MergeSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()

        pB.step(SortSimulationStepFactory.create(numbers))
        this.mergeSort(numbers, 0, numbers.length - 1, pB, progressTracker)
        pB.step(SortSimulationStepFactory.create(numbers))

        return pB.build()
    }

    description(): string[] {
        return [`
            Mergesort ist ein rekursiver Sortieralgorithmus, welcher auf dem Divide-and-Conquer-Prinzip basiert.
            Mergesort teilt die Liste rekursiv in mehrere Teillisten. Wenn eine Teilliste die Länge 1 oder 0 hat, dann
            ist sie automatisch sortiert. Die sortierten Listen müssen nun effizient zusammengesetzt werden. Um 2 Teillisten zu einer zusammenzusetzen müssen
            jeweils die zwei ersten (kleinsten) Elemente dieser verglichen werden. Das kleinere Element wird an den Anfang der neuen sortierten Liste platziert.
            Dieser Vorgang wird solange wiederholt, wie Elemente in den beiden Teillisten vorhanden sind.
            Das Zusammensetzten der Teillisten hat also einen Aufwand von O(n). Die zusammengesetzte Liste benötigt allerdings weiteren Speicherplatz
            in der Größenordung O(n). Insgesamt hat Mergesort daher eine Laufzeitkompexität von O(n*log(n)) und ist somit schneller als Quicksort,
            welches im Worst-Case O(n^2) benötigt. Dafür benötigt Mergesort allerdings mehr Speicher, nämlich O(n).`
        ]
    }

    private mergeSort(numbers: number[], left: number, right: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        if (left >= right) {
            progressTracker?.trackNext()
            return
        }
        const mid: number = Math.floor((right - left) / 2) + left

        this.mergeSort(numbers, left, mid, pB, progressTracker)
        this.mergeSort(numbers, mid + 1, right, pB, progressTracker)
        this.merge(numbers, left, right, mid, pB)
    }

    private merge(numbers: number[], left: number, right: number, mid: number, pB: ProtocolBuilder<SortSimulationStep>) {
        let i: number = left;
        let j: number = mid + 1;
        let k: number = 0;
        let res: number[] = new Array(right - left + 1)

        while (i <= mid && j <= right) {
            pB.step(this.createCompareStep(numbers, left, mid, right, i, j))
            res[k++] = numbers[numbers[i] <= numbers[j] ? i++ : j++];
        }
        while (i <= mid) {
            pB.step(this.createLeftLeftoverStep(numbers, left, mid, right, i))
            res[k++] = numbers[i++];
        }
        while (j <= right) {
            pB.step(this.createRightLeftoverStep(numbers, left, mid, right, j))
            res[k++] = numbers[j++];
        }

        for (let l = 0; l < res.length; l++) {
            numbers[left + l] = res[l]
            pB.step(this.createInsertStep(numbers, left, right, l))
        }
    }

    private createCompareStep(numbers: number[], left: number, mid: number, right: number, i: number, j: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: i },
                { color: SortColor.CURRENT, index: j },
                ...(i === left ? [] : [{ color: SortColor.THRESHOLD, index: left }]),
                ...(i === mid ? [] : [{ color: SortColor.THRESHOLD, index: mid }]),
                ...(j === right ? [] : [{ color: SortColor.THRESHOLD, index: right }]),
            ])
    }

    private createLeftLeftoverStep(numbers: number[], left: number, mid: number, right: number, i: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: i },
                ...(i === left ? [] : [{ color: SortColor.THRESHOLD, index: left }]),
                ...(i === mid ? [] : [{ color: SortColor.THRESHOLD, index: mid }]),
                { color: SortColor.THRESHOLD, index: right },
            ])
    }

    private createRightLeftoverStep(numbers: number[], left: number, mid: number, right: number, j: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: j },
                { color: SortColor.THRESHOLD, index: left },
                ...(mid === left ? [] : [{ color: SortColor.THRESHOLD, index: mid }]),
                ...(j === right ? [] : [{ color: SortColor.THRESHOLD, index: right }]),
            ])
    }

    private createInsertStep(numbers: number[], left: number, right: number, l: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: l + left },
                ...(l + left === left ? [] : [{ color: SortColor.THRESHOLD, index: left }]),
                ...(l + left === right ? [] : [{ color: SortColor.THRESHOLD, index: right }]),
            ])
    }
}
