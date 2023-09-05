import type { SortAlgorithm, SortSimulationStep } from '@/main/algorithms/sort/types'
import { SortFactory } from '@/main/algorithms/sort/index'
import { ProgressTracker } from '@/main/progressTracker/progressTracker'
import type { ProgressTrackerConfig } from '@/main/progressTracker/types'

self.onmessage = (e: { data: { algorithm: SortAlgorithm, numbersToSort: number[], progressTrackerConfig?: ProgressTrackerConfig } }) => {

    const progressTracker = new ProgressTracker(e.data.progressTrackerConfig)
    progressTracker.onTrack((progress) => self.postMessage({ name: 'progress', value: progress }))

    const sorted = SortFactory.create(e.data.algorithm).sort(e.data.numbersToSort, progressTracker)

    self.postMessage({ name: 'resultCount', value: sorted.steps.length })

    const stepReader = new ReadableStream<SortSimulationStep>({
        start(controller) {
            for (const step of sorted.steps) {
                controller.enqueue(step)
            }
            controller.close()
        }
    })
    self.postMessage({ name: 'sorted', value: stepReader }, [stepReader] as any)
}
