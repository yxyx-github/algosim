import type { GraphConfig } from '@/main/algorithms/search/graph/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'

export class Graph<T> {
    private readonly directed: boolean
    private vertices: Vertex<T>[] = []

    constructor(config?: GraphConfig) {
        this.directed = config?.direction ?? false
    }

    addVertex(vertex: Vertex<T>) {
        if (!this.vertices.some(v => v.getId() === vertex.getId())) {
            this.vertices.push(vertex)
        }
    }

    removeVertex(vertex: Vertex<T>) {
        this.vertices = this.vertices.filter(v => v.getId() !== vertex.getId())
    }

    getVertices() {
        return this.vertices
    }
}
