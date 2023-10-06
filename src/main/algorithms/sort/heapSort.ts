import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import type {
    SortAlgorithmImplementation,
    SortedValue,
    SortSimulation,
    SortSimulationStep
} from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

export class HeapSort implements SortAlgorithmImplementation {

    private colors: string[] = ['#e89ffa', '#a03cef', '#f323a6', '#fa7a37', '#f4e476', '#c0ed4c', '#6ef6a6', '#3794df', '#283af3', '#0f1e7f']

    run(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step(SortSimulationStepFactory.create(numbers))

        for (let i = Math.floor(numbers.length / 2) - 1; i >= 0; i--) {
            this.heapify(numbers, numbers.length, i, pB, progressTracker);
        }

        for (let i = numbers.length - 1; i >= 0; i--) {
            progressTracker?.trackNext()
            pB.step(this.createSortStep(numbers, i))

            let temp = numbers[0];
            numbers[0] = numbers[i];
            numbers[i] = temp;

            pB.step(this.createSortStep(numbers, i))

            this.heapify(numbers, i, 0, pB, progressTracker);
        }

        pB.step(SortSimulationStepFactory.create(numbers))
        return pB.build()
    }

    private heapify(numbers: number[], n: number, i: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        if (l < n && numbers[l] > numbers[largest]) {
            largest = l;
        }

        if (r < n && numbers[r] > numbers[largest]) {
            largest = r;
        }

        if (largest != i) {
            pB.step(this.createHeapifyStep(numbers, n, i, largest))

            let swap = numbers[i];
            numbers[i] = numbers[largest];
            numbers[largest] = swap;

            pB.step(this.createHeapifyStep(numbers, n, i, largest))

            this.heapify(numbers, n, largest, pB, progressTracker);
        }
    }

    private createHeapifyStep(numbers: number[], n: number, i: number, largest: number): SortSimulationStep {
        let step: SortSimulationStep = this.createBaseLayer(numbers, n)
        step.sortedValues[i].displayColor = SortColor.CURRENT;
        step.sortedValues[largest].displayColor = SortColor.CURRENT;
        if (n !== numbers.length) {
            step.sortedValues[n].displayColor = SortColor.THRESHOLD;
        }
        return step
    }

    private createSortStep(numbers: number[], i: number): SortSimulationStep {
        let step: SortSimulationStep = this.createBaseLayer(numbers, i + 1)
        step.sortedValues[0].displayColor = SortColor.CURRENT;
        if (i !== 0) {
            step.sortedValues[i].displayColor = SortColor.CURRENT;
        }
        if (i + 1 !== numbers.length) {
            step.sortedValues[i + 1].displayColor = SortColor.THRESHOLD;
        }
        return step
    }

    private createBaseLayer(numbers: number[], n: number): SortSimulationStep {
        let sortedValues: SortedValue[] = new Array(numbers.length)
        let k: number = 0;
        for (let i = 0; i < n; i++) {
            if (Math.log2(i + 1) % 1 === 0) {
                k = (k + 1) % (this.colors.length + 1)
            }
            sortedValues[i] = { value: numbers[i], displayColor: this.colors[k - 1] }
        }
        for (let i = n; i < numbers.length; i++) {
            sortedValues[i] = { value: numbers[i], displayColor: SortColor.NEUTRAL }
        }
        return { sortedValues }
    }

    description(): string[] {
        return [`
            Heapsort ist ein Sortierverfahren, welches auf dem binären Heap als zentrale Datenstruktur aufbaut.
            Im ersten Schritt wird die Liste in einen binären Max-Heap (siehe Absatz 2) umgewandelt.
            Danach wird die Wurzel des Heaps als größtes Element entfernt und an das Ende des unsortierten Teils der Liste bewegt.
            Da der Heap nun kein Max-Heap mehr ist, muss er heapified (siehe Absatz 3) werden.
            Dieser Schritt wird wiederholt, bis der Heap keine Elemente mehr enthält, dadurch ist die Liste sortiert.
            In dieser Hinsicht lässt sich eine Parallele zu Selectionsort erkennen.
            Heapsort hat eine Laufzeitkomplexität von O(n*log(n)) und benötigt keinen zusätzlichen Speicherplatz.`,

            `Ein binärer Heap ist ein Binärbaum, bei dem alle Ebenen bis auf die unterste vollständig ausgefüllt sind.
            Man unterscheidet zwischen Max- und Min-Heaps.
            Der Max-Heap hat zusätzlich die Bedingung, dass alle Kinder eines Knotens kleiner oder gleich dem Knoten selbst sind.
            Die Wurzel ist hier also das größte Element des Baumes.
            Der Min-Heap hat eine analoge Bedingung.
            Ein Heap kann als Liste dargestellt werden, dabei werden die Ebenen des Heaps hintereinander von links nach rechts gelesen dargestellt.
            Das bedeutet, dass die Wurzel eines Heaps immer den Index 0 trägt.`,

            `Die Funktion Heapify stellt sicher, dass es sich beim Heap um einen Max- bzw. Min-Heap handelt.
            Dazu wird ein Knoten mit seinen Kindern verglichen und vertauscht, sofern es sich nicht um das größte bzw. kleinste Element handelt.
            Dieser Vorgang wird rekursiv wiederholt, sodass auch die Unterbäume Max- bzw. Min-Heaps sind.`
        ]
    }
}
