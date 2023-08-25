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
        expect(pB.buildFromResult('result')).toEqual(expected)
    })

    test('steps should be passed as deep copy', () => {
        const expected: Simulation<{ val: string }, string> = {
            steps: [{ val: 'step a' }, { val: 'step b' }],
            result: 'result',
        }
        const pB: IProtocolBuilder<string, string> = new ProtocolBuilder()

        let stepValue: { val: string } = { val: '' }
        stepValue.val = 'step a'
        pB.step(stepValue)
        stepValue.val = 'step b'
        pB.step(stepValue)

        expect(pB.buildFromResult('result')).toEqual(expected)
    })
})
