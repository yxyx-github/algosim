import { SortAlgorithm } from '@/algorithms/sort/types'
import { SortFactory } from '@/algorithms/sort/index'
import { ProgressTracker } from '@/progressTracker'

self.onmessage = (e: { data: { algorithm: SortAlgorithm, numbersToSort: number[] } }) => {

    const progressTracker = new ProgressTracker()
    progressTracker.onTrack((progress) => self.postMessage({ name: 'progress', value: progress }))

    const sorted = SortFactory.create(e.data.algorithm).sort(e.data.numbersToSort, progressTracker)
    self.postMessage({ name: 'sorted', value: sorted })
}
