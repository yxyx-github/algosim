import { describe, expect, test } from 'vitest'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

describe('Graph', () => {
    test('can add and remove vertices', () => {
        const g = new Graph<string>()
        const v1 = new Vertex<string>('v1', 'val1')
        const v2 = new Vertex<string>('v2', 'val2')

        g.addVertex(v1)
        g.addVertex(v1)
        g.addVertex(v2)

        expect(g.getVertices()).to.contain(v1)
        expect(g.getVertices()).to.contain(v2)
        expect(g.getVertices()).to.length(2)

        g.removeVertex(v1)

        expect(g.getVertices()).to.not.contain(v1)
        expect(g.getVertices()).to.contain(v2)
        expect(g.getVertices()).to.length(1)
    })
})
