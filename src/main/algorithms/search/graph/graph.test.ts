import { describe, expect, test } from 'vitest'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import { Edge } from '@/main/algorithms/search/graph/edge'

describe('Graph', () => {
    test('can add and remove vertices', () => {
        const g = new Graph<string, string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v1Copy = structuredClone(v1)
        const v2 = new Vertex<string>('v2', 'val2')
        const v2Copy = new Vertex<string>('v2', 'val2')
        const v3 = new Vertex<string>('v3', 'val3')
        const v4 = new Vertex<string>('v4', 'val4')

        g.addVertex(v1)
        g.addVertex(v1)
        g.addVertex(v2)
        g.addVertex(v3)

        expect(g.getVertices()).to.contain(v1)
        expect(g.getVertices()).to.contain(v2)
        expect(g.getVertices()).to.length(3)
        expect(g.hasVertex(v1)).to.true
        expect(g.hasVertex(v1Copy)).to.false
        expect(g.hasVertex(v2)).to.true
        expect(g.hasVertex(v3)).to.true
        expect(g.hasVertex(v2Copy)).to.false
        expect(g.hasVertex(v4)).to.false

        g.removeVertex(v1)
        g.removeVertexById(v3.getId())

        expect(g.getVertices()).to.not.contain(v1)
        expect(g.getVertices()).to.contain(v2)
        expect(g.getVertices()).to.length(1)
        expect(g.hasVertex(v1)).to.false
        expect(g.hasVertex(v2)).to.true
        expect(g.hasVertex(v3)).to.false
        expect(g.hasVertex(v4)).to.false
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
        const e3 = new Edge<string, string>(v1, v3, 8, 'e3')
        const e4 = new Edge<string, string>(v1, v3, 8, 'e4')
        const e5 = new Edge<string, string>(v3, v1, 2, 'e5')
        const e6 = new Edge<string, string>(v2, v3, 8, 'e6')
        const e7 = new Edge<string, string>(v3, v2, 9, 'e7')

        g.addEdge(e1)
        g.addEdge(e2)
        g.addEdge(e3)
        g.addEdge(e4)
        g.addEdge(e5)
        g.addEdge(e6)

        expect(g.getEdges()).to.contain(e1)
        expect(g.getEdges()).to.contain(e2)
        expect(g.getEdges()).to.not.contain(e3)
        expect(g.getEdges()).to.contain(e4)
        expect(g.getEdges()).to.contain(e5)
        expect(g.getEdges()).to.contain(e6)
        expect(g.getEdges()).to.not.contain(e7)
        expect(g.getEdges()).to.length(5)
        expect(g.hasEdge(e1)).to.true
        expect(g.hasEdge(e2)).to.true
        expect(g.hasEdge(e3)).to.false
        expect(g.hasEdge(e4)).to.true
        expect(g.hasEdge(e5)).to.true
        expect(g.hasEdge(e6)).to.true
        expect(g.hasEdge(e7)).to.false

        g.removeEdge(e2)

        expect(g.getEdges()).to.contain(e1)
        expect(g.getEdges()).to.not.contain(e2)
        expect(g.getEdges()).to.not.contain(e3)
        expect(g.getEdges()).to.contain(e4)
        expect(g.getEdges()).to.contain(e5)
        expect(g.getEdges()).to.contain(e6)
        expect(g.getEdges()).to.not.contain(e7)
        expect(g.getEdges()).to.length(4)
        expect(g.hasEdge(e1)).to.true
        expect(g.hasEdge(e2)).to.false
        expect(g.hasEdge(e3)).to.false
        expect(g.hasEdge(e4)).to.true
        expect(g.hasEdge(e5)).to.true
        expect(g.hasEdge(e6)).to.true
        expect(g.hasEdge(e7)).to.false
    })

    test('can add and remove edges between vertices', () => {
        const g1 = new Graph<string, string>()
        const g2 = new Graph<string, string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v2 = new Vertex<string>('v2', 'val2')
        const v3 = new Vertex<string>('v3', 'val3')

        const weightV1V2 = 4
        const valueV1V2 = 'v1v2'
        const weightV1V3 = 7
        const weightV1V3Alt = 9
        const valueV1V3 = 'v1v3';

        [g1, g2].forEach(g => {
            g.addVertex(v1)
            g.addVertex(v2)
            g.addVertex(v3)

            g.addEdgeBetween(v1, v2, weightV1V2, valueV1V2)
            g.addEdgeBetween(v1, v3, weightV1V3, valueV1V3)
            g.addEdgeBetween(v1, v3, weightV1V3, valueV1V3)
            g.addEdgeBetween(v1, v3, weightV1V3Alt, valueV1V3)

            expect(g.getEdges()).to.deep.contain(new Edge(v1, v2, weightV1V2, valueV1V2))
            expect(g.getEdges()).to.deep.contain(new Edge(v2, v1, weightV1V2, valueV1V2))
            expect(g.getEdges()).to.deep.contain(new Edge(v1, v3, weightV1V3, valueV1V3))
            expect(g.getEdges()).to.deep.contain(new Edge(v3, v1, weightV1V3, valueV1V3))
            expect(g.getEdges()).to.deep.contain(new Edge(v1, v3, weightV1V3Alt, valueV1V3))
            expect(g.getEdges()).to.deep.contain(new Edge(v3, v1, weightV1V3Alt, valueV1V3))
            expect(g.getEdges()).to.length(6)
        })

        g1.removeEdgeBetween(v1, v3, 7)
        g2.removeEdgesBetween(v1, v3)

        expect(g1.getEdges()).to.deep.contain(new Edge(v1, v2, weightV1V2, valueV1V2))
        expect(g1.getEdges()).to.deep.contain(new Edge(v2, v1, weightV1V2, valueV1V2))
        expect(g1.getEdges()).to.not.deep.contain(new Edge(v1, v3, weightV1V3, valueV1V3))
        expect(g1.getEdges()).to.not.deep.contain(new Edge(v3, v1, weightV1V3, valueV1V3))
        expect(g1.getEdges()).to.deep.contain(new Edge(v1, v3, weightV1V3Alt, valueV1V3))
        expect(g1.getEdges()).to.deep.contain(new Edge(v3, v1, weightV1V3Alt, valueV1V3))
        expect(g1.getEdges()).to.length(4)

        expect(g2.getEdges()).to.deep.contain(new Edge(v1, v2, weightV1V2, valueV1V2))
        expect(g2.getEdges()).to.deep.contain(new Edge(v2, v1, weightV1V2, valueV1V2))
        expect(g2.getEdges()).to.not.deep.contain(new Edge(v1, v3, weightV1V3, valueV1V3))
        expect(g2.getEdges()).to.not.deep.contain(new Edge(v3, v1, weightV1V3, valueV1V3))
        expect(g2.getEdges()).to.not.deep.contain(new Edge(v1, v3, weightV1V3Alt, valueV1V3))
        expect(g2.getEdges()).to.not.deep.contain(new Edge(v3, v1, weightV1V3Alt, valueV1V3))
        expect(g2.getEdges()).to.length(4)
    })

    test('can find vertices', () => {
        const g = new Graph<string, string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v2 = new Vertex<string>('v2', 'val2')

        g.addVertex(v1)
        g.addVertex(v2)

        expect(g.findVertexById('v1')).to.equal(v1)
        expect(g.findVertexById('v2')).to.equal(v2)
        expect(g.findVertexById('v3')).to.undefined
        expect(g.findVertex((v: Vertex<string>) => v.getValue() === 'val1')).to.equal(v1)
        expect(g.findVertex((v: Vertex<string>) => v.getValue() === 'val2')).to.equal(v2)
        expect(g.findVertex((v: Vertex<string>) => v.getValue() === 'val3')).to.undefined
        expect(g.findVertex((v: Vertex<string>) => v.getValue().includes('val'))).to.equal(v1)
    })

    test('can find edges', () => {
        const g = new Graph<string, string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v2 = new Vertex<string>('v2', 'val2')

        g.addVertex(v1)
        g.addVertex(v2)

        const e12 = new Edge<string, string>(v1, v2, 3, 'e12')
        const e21 = new Edge<string, string>(v2, v1, 4, 'e21')

        g.addEdge(e12)
        g.addEdge(e21)

        expect(g.findEdge((e: Edge<string, string>) => e.getValue() === 'e12')).to.equal(e12)
        expect(g.findEdge((e: Edge<string, string>) => e.getValue() === 'e21')).to.equal(e21)
        expect(g.findEdge((e: Edge<string, string>) => e.getValue() === 'e')).to.undefined
        expect(g.findEdge((e: Edge<string, string>) => e.getValue().includes('e'))).to.equal(e12)
    })
})
