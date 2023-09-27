import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { BreadthSearch } from '@/main/algorithms/search/algorithms/breadthSearch'

export class SearchFactory {
    static create(algorithm: SearchAlgorithm) {
        switch (algorithm) {
            default:
            case SearchAlgorithm.BREADTH_SEARCH:
                return new BreadthSearch()
        }
    }
}
