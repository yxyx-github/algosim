import { Vertex } from '@/main/algorithms/search/graph/vertex'
import type { VertexDijkstraValue } from '@/main/algorithms/search/algorithms/dijkstra'

export class DijkstraQueue {

    private readonly vertices: Vertex<VertexDijkstraValue>[]

    constructor(vertices: Vertex<VertexDijkstraValue>[]) {
        this.vertices = Array<Vertex<VertexDijkstraValue>>(...vertices)
    }

    public offer(element: Vertex<VertexDijkstraValue>) {
        this.vertices.push(element)
    }

    public poll() {
        if (this.isEmpty()) {
            return null
        }
        let min = 0
        this.vertices.forEach((val, i) => {
            if ((val.getValue().distance ?? Infinity) < (this.vertices[min].getValue().distance ?? Infinity)) {
                min = i
            }
        })
        let res = this.vertices[min]
        this.vertices.splice(min, 1)
        return res
    }

    public isEmpty(): boolean {
        return this.size() == 0
    }

    public size(): number {
        return this.vertices.length
    }
}
