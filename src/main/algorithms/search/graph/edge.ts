import type { Vertex } from '@/main/algorithms/search/graph/vertex'

export class Edge<T, S> {
    private readonly id: string
    private readonly from: Vertex<T>
    private readonly to: Vertex<T>
    private readonly weight: number
    private readonly value: S

    constructor(id: string, from: Vertex<T>, to: Vertex<T>, weight: number, value: S) {
        this.id = id
        this.from = from
        this.to = to
        this.weight = weight
        this.value = value
    }

    getId() {
        return this.id
    }

    getFrom() {
        return this.from
    }

    getTo() {
        return this.to
    }

    getWeight() {
        return this.weight
    }

    getValue() {
        return this.value
    }
}
