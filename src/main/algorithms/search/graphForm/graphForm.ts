import type { GraphFormGrid } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Side, TRBL, Coords } from '@/main/algorithms/search/graphForm/types'

export class GraphForm {
    private grid: GraphFormGrid = [[]]

    constructor() {
        this.clear()
    }

    toItems(): GraphFormItem[] {
        let items: GraphFormItem[] = []
        this.grid.forEach(row =>
            items = items.concat(row)
        )
        return items
    }

    toGrid(): GraphFormGrid {
        return this.grid
    }

    getItem(x: number, y: number): GraphFormItem | undefined {
        return this.grid[y]?.[x]
    }

    getConnectedNeighbours(item: GraphFormItem): TRBL<GraphFormItem | undefined> {
        const connectedNeighbours: TRBL<GraphFormItem | undefined> = { top: undefined, right: undefined, bottom: undefined, left: undefined };

        (['top', 'right', 'bottom', 'left'] as Side[]).forEach((side: Side) => {
            if (item.data().connections[side]) {
                const neighbourCoords: Coords = item.getNeighbourCoords(side)
                const neighbour = this.getItem(neighbourCoords.x, neighbourCoords.y)
                connectedNeighbours[side] = neighbour?.data().connections[this.oppsiteSide(side)] ? neighbour : undefined
            }
        })

        return connectedNeighbours
    }

    // TODO: move somewhere else and test
    oppsiteSide(side: Side): Side {
        switch (side) {
            case 'top':
                return 'bottom'
            case 'right':
                return 'left'
            case 'bottom':
                return 'top'
            case 'left':
                return 'right'
        }
    }

    rows(): number {
        return this.grid.length
    }

    cols(): number {
        return this.grid[0]?.length ?? 0
    }

    isEmpty(): boolean {
        return this.rows() === 0 && this.cols() === 0
    }

    addRow() {
        const oldCols = this.cols()
        if (oldCols === 0) {
            this.clear()
        } else {
            const newRow: GraphFormItem[] = []
            for (let i = 0; i < oldCols; i++) {
                newRow.push(GraphFormItem.createBlank(i, this.rows()))
            }
            this.grid.push(newRow)
        }
    }

    addColumn() {
        const oldCols = this.cols()
        if (oldCols === 0) {
            this.clear()
        } else {
            this.grid.forEach((row, index) => row.push(GraphFormItem.createBlank(oldCols, index)))
        }
    }

    clear() {
        this.grid = [[GraphFormItem.createBlank(0, 0)]]
    }

    updateItem(item: GraphFormItem) {
        this.grid[item.data().coords.y][item.data().coords.x] = item
    }
}
