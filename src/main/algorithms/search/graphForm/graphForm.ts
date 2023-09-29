import type { GraphFormGrid } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import type { Side, TRBL, Coords } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

export class GraphForm {
    private grid: GraphFormGrid = [[]]
    private startItem: GraphFormItem | null = null
    private endItem: GraphFormItem | null = null

    constructor(grid?: GraphFormGrid) {
        if (grid === undefined) {
            this.clear()
        } else {
            this.grid = grid
        }
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

    // TODO: move somewhere else
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

    addRow(insertBefore: number = this.grid.length) {
        const oldCols = this.cols()
        if (oldCols === 0) {
            this.clear()
        } else {
            const newRow: GraphFormItem[] = []
            for (let i = 0; i < oldCols; i++) {
                newRow.push(GraphFormItem.createBlank(i, insertBefore))
            }
            for (let i = insertBefore; i < this.grid.length; i++) {
                this.grid[i] = this.grid[i].map(item => new GraphFormItem({ ...item.data(), coords: { x: item.data().coords.x, y: item.data().coords.y + 1 } }))
            }
            this.grid.splice(insertBefore, 0, newRow)
        }
    }

    addColumn(insertBefore: number = this.grid[0]?.length ?? 0) {
        const oldCols = this.cols()
        if (oldCols === 0) {
            this.clear()
        } else {
            this.grid.forEach((row, index) => {
                for (let i = insertBefore; i < row.length; i++) {
                    const item = this.grid[index][i]
                    this.grid[index][i] = new GraphFormItem({ ...item.data(), coords: { x: item.data().coords.x + 1, y: item.data().coords.y } })
                }
                row.splice(insertBefore, 0, GraphFormItem.createBlank(insertBefore, index))
            })
        }
    }

    clear() {
        this.grid = [[GraphFormItem.createBlank(0, 0)]]
        this.validateStartEnd()
    }

    updateItem(item: GraphFormItem) {
        this.grid[item.data().coords.y][item.data().coords.x] = item
        this.validateStartEnd()
    }

    validateItemConnections(item: GraphFormItem) {
        const neighbours: TRBL<GraphFormItem | undefined> = this.getConnectedNeighbours(item);
        (Object.keys(item.data().connections) as Side[])
            .filter((side: Side) => item.data().connections[side])
            .forEach((side: Side) => {
                if (neighbours[side]?.data().connections[this.oppsiteSide(side)] !== true) {
                    item.toggleConnection(side)
                }
            })
    }

    validateConnections() {
        this.toItems().forEach(item => this.validateItemConnections(item))
    }

    vertexItems(): GraphFormItem[] {
        return this.toItems().filter(item => item.data().type === GraphFormItemType.VERTEX)
    }

    validateStartEnd() {
        if (this.startItem !== null && (!this.vertexItems().includes(this.startItem) || !this.startItem.hasConnections())) {
            this.setStartItem(null)
        }
        if (this.endItem !== null && (!this.vertexItems().includes(this.endItem) || !this.endItem.hasConnections())) {
            this.setEndItem(null)
        }
    }

    getStartItem(): GraphFormItem | null {
        return this.startItem
    }

    setStartItem(item: GraphFormItem | null) {
        this.startItem = item
        this.validateStartEnd()
    }

    getEndItem(): GraphFormItem | null {
        return this.endItem
    }

    setEndItem(item: GraphFormItem | null) {
        this.endItem = item
        this.validateStartEnd()
    }
}
