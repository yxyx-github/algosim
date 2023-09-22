import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'

export type GraphFormGrid = GraphFormItem[][]

export type GraphFormItemData = {
    type: GraphFormItemType,
    label: string,
    coords: Coords,
    connections: TRBL<boolean>,
    connect: TRBL<boolean>,
    highlight: TRBL<boolean>,
    isStart: boolean,
    isEnd: boolean,
}

export type Coords = {
    x: number,
    y: number
}

export type TRBL<T> = {
    [side in Side]: T
}

export enum GraphFormItemType {
    VERTEX,
    EDGE,
}

export type Side = 'top' | 'right' | 'bottom' | 'left'

export type VertexValue = {
    item: GraphFormItem
}

export type EdgeValue = {
    items: GraphFormItem[]
}
