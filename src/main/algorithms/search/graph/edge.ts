import type { Vertex } from '@/main/algorithms/search/graph/vertex'

export class Edge<T> {
    private readonly from: Vertex<T>
    private readonly to: Vertex<T>
    private readonly weight: number

    constructor(from: Vertex<T>, to: Vertex<T>, weight: number) {
        this.from = from
        this.to = to
        this.weight = weight
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
}
