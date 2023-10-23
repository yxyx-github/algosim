import type { GraphFormItemData, Side } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import type { Coords } from '@/main/algorithms/search/graphForm/types'

export class GraphFormItem {
    private readonly itemData: GraphFormItemData

    constructor(data: GraphFormItemData) {
        this.itemData = data
        this.updateType()
    }

    clone() {
        return new GraphFormItem(JSON.parse(JSON.stringify(this.data())))
    }

    static createBlank(x: number, y: number): GraphFormItem {
        return new GraphFormItem({
            type: GraphFormItemType.VERTEX,
            label: '',
            coords: { x: x, y: y },
            connections: { top: false, right: false, bottom: false, left: false },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false, center: false },
        })
    }

    getNeighbourCoords(side: Side): Coords {
        const neighbourCoords: Coords = {
            x: this.itemData.coords.x,
            y: this.itemData.coords.y,
        }
        switch (side) {
            case 'top':
                neighbourCoords.y--
                break
            case 'right':
                neighbourCoords.x++
                break
            case 'bottom':
                neighbourCoords.y++
                break
            case 'left':
                neighbourCoords.x--
                break
        }
        return neighbourCoords
    }

    data(): GraphFormItemData {
        return this.itemData
    }

    hasConnections(): boolean {
        return Object.values(this.itemData.connections).includes(true)
    }

    toggleConnection(side: 'top' | 'right' | 'bottom' | 'left') {
        this.itemData.connections[side] = !this.itemData.connections[side]
        this.updateType()
    }

    generateItemId(): string {
        return `x:${this.itemData.coords.x}y:${this.itemData.coords.y}`
    }

    private updateType() {
        this.itemData.type = Object.values(this.itemData.connections)
            .filter(v => v)
            .length === 2
            ? GraphFormItemType.EDGE
            : GraphFormItemType.VERTEX
    }
}
