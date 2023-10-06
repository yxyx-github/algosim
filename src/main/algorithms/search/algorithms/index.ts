import type {SearchSimulationStep} from '@/main/algorithms/search/algorithms/types'
import {SearchAlgorithm} from '@/main/algorithms/search/algorithms/types'
import {BreadthFirstSearch} from '@/main/algorithms/search/algorithms/breadthFirstSearch'
import {DepthFirstSearch} from '@/main/algorithms/search/algorithms/depthFirstSearch'
import type {GraphFormGrid} from '@/main/algorithms/search/graphForm/types'
import {GraphFormItem} from '@/main/algorithms/search/graphForm/graphFormItem'
import {AStar} from '@/main/algorithms/search/algorithms/astar'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import type { SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import { BreadthFirstSearch } from '@/main/algorithms/search/algorithms/breadthFirstSearch'
import { DepthFirstSearch } from '@/main/algorithms/search/algorithms/depthFirstSearch'
import { Dijkstra } from '@/main/algorithms/search/algorithms/dijkstra'
import type { GraphFormGrid } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

export class SearchFactory {
    static create(algorithm: SearchAlgorithm) {
        switch (algorithm) {
            case SearchAlgorithm.A_STAR:
                return new AStar()
            case SearchAlgorithm.DEPTH_FIRST_SEARCH:
                return new DepthFirstSearch()
            default:
            case SearchAlgorithm.BREADTH_FIRST_SEARCH:
                return new BreadthFirstSearch()
        }
    }
}

export function cloneGrid(grid: GraphFormGrid): GraphFormGrid {
    return grid.map(row =>
        row.map(item =>
            new GraphFormItem(JSON.parse(JSON.stringify(item.data())))
        )
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
