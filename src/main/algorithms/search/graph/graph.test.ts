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

        g.addEdge(e1)
        g.addEdge(e2)
        g.addEdge(e3)
        g.addEdge(e4)

        expect(g.getEdges()).to.contain(e1)
        expect(g.getEdges()).to.not.contain(e2)
        expect(g.getEdges()).to.contain(e3)
        expect(g.getEdges()).to.contain(e4)
        expect(g.getEdges()).to.length(3)
    })

    // TODO: test addEdgeBetween, hasEdge
})
