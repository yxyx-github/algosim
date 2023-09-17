import { describe, expect, test } from 'vitest'
import { Edge } from '@/main/algorithms/search/graph/edge'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

describe('Edge', () => {
    test('can create Edge', () => {
        const from = new Vertex<T>('from', 'fromVal')
        const to = new Vertex<T>('to', 'toVal')
        const weight = 3
        const e = new Edge<string>(from, to, weight)

        expect(e.getFrom()).to.equal(from)
        expect(e.getTo()).to.equal(to)
        expect(e.getWeight()).to.equal(weight)
    })
})
