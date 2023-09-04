import type { SortAlgorithm, SortSimulationStep } from '@/algorithms/sort/types'
import { SortFactory } from '@/algorithms/sort/index'
import { ProgressTracker } from '@/progressTracker/progressTracker'

self.onmessage = (e: { data: { algorithm: SortAlgorithm, numbersToSort: number[], intervalCount?: number } }) => {

    const progressTracker = new ProgressTracker(e.data.intervalCount ?? 100)
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
