import { Vertex } from '@/main/algorithms/search/graph/vertex'
import { Edge } from '@/main/algorithms/search/graph/edge'

export class Graph<T, S> {
    private vertices: Vertex<T>[] = []
    private edges: Edge<T, S>[] = []

    getVertices() {
        return this.vertices
    }

    hasVertex(vertex: Vertex<T>): boolean {
        return this.vertices.some(v => v === vertex)
    }

    findVertex(condition: (v: Vertex<T>) => boolean): Vertex<T> | undefined {
        return this.vertices.find(v => condition(v))
    }

    findVertexById(id: string): Vertex<T> | undefined {
        return this.findVertex((v: Vertex<T>) => v.getId() === id)
    }

    addVertex(vertex: Vertex<T>) {
        if (!this.hasVertex(vertex)) {
            this.vertices.push(vertex)
        } else {
            console.error('Cannot insert vertex: vertex does already exist')
        }
    }

    removeVertex(vertex: Vertex<T>) {
        this.vertices = this.vertices.filter(v => v !== vertex)
    }

    removeVertexById(vertexId: string) {
        this.vertices = this.vertices.filter(v => v.getId() !== vertexId)
    }

    getEdges() {
        return this.edges
    }

    hasEdge(edge: Edge<T, S>) {
        return this.edges.some(e => e === edge)
    }

    hasEdgeBetween(v1: Vertex<T>, v2: Vertex<T>, weight: number) {
        return this.edges.some(e =>
            (
                e.getFrom() === v1 && e.getTo() === v2 ||
                e.getFrom() === v2 && e.getTo() === v1
            ) &&
            e.getWeight() === weight
        )
    }

    hasEdgesBetween(v1: Vertex<T>, v2: Vertex<T>) {
        return this.edges.some(e =>
            e.getFrom() === v1 && e.getTo() === v2 ||
            e.getFrom() === v2 && e.getTo() === v1
        )
    }

    findEdge(condition: (e: Edge<T, S>) => boolean): Edge<T, S> | undefined {
        return this.edges.find(e => condition(e))
    }

    addEdgeBetween(v1: Vertex<T>, v2: Vertex<T>, weight: number, value: S) {
        this.addEdge(new Edge<T, S>(v1, v2, weight, value))
        this.addEdge(new Edge<T, S>(v2, v1, weight, value))
    }

    addEdge(edge: Edge<T, S>) {
        if (this.hasVertex(edge.getFrom()) && this.hasVertex(edge.getTo())) {
            // TODO: don't check
            const existingEdge = this.findEdge(e =>
                e.getFrom() === edge.getFrom() &&
                e.getTo() === edge.getTo() &&
                e.getWeight() === edge.getWeight()
            )
            if (existingEdge !== undefined) {
                this.removeEdge(existingEdge)
            }
            this.edges.push(edge)
        } else {
            console.error('Cannot insert edge: required vertices are missing')
        }
    }

    removeEdge(edge: Edge<T, S>) {
        this.edges = this.edges.filter(e => e !== edge)
    }

    // TODO: remove
    removeEdgeBetween(v1: Vertex<T>, v2: Vertex<T>, weight: number) {
        this.edges = this.edges.filter(e =>
            (
                (e.getFrom() !== v1 || e.getTo() !== v2) &&
                (e.getFrom() !== v2 || e.getTo() !== v1)
            ) ||
            e.getWeight() !== weight
        )
    }

    // TODO: add optional arg weight
    removeEdgesBetween(v1: Vertex<T>, v2: Vertex<T>) {
        this.edges = this.edges.filter(e =>
            (e.getFrom() !== v1 || e.getTo() !== v2) &&
            (e.getFrom() !== v2 || e.getTo() !== v1)
        )
    }
}
