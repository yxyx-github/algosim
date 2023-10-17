import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { SortColor , type SortAlgorithmImplementation, type SortSimulation, type SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'

export class ShellSort implements SortAlgorithmImplementation {

    run(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()
        pB.step(SortSimulationStepFactory.create(numbers))

        let stepWidthArray: number[] = []
        let nextStepWidth: number = 1
        let counter: number = 0;
        while (nextStepWidth <= numbers.length) {
            stepWidthArray = [nextStepWidth].concat(stepWidthArray)
            nextStepWidth = 4**(counter + 1) + 3 * 2**counter + 1;
            counter++;
        }

        for (let stepWidth of stepWidthArray) {
            for (let offset = 0; offset < stepWidth; offset++) {
                this.insertionSortWithOffset(numbers, offset, stepWidth, pB, progressTracker)
            }
        }

        progressTracker?.trackNext()
        pB.step(SortSimulationStepFactory.create(numbers))
        return pB.build()
    }

    private insertionSortWithOffset(numbers: number[], offset: number, stepWidth: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress ) {
        for (let currentElement = stepWidth + offset; currentElement < numbers.length; currentElement += stepWidth) {
            this.insertCurrentElement(numbers, currentElement, stepWidth, pB, progressTracker)
        }
    }

    private insertCurrentElement(numbers: number[], currentElement: number, stepWidth: number, pB: ProtocolBuilder<SortSimulationStep>, progressTracker?: TrackableProgress) {
        if (stepWidth == 1){
            progressTracker?.trackNext()
        }
        for (let pointer = currentElement - stepWidth; pointer >= 0; pointer -= stepWidth) {
            pB.step(this.createStep(numbers, pointer, currentElement, stepWidth))
                if (numbers[pointer] <= numbers[pointer + stepWidth]) {
                    break;
                }
            this.swap(numbers, pointer, stepWidth)
            pB.step(this.createStep(numbers, pointer, currentElement, stepWidth))
        }
    }

    private swap(numbers: number[], pointer: number, stepWidth: number) {
        let temp = numbers[pointer]
        numbers[pointer] = numbers[pointer + stepWidth]
        numbers[pointer + stepWidth] = temp
    }

    private createStep(numbers: number[], pointer: number, currentElement: number, stepWidth: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: pointer },
                { color: SortColor.CURRENT, index: pointer + stepWidth },
                ...(pointer + stepWidth === currentElement ? [] : [{ color: SortColor.THRESHOLD, index: currentElement }]),
            ])
    }

    description(): string[] {
        return [
            `Shellsort ist ein auf Insertionsort basierender Sortieralgorithmus.
            Die Grundidee ist es, eine unsortierte Liste in mehrere Teillisten zu unterteilen und diese mit Insertionsort zu sortieren.
            Die Elemente der einzelnen Teillisten liegen jedoch nicht gruppiert hintereinander, sondern sind gleichmäßig in einem gewissen Abstand über die Liste verteilt.
            Dieser Abstand ist gleich der Anzahl an Teillisten.
            Die erste Teilliste mit einem Abstand von 4 beinhaltet beispielsweise die Indizes 0, 0+4=4, 0+4+4=8, 0+4+4+4=12, ... bis zum Ende der Liste.
            Analog dazu beginnen die Teillisten 2, 3 und 4 bei den Indizes 1, 2 und 3.
            Zu Beginn des Algorithmus wird ein möglichst hoher Abstand gewählt.
            Wurde jede der Teillisten sortiert, wird der Abstand verringert und das Verfahren wiederholt.
            Dies geschieht so lange, bis der Abstand 1 beträgt.
            Um die Abstände zu bestimmen, wird in dem hier implementierten Verfahren die Formel 'Abstand = 4^(i + 1) + 3 * 2^i + 1' verwendet.
            Die Variable i ist im ersten Schritt 0 und wird bei jedem Schritt um 1 erhöht, wodurch sich die Folge 8, 23, 77, 281, ... ergibt.
            Am Anfang der Folge wird die 1 eingefügt (1, 8, 23, ...).
            Die Abstände erhält man, indem die Folge rückwärts durchlaufen wird.
            Diesem Vorgehen konnte eine Laufzeitkomplexität von O(n^(4/3)) nachgewiesen werden.
            Die mathematisch beste Distanzfolge für Shellsort konnte bisher nicht gefunden werden, man geht jedoch nicht davon aus, dass eine Laufzeitkomplexität von O(n * log(n)) erreicht werden kann.
            Die Speicherkomplexität liegt bei O(1), da das Verfahren In-Place sortiert.`
        ]
    }
}
