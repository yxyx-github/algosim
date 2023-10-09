import { describe, expect, test } from 'vitest'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

describe('Vertex', () => {
    test('can create Vertex', () => {
        const id = 'myId'
        const value = 'myVertex'
        const vertex = new Vertex<string>(id, value)

        expect(vertex.getId()).to.equal(id)
        expect(vertex.getValue()).to.equal(value)
    })
})
