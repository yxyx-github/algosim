import { describe, expect, test } from 'vitest'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import { Edge } from '@/main/algorithms/search/graph/edge'

describe('Graph', () => {
    test('can add and remove vertices', () => {
        const g = new Graph<string, string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v2 = new Vertex<string>('v2', 'val2')
        const v3 = new Vertex<string>('v3', 'val3')

        g.addVertex(v1)
        g.addVertex(v1)
        g.addVertex(v2)

        expect(g.getVertices()).to.contain(v1)
        expect(g.getVertices()).to.contain(v2)
        expect(g.getVertices()).to.length(2)
        expect(g.hasVertex(v1)).to.true
        expect(g.hasVertex(v2)).to.true
        expect(g.hasVertex(v3)).to.false

        g.removeVertex(v1)

        expect(g.getVertices()).to.not.contain(v1)
        expect(g.getVertices()).to.contain(v2)
        expect(g.getVertices()).to.length(1)
        expect(g.hasVertex(v1)).to.false
        expect(g.hasVertex(v2)).to.true
        expect(g.hasVertex(v3)).to.false
    })

    test('can add and remove edges', () => {
        const g = new Graph<string, string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v2 = new Vertex<string>('v2', 'val2')
        const v3 = new Vertex<string>('v3', 'val3')

        g.addVertex(v1)
        g.addVertex(v2)
        g.addVertex(v3)

        const e1 = new Edge<string, string>(v1, v2, 4, 'e1')
        const e2 = new Edge<string, string>(v1, v3, 3, 'e2')
        const e3 = new Edge<string, string>(v3, v1, 2, 'e3')
        const e4 = new Edge<string, string>(v1, v3, 8, 'e4')
        const e5 = new Edge<string, string>(v2, v3, 8, 'e5')
        const e6 = new Edge<string, string>(v1, v3, 9, 'e6')

        g.addEdge(e1)
        g.addEdge(e2)
        g.addEdge(e3)
        g.addEdge(e4)

        expect(g.getEdges()).to.contain(e1)
        expect(g.getEdges()).to.not.contain(e2)
        expect(g.getEdges()).to.contain(e3)
        expect(g.getEdges()).to.contain(e4)
        expect(g.getEdges()).to.length(3)
        expect(g.hasEdge(e1)).to.true
        expect(g.hasEdge(e2)).to.true
        expect(g.hasEdge(e3)).to.true
        expect(g.hasEdge(e4)).to.true
        expect(g.hasEdge(e5)).to.false
        expect(g.hasEdge(e5, true)).to.false
        expect(g.hasEdge(e6)).to.true
        expect(g.hasEdge(e6, true)).to.false
    })

    test('can add and remove edges between vertices', () => {
        const g = new Graph<string, string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v2 = new Vertex<string>('v2', 'val2')
        const v3 = new Vertex<string>('v3', 'val3')

        g.addVertex(v1)
        g.addVertex(v2)
        g.addVertex(v3)

        const weightV1V2 = 4
        const valueV1V2 = 'v1v2'
        const weightV1V3 = 7
        const valueV1V3 = 'v1v3'

        g.addEdgeBetween(v1, v2, weightV1V2, valueV1V2)
        g.addEdgeBetween(v1, v3, weightV1V3, valueV1V3)
        g.addEdgeBetween(v1, v3, weightV1V3, valueV1V3)

        expect(g.getEdges()).toContainEqual(new Edge(v1, v2, weightV1V2, valueV1V2))
        expect(g.getEdges()).toContainEqual(new Edge(v2, v1, weightV1V2, valueV1V2))
        expect(g.getEdges()).toContainEqual(new Edge(v1, v3, weightV1V3, valueV1V3))
        expect(g.getEdges()).toContainEqual(new Edge(v3, v1, weightV1V3, valueV1V3))
        expect(g.getEdges()).to.length(4)
    })
})
