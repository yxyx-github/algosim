import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { BreadthSearch } from '@/main/algorithms/search/algorithms/breadthSearch'
import type { GraphFormGrid } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

export class SearchFactory {
    static create(algorithm: SearchAlgorithm) {
        switch (algorithm) {
            default:
            case SearchAlgorithm.BREADTH_SEARCH:
                return new BreadthSearch()
        }
    }
}

export function cloneGrid(grid: GraphFormGrid): GraphFormGrid {
    return grid.map(row =>
        row.map(item =>
            new GraphFormItem(JSON.parse(JSON.stringify(item.data()))) // TODO: figure out why structuredClone() does not work
        )
    )
}
