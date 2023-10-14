import type { SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { BreadthFirstSearch } from '@/main/algorithms/search/algorithms/breadthFirstSearch'
import { DepthFirstSearch } from '@/main/algorithms/search/algorithms/depthFirstSearch'
import type { GraphFormGrid } from '@/main/algorithms/search/graphForm/types'
import { Dijkstra } from '@/main/algorithms/search/algorithms/dijkstra'
import { AStar } from '@/main/algorithms/search/algorithms/astar'
import type { AlgorithmData } from '@/main/algorithms/types'

export class SearchFactory {
    static create(algorithm: SearchAlgorithm) {
        switch (algorithm) {
            case SearchAlgorithm.A_STAR:
                return new AStar()
            case SearchAlgorithm.DEPTH_FIRST_SEARCH:
                return new DepthFirstSearch()
            case SearchAlgorithm.DIJKSTRA:
                return new Dijkstra()
            default:
            case SearchAlgorithm.BREADTH_FIRST_SEARCH:
                return new BreadthFirstSearch()
        }
    }
}

export const searchAlgorithmData: AlgorithmData<SearchAlgorithm>[] = [
    {
        label: 'A*',
        value: SearchAlgorithm.A_STAR,
    },
    {
        label: 'Breadth-First search',
        value: SearchAlgorithm.BREADTH_FIRST_SEARCH,
    },
    {
        label: 'Depth-First search',
        value: SearchAlgorithm.DEPTH_FIRST_SEARCH,
    },
    {
        label: 'Dijkstra',
        value: SearchAlgorithm.DIJKSTRA,
    },
]

export function cloneGrid(grid: GraphFormGrid): GraphFormGrid {
    return grid.map(row =>
        row.map(item => item.clone())
    )
}

export function cloneSearchSimulationStep(step: SearchSimulationStep): SearchSimulationStep {
    const startCoords = step.start?.data().coords
    const endCoords = step.end?.data().coords
    const clonedGrid = cloneGrid(step.grid)
    return {
        grid: clonedGrid,
        start: startCoords !== undefined ? clonedGrid[startCoords.y][startCoords.x] : undefined,
        end: endCoords !== undefined ? clonedGrid[endCoords.y][endCoords.x] : undefined,
    }
}
