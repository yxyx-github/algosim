import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { BreadthSearch } from '@/main/algorithms/search/algorithms/breadthSearch'
import { DepthFirstSearch } from '@/main/algorithms/search/algorithms/depthFirstSearch'

export class SearchFactory {
    static create(algorithm: SearchAlgorithm) {
        switch (algorithm) {
            case SearchAlgorithm.DEPTH_FIRST_SEARCH:
                return new DepthFirstSearch()
            default:
            case SearchAlgorithm.BREADTH_SEARCH:
                return new BreadthSearch()
        }
    }
}
