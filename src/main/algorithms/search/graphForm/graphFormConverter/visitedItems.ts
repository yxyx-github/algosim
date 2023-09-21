import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

export class VisitedItems {
    private readonly graphForm: GraphForm
    private readonly itemsVisited: boolean[][]

    constructor(graphForm: GraphForm, initialValue: boolean = false) {
        this.graphForm = graphForm
        this.itemsVisited = graphForm.toGrid().map(row => row.map(item => initialValue))
    }

    hasUnvisited(): boolean {
        return this.itemsVisited.some(row => row.some(itemVisited => !itemVisited))
    }

    nextUnvisited(): GraphFormItem | undefined {
        let item: GraphFormItem | undefined
        this.itemsVisited.forEach((row, y) => row.forEach((itemVisited, x) => {
            if (!itemVisited && item === undefined) {
                item = this.graphForm.toGrid()[y][x]
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
