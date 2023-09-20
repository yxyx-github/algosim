import type { GraphFormGrid } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

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
