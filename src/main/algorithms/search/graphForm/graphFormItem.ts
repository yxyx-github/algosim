import type { GraphFormItemData } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

export class GraphFormItem {
    private readonly itemData: GraphFormItemData

    constructor(data: GraphFormItemData) {
        this.itemData = data
    }

    static createBlank(x: number, y: number): GraphFormItem {
        return new GraphFormItem({
            type: GraphFormItemType.VERTEX,
            label: '',
            coords: { x: x, y: y },
            connections: { top: false, right: false, bottom: false, left: false },
            connect: { top: false, right: false, bottom: false, left: false },
            highlight: { top: false, right: false, bottom: false, left: false },
            isStart: false,
            isEnd: false,
        })
    }

    data(): GraphFormItemData {
        return this.itemData
    }
}
