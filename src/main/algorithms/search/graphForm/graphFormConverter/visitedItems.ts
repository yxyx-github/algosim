import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

export class VisitedItems {
    private readonly graphForm: GraphForm
    private readonly itemsVisited: boolean[][]

    constructor(graphForm: GraphForm, initialValue: boolean = false) {
        this.graphForm = graphForm
        this.itemsVisited = graphForm.toGrid().map(row => row.map(item => initialValue))
    }

    hasUnvisitedVertexItems(): boolean {
        return this.itemsVisited.some((row, y) => row.some((itemVisited, x) => {
            const currentItem = this.graphForm.toGrid()[y][x]
            return !itemVisited && currentItem.data().type === GraphFormItemType.VERTEX
        }))
    }

    nextUnvisitedVertexItem(): GraphFormItem | undefined {
        let item: GraphFormItem | undefined
        this.itemsVisited.forEach((row, y) => row.forEach((itemVisited, x) => {
            if (!itemVisited && item === undefined) {
                const currentItem = this.graphForm.toGrid()[y][x]
                if (currentItem.data().type === GraphFormItemType.VERTEX) {
                    item = this.graphForm.toGrid()[y][x]
                }
            }
        }))
        return item
    }

    isVisited(item: GraphFormItem): boolean {
        return this.itemsVisited[item.data().coords.y][item.data().coords.x]
    }

    setVisited(item: GraphFormItem) {
        this.itemsVisited[item.data().coords.y][item.data().coords.x] = true
    }
}
