import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'
import { SortColor , type SortAlgorithmImplementation, type SortSimulation, type SortSimulationStep } from '@/main/algorithms/sort/types'
import type { TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'

export class ShellSort implements SortAlgorithmImplementation {

    sort(numbers: number[], progressTracker?: TrackableProgress): SortSimulation {
        progressTracker?.init(numbers.length)
        const pB = new ProtocolBuilder<SortSimulationStep>()

        pB.step(SortSimulationStepFactory.create(numbers))
        let item = -1
        let stepWidthArray : number[] = [1]
        for (let counter = 0; ;counter++){
            let nextStepWidth = 4**(counter + 1) + 3 * 2**counter + 1
            if (nextStepWidth > numbers.length){
                break;
            }
            stepWidthArray = [nextStepWidth].concat(stepWidthArray)
        }

        for (let stepWidth of stepWidthArray){
            for (let offset = 0; offset < stepWidth; offset++){
                for (let currentElement = stepWidth + offset; currentElement < numbers.length; currentElement = currentElement + stepWidth) {
                    if (stepWidth == 1){
                        progressTracker?.trackNext()
                    }
                    for (let pointer = currentElement - stepWidth; pointer >= 0; pointer = pointer - stepWidth) {
                        pB.step(this.createStep(numbers, pointer, currentElement, stepWidth))
                        if (numbers[pointer] <= numbers[pointer + stepWidth]) {
                            break;
                        }
                        item = numbers[pointer]
                        numbers[pointer] = numbers[pointer + stepWidth]
                        numbers[pointer + stepWidth] = item
                        pB.step(this.createStep(numbers, pointer, currentElement, stepWidth))
                    }
                }
            }
        }

        progressTracker?.trackNext()
        pB.step(SortSimulationStepFactory.create(numbers))
        return pB.build()
    }

    private createStep(numbers: number[], pointer: number, currentElement: number, stepwidth: number): SortSimulationStep {
        return SortSimulationStepFactory.create(numbers,
            [
                { color: SortColor.CURRENT, index: pointer },
                { color: SortColor.CURRENT, index: pointer + stepwidth },
                ...(pointer + stepwidth === currentElement ? [] : [{ color: SortColor.THRESHOLD, index: currentElement }]),
            ])
    }

    description(): string[] {
        return [`
        Shellsort ist ein auf Insertionsort basierender Sortieralgorithmus. Die Grundidee ist, die unsortierte Liste in mehrere Teillisten zu unterteilen und diese dann mit Insertionsort zu sortieren.
        Es wird ein gewisser Abstand gewählt, der zwischen den Elementen bestehen muss und somit die Teilliste erzeugt. Dabei wird beim ersten Element der Liste angefangen und jedes weitere Element der
        Teilliste ergibt sich durch das Aufsummieren des Abstandes, solange dieser Wert noch innerhalb der Liste liegt. Ist die Teilliste sortiert, wird das zweite Element der Liste genommen und das
        Verfahren wiederholt. Dies wird so oft wiederholt, wie der Abstand groß ist, damit jedes Element einmal mit dem Abstand sortiert wurde. Danach wird der Abstand verringert und das Verfahren
        wiederholt. Dies geschieht so lange, bis der Abstand 1 beträgt. Es gibt viele Möglichkeiten, die Abstände zu bestimmen. In dem hier gezeigten Verfahren wird am Anfang die 1 genommen und für die
        weiteren Abstände die Formel 'Abstand = 4^(i + 1) + 3 * 2^i + 1' verwendet, wobei i im ersten Schritt 0 ist und bei jedem Schritt um 1 erhöht wird. So kommt die Folge
        1, 8, 23, 77, 281, ... zustande, die dann rückwärts durchgegangen wird. Diesem Vorgehen konnte eine Laufzeitkomplexität von O(n^(4/3)) nachgewiesen werden. Die mathematisch beste Distanzfolge
        für Shellsort konnte bisher nicht gefunden werden, man geht jedoch nicht davon aus, dass eine Laufzeitkomplexität von O(n * log(n)) erreicht werden kann. Die Speicherkomplexität liegt bei O(1),
        da das Verfahren in-place sortiert.`
        ]
    }
}
