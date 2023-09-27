import { describe, expect, test } from 'vitest'
import { Edge } from '@/main/algorithms/search/graph/edge'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

describe('Edge', () => {
    test('can create Edge', () => {
        const id = 'myEdgeId'
        const from = new Vertex<string>('from', 'fromVal')
        const to = new Vertex<string>('to', 'toVal')
        const weight = 3
        const value = 'xyz'
        const e = new Edge<string, string>(id, from, to, weight, value)

        expect(e.getId()).to.equal(id)
        expect(e.getFrom()).to.equal(from)
        expect(e.getTo()).to.equal(to)
        expect(e.getWeight()).to.equal(weight)
        expect(e.getValue()).to.equal(value)
    })
})
