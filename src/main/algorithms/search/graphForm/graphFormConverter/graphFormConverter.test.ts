import { describe, expect, test } from 'vitest'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'

describe('GraphFormConverter', () => {
    test('can convert emtpy cleared GraphForm', () => {
        const graphForm = new GraphForm()
        const converter = new GraphFormConverter(graphForm)

        expect(converter.toGraph()).to.deep.equal(new Graph())
    })
})
