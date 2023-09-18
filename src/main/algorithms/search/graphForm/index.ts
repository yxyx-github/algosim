import type { GraphForm, GraphFormItem } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'

export function getBlankGraphFormItem(x: number, y: number): GraphFormItem {
    return {
        type: GraphFormItemType.VERTEX,
        label: '',
        coords: { x: x, y: y },
        connections: { top: false, right: false, bottom: false, left: false },
        connect: { top: false, right: false, bottom: false, left: false },
        highlight: { top: false, right: false, bottom: false, left: false },
        isStart: false,
        isEnd: false,
    }
}

export function graphFormToItems(graphForm: GraphForm): GraphFormItem[] {
    let items: GraphFormItem[] = []
    graphForm.forEach(row =>
        items = items.concat(row)
    )
    return items
}
