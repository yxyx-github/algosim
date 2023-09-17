import type { GraphConfig } from '@/main/algorithms/search/graph/types'
import type { Vertex } from '@/main/algorithms/search/graph/vertex'
import type { Edge } from '@/main/algorithms/search/graph/edge'

export class Graph<T>{
    private vertices: Vertex<T>[] = []
    private edges: Edge<T>[] = []

    getVertices() {
        return this.vertices
    }

    hasVertex(vertex: Vertex<T>): boolean {
        return this.vertices.some(v => v.getId() === vertex.getId())
    }

    addVertex(vertex: Vertex<T>) {
        if (!this.hasVertex(vertex)) {
            this.vertices.push(vertex)
        }
    }

    removeVertex(vertex: Vertex<T>) {
        this.vertices = this.vertices.filter(v => v.getId() !== vertex.getId())
    }

    getEdges() {
        return this.edges
    }

    hasEdge(edge: Edge<T>, checkWeight: boolean = false) {
        return this.edges.some(e =>
            e.getFrom().getId() === edge.getFrom().getId() &&
            e.getTo().getId() === edge.getTo().getId() &&
            (e.getWeight() === edge.getWeight() || !checkWeight)
        )
    }

    addEdgeBetween(v1: Vertex<T>, v2: Vertex<T>, weight: number) {
        this.addEdge(new Edge<T>(v1, v2, weight))
        this.addEdge(new Edge<T>(v2, v1, weight))
    }

    addEdge(edge: Edge<T>) {
        if (this.hasVertex(edge.getFrom()) && this.hasVertex(edge.getTo())) {
            this.removeEdge(edge)
            this.edges.push(edge)
        }
    }

    removeEdge(edge: Edge<T>) {
        this.edges = this.edges.filter(e =>
            e.getFrom().getId() !== edge.getFrom().getId() ||
            e.getTo().getId() !== edge.getTo().getId()
        )
    }
}
