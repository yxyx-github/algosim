import { SortAlgorithm } from '@/algorithms/sort/types'
import { SortFactory } from '@/algorithms/sort/index'
import { ProgressTracker } from '@/progressTracker/progressTracker'

self.onmessage = (e: { data: { algorithm: SortAlgorithm, numbersToSort: number[], intervalCount?: number } }) => {

    const progressTracker = new ProgressTracker()
    progressTracker.onTrack((progress) => self.postMessage({ name: 'progress', value: progress }), e.data.intervalCount ?? 100)

    const sorted = SortFactory.create(e.data.algorithm).sort(e.data.numbersToSort, progressTracker)
    self.postMessage({ name: 'sorted', value: sorted })
    // self.postMessage({ name: 'sorted', value: sorted.steps }, [sorted.steps.buffer])
    // self.postMessage(sorted.steps, [sorted.steps.buffer])
}
