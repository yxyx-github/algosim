import type { Vertex } from '@/main/algorithms/search/graph/vertex'

export class Edge<T, S> {
    private readonly from: Vertex<T>
    private readonly to: Vertex<T>
    private readonly weight: number
    private readonly value: S

    constructor(from: Vertex<T>, to: Vertex<T>, weight: number, value: S) {
        this.from = from
        this.to = to
        this.weight = weight
        this.value = value
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
