import { describe, expect, expectTypeOf, test } from 'vitest'
import type { IProtocolBuilder, Simulation } from '@/simulation/types'
import { ProtocolBuilder } from '@/simulation/protocolBuilder'

describe('protocolBuilder', () => {
    test('can be created with steps', () => {
        const expected: Simulation<string, string> = {
            steps: ['step a', 'step b'],
            result: 'result',
        }
        const pB: IProtocolBuilder<string, string> = new ProtocolBuilder()
        expectTypeOf(pB.step('step a')).toBeVoid()
        expectTypeOf(pB.step('step b')).toBeVoid()
        expect(pB.result('result')).toEqual(expected)
    })
})
