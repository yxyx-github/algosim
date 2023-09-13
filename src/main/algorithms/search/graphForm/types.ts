export type GraphForm = GraphFormItem[][]

export type GraphFormItem = {
    type: GraphFormItemType,
    label: string,
    coords: Coords,
    connections: TRBL<boolean>,
    connect: TRBL<boolean>,
    highlight: TRBL<boolean>,
}

export type Coords = {
    x: number,
    y: number
}

export type TRBL<T> = {
    top: T,
    right: T,
    bottom: T,
    left: T,
}

export enum GraphFormItemType {
    NODE,
    EDGE,
}
