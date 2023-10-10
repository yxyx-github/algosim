import type { SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import { SearchAlgorithm } from '@/main/algorithms/search/algorithms/types'
import { BreadthFirstSearch } from '@/main/algorithms/search/algorithms/breadthFirstSearch'
import { DepthFirstSearch } from '@/main/algorithms/search/algorithms/depthFirstSearch'
import type { GraphFormGrid } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { Dijkstra } from '@/main/algorithms/search/algorithms/dijkstra'
import { AStar } from '@/main/algorithms/search/algorithms/astar'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'

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

export function cloneGrid(grid: GraphFormGrid): GraphFormGrid {
    return grid.map(row =>
        row.map(item =>
            cloneGraphFormItem(item)
        )
    )
}

export function cloneGraphForm(graphForm: GraphForm): GraphForm {
    const cloned = new GraphForm(cloneGrid(graphForm.toGrid()))
    cloned.setStartItem(
        cloned.toItems().find(item =>
            item.generateItemId() === graphForm.getStartItem()?.generateItemId()
        ) ?? null
    )
    cloned.setEndItem(
        cloned.toItems().find(item =>
            item.generateItemId() === graphForm.getEndItem()?.generateItemId()
        ) ?? null
    )
    return cloned
}

export function cloneGraphFormItem(item: GraphFormItem) {
    return new GraphFormItem(JSON.parse(JSON.stringify(item.data())))
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
