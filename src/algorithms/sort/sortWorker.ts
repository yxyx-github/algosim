import { SortAlgorithm } from '@/algorithms/sort/types'
import { SortFactory } from '@/algorithms/sort/index'
import { ProgressTracker } from '@/progressTracker/progressTracker'

self.onmessage = (e: { data: { algorithm: SortAlgorithm, numbersToSort: number[], intervalCount?: number } }) => {

    const progressTracker = new ProgressTracker()
    progressTracker.onTrack((progress) => self.postMessage({ name: 'progress', value: progress }), e.data.intervalCount ?? 100)

    const sorted = SortFactory.create(e.data.algorithm).sort(e.data.numbersToSort, progressTracker)
    const stepReader = new ReadableStream({
        start(controller) {
            for (const step of sorted.steps) {
                controller.enqueue(step)
            }
            controller.close()
        }
    })
    self.postMessage({ name: 'sorted', value: stepReader }, [stepReader])
    // self.postMessage({ name: 'sorted', value: sorted.steps }, [sorted.steps.buffer])
    // self.postMessage(sorted.steps, [sorted.steps.buffer])
}
