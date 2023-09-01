import { SortAlgorithm } from '@/algorithms/sort/types'
import { SortFactory } from '@/algorithms/sort/index'

self.onmessage = (e: { data: { algorithm: SortAlgorithm, numbersToSort: number[] } }) => {
    const sorted = SortFactory.create(e.data.algorithm).sort(e.data.numbersToSort)
    self.postMessage(sorted)
}
